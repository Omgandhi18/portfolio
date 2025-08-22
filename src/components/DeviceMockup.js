import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './Hero';
import HeroImage from "../assets/Hero.png"; // Placeholder for hero image

gsap.registerPlugin(ScrollTrigger);

// Animated Device Content Component with Image
const AnimatedDeviceContent = ({ deviceType }) => {
  const getContentDimensions = () => {
    // Match exact screen dimensions from each mockup
    switch (deviceType) {
      case 'mobile':
        return { width: 220, height: 400, x: 55, y: 80, rx: 30 }; // Increased width from 170 to 220
      case 'tablet':
        return { width: 260, height: 370, x: 70, y: 90, rx: 15 }; // iPad screen area
      default:
        return { width: 560, height: 280, x: 120, y: 70, rx: 10 }; // MacBook screen area
    }
  };

  const { width, height, x, y, rx } = getContentDimensions();
  
  // Calculate image dimensions (centered and responsive) - increased for mobile
  const imageSize = deviceType === 'mobile' ? Math.min(width * 0.5, height * 0.4, 140) : Math.min(width * 0.4, height * 0.4, 120);
  const imageX = x + (width - imageSize) / 2;
  const imageY = y + (height - imageSize) / 2;

  return (
    <svg 
      width={deviceType === 'desktop' ? 800 : deviceType === 'tablet' ? 400 : 330} 
      height={deviceType === 'desktop' ? 520 : deviceType === 'tablet' ? 550 : 560} 
      viewBox={`0 0 ${deviceType === 'desktop' ? 800 : deviceType === 'tablet' ? 400 : 330} ${deviceType === 'desktop' ? 520 : deviceType === 'tablet' ? 550 : 560}`}
      className="opacity-80"
    >
      <defs>
        <clipPath id={`screenClip-${deviceType}`}>
          <rect x={x} y={y} width={width} height={height} rx={rx} />
        </clipPath>
        
        <clipPath id={`imageClip-${deviceType}`}>
          <circle cx={imageX + imageSize/2} cy={imageY + imageSize/2} r={imageSize/2} />
        </clipPath>
        
        {/* Animated Gradients */}
        <linearGradient id="animatedGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#F07167", stopOpacity:0.9}}>
            <animate attributeName="stop-opacity" 
              values="0.9;0.7;0.9" 
              dur="3s" 
              repeatCount="indefinite" />
          </stop>
          <stop offset="100%" style={{stopColor:"#F07167", stopOpacity:0.8}}>
            <animate attributeName="stop-opacity" 
              values="0.8;0.6;0.8" 
              dur="3s" 
              repeatCount="indefinite" />
          </stop>
        </linearGradient>
        
        <linearGradient id="animatedGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor:"#F07167", stopOpacity:0.6}}>
            <animate attributeName="stop-opacity" 
              values="0.6;0.4;0.6" 
              dur="4s" 
              repeatCount="indefinite" />
          </stop>
          <stop offset="100%" style={{stopColor:"#F07167", stopOpacity:0.5}}>
            <animate attributeName="stop-opacity" 
              values="0.5;0.3;0.5" 
              dur="4s" 
              repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* Pattern for texture */}
        <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
          <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.2)">
            <animate attributeName="opacity" 
              values="0.2;0.5;0.2" 
              dur="3s" 
              repeatCount="indefinite" />
          </circle>
        </pattern>
      </defs>
      
      <g clipPath={`url(#screenClip-${deviceType})`}>
        {/* Background with #F07167 color */}
        <rect x={x} y={y} width={width} height={height} fill="#F07167" />
        
        {/* Subtle gradient overlay */}
        <rect x={x} y={y} width={width} height={height} fill="url(#animatedGradient1)" />
        
        {/* Floating geometric shapes with F07167 theme */}
        <circle cx={x + width * 0.15} cy={y + height * 0.2} r="20" fill="rgba(255,255,255,0.1)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`0,0; ${width * 0.05},${height * 0.05}; 0,0`}
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        
        <rect x={x + width * 0.8} y={y + height * 0.15} width="25" height="25" rx="5" fill="rgba(255,255,255,0.1)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0;360;0"
            dur="8s"
            repeatCount="indefinite"
          />
        </rect>
        
        <polygon points={`${x + width * 0.85},${y + height * 0.7} ${x + width * 0.95},${y + height * 0.85} ${x + width * 0.75},${y + height * 0.85}`} 
                 fill="rgba(255,255,255,0.1)">
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1;1.2;1"
            dur="5s"
            repeatCount="indefinite"
          />
        </polygon>
        
        {/* Subtle dots pattern overlay */}
        <rect x={x} y={y} width={width} height={height} fill="url(#dots)" />
        
        {/* Centered Circular Image */}
        <g clipPath={`url(#imageClip-${deviceType})`}>
          {/* Placeholder image - replace with your actual image */}
          <image 
            x={imageX} 
            y={imageY} 
            width={imageSize} 
            height={imageSize}
            href={HeroImage}
            preserveAspectRatio="xMidYMid slice"
          >
           
          </image>
        </g>
        
        {/* Image border/ring */}
        <circle 
          cx={imageX + imageSize/2} 
          cy={imageY + imageSize/2} 
          r={imageSize/2} 
          fill="none" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="3"
        >
          <animate attributeName="stroke-opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Floating particles around image */}
        {Array.from({ length: deviceType === 'desktop' ? 6 : 4 }, (_, i) => {
          const angle = (i * 360 / (deviceType === 'desktop' ? 6 : 4)) * (Math.PI / 180);
          const radius = imageSize/2 + 30;
          const particleX = imageX + imageSize/2 + Math.cos(angle) * radius;
          const particleY = imageY + imageSize/2 + Math.sin(angle) * radius;
          
          return (
            <circle
              key={i}
              cx={particleX}
              cy={particleY}
              r="3"
              fill="rgba(255,255,255,0.5)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values={`0 ${imageX + imageSize/2} ${imageY + imageSize/2}; 360 ${imageX + imageSize/2} ${imageY + imageSize/2}`}
                dur={`${8 + i}s`}
                repeatCount="indefinite"
              />
              <animate 
                attributeName="opacity" 
                values="0.5;1;0.5" 
                dur={`${2 + i * 0.3}s`} 
                repeatCount="indefinite" 
              />
            </circle>
          );
        })}
        
        {/* Pulsing ring around image */}
        <circle cx={imageX + imageSize/2} cy={imageY + imageSize/2} r={imageSize/2 + 20} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
          <animate attributeName="r" values={`${imageSize/2 + 20};${imageSize/2 + 35};${imageSize/2 + 20}`} dur="4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.2;0.05;0.2" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
};

const DeviceMockup = () => {
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const mockupRef = useRef(null);
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    // Detect device type
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setDeviceType('mobile');
      } else if (width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);

    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !heroContentRef.current || !mockupRef.current) return;

    const container = containerRef.current;
    const heroContent = heroContentRef.current;
    const mockup = mockupRef.current;

    // Initial state - show hero content full screen, mockup hidden
    gsap.set(heroContent, { 
      scale: 1, 
      zIndex: 20,
      clipPath: 'none'
    });
    gsap.set(mockup, { 
      scale: 1.5, 
      opacity: 0, 
      zIndex: 10 
    });

    // Create scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const animatedContent = container.querySelector('[data-animated-content]');
          
          if (progress < 0.15) { // Reduced from 0.2 to start transition earlier
            // Hero full screen - no clipping, no animated content
            gsap.set(heroContent, { 
              scale: 1,
              zIndex: 20,
              clipPath: 'none'
            });
            gsap.set(mockup, { 
              scale: 1.3, // Reduced initial scale for smoother transition
              opacity: 0,
              zIndex: 25
            });
            gsap.set(animatedContent, {
              opacity: 0,
              zIndex: 30
            });
          } else if (progress < 0.75) { // Reduced from 0.8 to end transition earlier
            // Transition: scale down hero, show and scale mockup, fade in animated content
            const transitionProgress = (progress - 0.15) / 0.6; // Updated calculation
            const heroScale = 1 - (transitionProgress * getHeroScaleFactor());
            const mockupScale = 1.3 - (transitionProgress * 0.3); // Updated for new initial scale
            
            gsap.set(heroContent, { 
              scale: heroScale,
              zIndex: 15,
              clipPath: getScreenClipPath(transitionProgress > 0.25) // Adjusted timing
            });
            gsap.set(mockup, { 
              scale: mockupScale,
              opacity: transitionProgress * 1.5,
              zIndex: 25
            });
            gsap.set(animatedContent, {
              opacity: Math.max(0, (transitionProgress - 0.2) * 2.5), // Adjusted fade in timing
              zIndex: 30
            });
          } else {
            // Final state: Hero scaled down with clipping, mockup and animated content fully visible
            gsap.set(heroContent, { 
              scale: 1 - getHeroScaleFactor(),
              zIndex: 15,
              clipPath: getScreenClipPath(true)
            });
            gsap.set(mockup, { 
              scale: 1,
              opacity: 1,
              zIndex: 25
            });
            gsap.set(animatedContent, {
              opacity: 1,
              zIndex: 30
            });
          }
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [deviceType]);

  const getHeroScaleFactor = () => {
    switch (deviceType) {
      case 'mobile':
        return 0.55; // Scale to 45%
      case 'tablet':
        return 0.50; // Scale to 50%
      default:
        return 0.30; // Scale to 70% for desktop
    }
  };

  const getScreenClipPath = (isVisible) => {
    if (!isVisible) return 'none';
    
    switch (deviceType) {
      case 'mobile':
        return 'inset(80px 65px 80px 65px round 25px)'; // Updated for wider mobile
      case 'tablet':
        return 'inset(90px 70px 90px 70px round 15px)';
      default:
        return 'inset(70px 120px 70px 120px round 10px)';
    }
  };

  const getMockupPositionClass = () => {
    // Position mockups higher on the screen based on device type
    switch (deviceType) {
      case 'mobile':
        return 'items-start pt-16'; // Mobile: start from top with padding
      case 'tablet':
        return 'items-start pt-20'; // Tablet: slightly more padding
      default:
        return 'items-start pt-12'; // Desktop: less padding since it's wider
    }
  };

  const getDeviceMockup = () => {
    switch (deviceType) {
      case 'mobile':
        return <MobileMockup />;
      case 'tablet':
        return <TabletMockup />;
      default:
        return <MacBookMockup />;
    }
  };

  return (
    <div ref={containerRef} className="relative h-[100vh] overflow-hidden bg-gray-50 mt-50 sm:mt-32 md:mt-10"> {/* Increased tablet margin */}
      {/* Hero Content - Will shrink into device */}
      <div 
        ref={heroContentRef}
        className="absolute inset-0 w-full h-screen flex items-center justify-center"
        style={{ 
          transformOrigin: 'center center'
        }}
      >
        <div className="w-full h-full">
          <Hero />
        </div>
      </div>
      
      {/* Device Mockup Frame - REPOSITIONED HIGHER */}
      <div 
        ref={mockupRef}
        className={`absolute inset-0 flex justify-center pointer-events-none ${getMockupPositionClass()}`}
        style={{ 
          transformOrigin: 'center top', // Changed origin to top for better positioning
          zIndex: 25
        }}
      >
        {getDeviceMockup()}
      </div>
      
      {/* Animated Device Content - Should appear inside the device screen - ALSO REPOSITIONED */}
      <div 
        data-animated-content
        className={`absolute inset-0 flex justify-center pointer-events-none ${getMockupPositionClass()}`}
        style={{ 
          transformOrigin: 'center', // Changed origin to top
          zIndex: 30,
          opacity: 0 // Start hidden, will be controlled by scroll animation
        }}
      >
        <AnimatedDeviceContent deviceType={deviceType} />
      </div>
    </div>
  );
};

const MacBookMockup = () => (
  <div className="relative">
    <svg 
      width="800" 
      height="520" 
      viewBox="0 0 800 520" 
      className="drop-shadow-2xl"
    >
      {/* MacBook Screen Bezel */}
      <rect 
        x="100" 
        y="50" 
        width="600" 
        height="320" 
        rx="20" 
        fill="#1a1a1a" 
        stroke="#000" 
        strokeWidth="3"
      />
      
      {/* MacBook Screen Border */}
      <rect 
        x="110" 
        y="60" 
        width="580" 
        height="300" 
        rx="12" 
        fill="#000" 
        stroke="#333" 
        strokeWidth="2"
      />
      
      {/* Screen area - transparent for hero content */}
      <rect 
        x="120" 
        y="70" 
        width="560" 
        height="280" 
        rx="10" 
        fill="transparent"
      />
      
      {/* MacBook Camera */}
      <circle 
        cx="400" 
        cy="85" 
        r="4" 
        fill="#333"
      />
      <circle 
        cx="400" 
        cy="85" 
        r="2" 
        fill="#555"
      />
       
      {/* MacBook Base */}
      <rect 
        x="50" 
        y="370" 
        width="700" 
        height="40" 
        rx="10" 
        fill="url(#macbookGradient)" 
        stroke="#ccc" 
        strokeWidth="2"
      />
      
      {/* MacBook Trackpad */}
      <rect 
        x="300" 
        y="370" 
        width="200" 
        height="10" 
        rx="4" 
        fill="#adb5bd" 
        stroke="#ddd" 
        strokeWidth="1"
      />
      
      {/* Apple Logo */}
      <circle 
        cx="400" 
        cy="200" 
        r="15" 
        fill="#ffffff" 
        opacity="0.1"
      />

      <defs>
        <linearGradient id="macbookGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor:"#f5f5f5", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#e0e0e0", stopOpacity:1}} />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const TabletMockup = () => (
  <div className="relative">
    <svg 
      width="400" 
      height="550" 
      viewBox="0 0 400 550" 
      className="drop-shadow-2xl"
    >
      {/* iPad Body */}
      <rect 
        x="50" 
        y="50" 
        width="300" 
        height="450" 
        rx="35" 
        fill="url(#ipadGradient)" 
        stroke="#ccc" 
        strokeWidth="3"
      />
      
      {/* iPad Screen Bezel */}
      <rect 
        x="65" 
        y="85" 
        width="270" 
        height="380" 
        rx="20" 
        fill="#000" 
        stroke="#333" 
        strokeWidth="2"
      />
      
      {/* Screen area - transparent for hero content */}
      <rect 
        x="70" 
        y="90" 
        width="260" 
        height="370" 
        rx="15" 
        fill="transparent"
      />
      
      {/* iPad Home Button */}
      <circle 
        cx="200" 
        cy="480" 
        r="18" 
        fill="#f0f0f0" 
        stroke="#ddd" 
        strokeWidth="2"
      />
      <circle 
        cx="200" 
        cy="480" 
        r="12" 
        fill="#fff" 
        stroke="#eee" 
        strokeWidth="1"
      />
      
      {/* iPad Camera */}
      <circle 
        cx="200" 
        cy="70" 
        r="4" 
        fill="#333"
      />
      <circle 
        cx="200" 
        cy="70" 
        r="2" 
        fill="#555"
      />

      <defs>
        <linearGradient id="ipadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor:"#f8f8f8", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#e8e8e8", stopOpacity:1}} />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const MobileMockup = () => (
  <div className="relative">
    <svg 
      width="330" 
      height="560" 
      viewBox="0 0 330 560" 
      className="drop-shadow-2xl"
    >
      {/* iPhone Body - Made wider */}
      <rect 
        x="40" 
        y="40" 
        width="250" 
        height="480" 
        rx="45" 
        fill="url(#iphoneGradient)" 
        stroke="#333" 
        strokeWidth="3"
      />
      
      {/* iPhone Screen Bezel - Made wider */}
      <rect 
        x="50" 
        y="75" 
        width="230" 
        height="410" 
        rx="35" 
        fill="#000" 
        stroke="#222" 
        strokeWidth="2"
      />
      
      {/* Screen area - transparent for hero content - Made wider */}
      <rect 
        x="65" 
        y="80" 
        width="220" 
        height="400" 
        rx="30" 
        fill="transparent"
      />
      
      {/* iPhone Notch - Centered for wider design */}
      <rect 
        x="135" 
        y="50" 
        width="60" 
        height="30" 
        rx="15" 
        fill="#1a1a1a"
      />
      
      {/* iPhone Speaker - Centered */}
      <rect 
        x="150" 
        y="58" 
        width="30" 
        height="4" 
        rx="2" 
        fill="#666"
      />
      
      {/* iPhone Camera - Centered */}
      <circle 
        cx="140" 
        cy="65" 
        r="4" 
        fill="#333"
      />
      <circle 
        cx="140" 
        cy="65" 
        r="2" 
        fill="#555"
      />
      
      {/* Home Indicator - Centered */}
      <rect 
        x="150" 
        y="495" 
        width="30" 
        height="4" 
        rx="2" 
        fill="#666"
      />

      <defs>
        <linearGradient id="iphoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor:"#2a2a2a", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#1a1a1a", stopOpacity:1}} />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export default DeviceMockup;