import { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

// Adjust line count based on screen size
uniform float uLineCount;
uniform float uLineWidth;
uniform float uLineBlur;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (uLineBlur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (uLineBlur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < 50; i++) {
        // Only process up to uLineCount lines
        if (float(i) >= uLineCount) break;
        
        float p = float(i) / uLineCount;
        line_strength *= (1.0 - lineFn(
            uv,
            uLineWidth * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

// Responsive settings based on screen size
const getResponsiveSettings = (width) => {
  if (width < 480) { // Mobile
    return {
      lineCount: 24,
      lineWidth: 5,
      lineBlur: 8
    };
  } else if (width < 1024) { // Tablet
    return {
      lineCount: 32,
      lineWidth: 6,
      lineBlur: 9
    };
  } else { // Desktop
    return {
      lineCount: 40,
      lineWidth: 7,
      lineBlur: 10
    };
  }
};

const Threads = ({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
  className = "",
  ...rest
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const programRef = useRef(null);
  const animationFrameId = useRef();
  const [deviceSettings, setDeviceSettings] = useState(() => 
    getResponsiveSettings(typeof window !== 'undefined' ? window.innerWidth : 1200)
  );
  const touchActive = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Create renderer
    const renderer = new Renderer({ alpha: true, antialias: true });
    rendererRef.current = renderer;
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);

    // Create program with responsive uniforms
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uLineCount: { value: deviceSettings.lineCount },
        uLineWidth: { value: deviceSettings.lineWidth },
        uLineBlur: { value: deviceSettings.lineBlur }
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    // Handle device-specific settings on resize
    function resize() {
      const { clientWidth, clientHeight } = container;
      
      // Update renderer size
      renderer.setSize(clientWidth, clientHeight);
      
      // Update resolution uniform
      program.uniforms.iResolution.value.r = clientWidth;
      program.uniforms.iResolution.value.g = clientHeight;
      program.uniforms.iResolution.value.b = clientWidth / clientHeight;
      
      // Update responsive settings
      const newSettings = getResponsiveSettings(clientWidth);
      program.uniforms.uLineCount.value = newSettings.lineCount;
      program.uniforms.uLineWidth.value = newSettings.lineWidth;
      program.uniforms.uLineBlur.value = newSettings.lineBlur;
      
      // Update state for potential re-renders
      setDeviceSettings(newSettings);
    }
    
    window.addEventListener("resize", resize);
    resize();

    // Mouse and touch interaction
    let currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    function handlePointerMove(e) {
      if (!enableMouseInteraction) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      
      const x = (clientX - rect.left) / rect.width;
      const y = 1.0 - (clientY - rect.top) / rect.height;
      targetMouse = [x, y];
    }
    
    function handlePointerLeave() {
      if (!touchActive.current) {
        targetMouse = [0.5, 0.5];
      }
    }
    
    function handleTouchStart(e) {
      touchActive.current = true;
      handlePointerMove(e);
    }
    
    function handleTouchEnd() {
      touchActive.current = false;
      targetMouse = [0.5, 0.5];
    }

    if (enableMouseInteraction) {
      // Mouse events
      container.addEventListener("mousemove", handlePointerMove);
      container.addEventListener("mouseleave", handlePointerLeave);
      
      // Touch events for mobile
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handlePointerMove, { passive: true });
      container.addEventListener("touchend", handleTouchEnd);
      container.addEventListener("touchcancel", handleTouchEnd);
    }

    // Animation loop
    function update(t) {
      if (enableMouseInteraction) {
        const smoothing = 0.05;
        currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      } else {
        program.uniforms.uMouse.value[0] = 0.5;
        program.uniforms.uMouse.value[1] = 0.5;
      }
      program.uniforms.iTime.value = t * 0.001;

      renderer.render({ scene: mesh });
      animationFrameId.current = requestAnimationFrame(update);
    }
    
    animationFrameId.current = requestAnimationFrame(update);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", resize);

      if (enableMouseInteraction) {
        container.removeEventListener("mousemove", handlePointerMove);
        container.removeEventListener("mouseleave", handlePointerLeave);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handlePointerMove);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("touchcancel", handleTouchEnd);
      }
      
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
      
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    color, 
    amplitude, 
    distance, 
    enableMouseInteraction, 
    deviceSettings.lineCount, 
    deviceSettings.lineWidth, 
    deviceSettings.lineBlur
  ]);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full relative ${className}`}
      {...rest}
    />
  );
};

export default Threads;