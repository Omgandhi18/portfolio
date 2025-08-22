import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './Hero';

gsap.registerPlugin(ScrollTrigger);

const DeviceMockup = () => {
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const mockupRef = useRef(null);
  const [deviceType, setDeviceType] = useState('desktop');
  const [heroVisible, setHeroVisible] = useState(false);

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

    // Initial state - show hero content full screen, mockup behind and scaled up
    gsap.set(heroContent, { scale: 1, zIndex: 20 });
    gsap.set(mockup, { scale: 1.2, opacity: 0, zIndex: 10 });

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
          
          if (progress < 0.3) {
            // Hero full screen
            gsap.set(heroContent, { 
              scale: 1,
              zIndex: 20
            });
            gsap.set(mockup, { 
              scale: 1.2,
              opacity: 0,
              zIndex: 10
            });
            setHeroVisible(false);
          } else if (progress < 0.7) {
            // Transition: zoom out hero, zoom in mockup
            const transitionProgress = (progress - 0.3) / 0.4;
            gsap.set(heroContent, { 
              scale: 1 - (transitionProgress * 0.65),
              zIndex: 15
            });
            gsap.set(mockup, { 
              scale: 1.2 - (transitionProgress * 0.2),
              opacity: transitionProgress,
              zIndex: 20
            });
            setHeroVisible(transitionProgress > 0.5);
          } else {
            // Hero inside device mockup
            gsap.set(heroContent, { 
              scale: 0.35,
              zIndex: 15
            });
            gsap.set(mockup, { 
              scale: 1,
              opacity: 1,
              zIndex: 20
            });
            setHeroVisible(true);
          }
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [deviceType]);

  const getDeviceMockup = () => {
    switch (deviceType) {
      case 'mobile':
        return <MobileMockup heroVisible={heroVisible} />;
      case 'tablet':
        return <TabletMockup heroVisible={heroVisible} />;
      default:
        return <MacBookMockup heroVisible={heroVisible} />;
    }
  };

  const getScreenMask = () => {
    switch (deviceType) {
      case 'mobile':
        return {
          clipPath: heroVisible ? 'polygon(17.9% 14.3%, 82.1% 14.3%, 82.1% 85.7%, 17.9% 85.7%)' : 'none'
        };
      case 'tablet':
        return {
          clipPath: heroVisible ? 'polygon(17.5% 16.4%, 82.5% 16.4%, 82.5% 83.6%, 17.5% 83.6%)' : 'none'
        };
      default:
        return {
          clipPath: heroVisible ? 'polygon(15% 13.5%, 85% 13.5%, 85% 67.3%, 15% 67.3%)' : 'none'
        };
    }
  };

  return (
    <div ref={containerRef} className="relative h-[200vh] overflow-hidden bg-white">
      {/* Device Mockup - Behind hero content */}
      <div 
        ref={mockupRef}
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{ transformOrigin: 'center center' }}
      >
        {getDeviceMockup()}
      </div>
      
      {/* Hero Content - In front, will shrink into device */}
      <div 
        ref={heroContentRef}
        className="absolute inset-0 w-full h-screen z-20"
        style={{ 
          transformOrigin: 'center center',
          ...getScreenMask()
        }}
      >
        <Hero />
      </div>
    </div>
  );
};

const MacBookMockup = ({ heroVisible = false }) => (
  <div className="relative">
    {/* MacBook SVG */}
    <svg 
      width="800" 
      height="520" 
      viewBox="0 0 800 520" 
      className="drop-shadow-2xl"
    >
      {/* Define mask for screen area */}
      <defs>
        <mask id="macbook-screen-mask">
          <rect width="800" height="520" fill="black" />
          <rect 
            x="120" 
            y="70" 
            width="560" 
            height="280" 
            rx="10" 
            fill="white"
          />
        </mask>
      </defs>
     
      
      {/* MacBook Screen Bezel */}
      <rect 
        x="100" 
        y="50" 
        width="600" 
        height="320" 
        rx="20" 
        fill="#374151" 
        stroke="#1F2937" 
        strokeWidth="4"
      />
      
      {/* MacBook Screen Background */}
      <rect 
        x="120" 
        y="70" 
        width="560" 
        height="280" 
        rx="10" 
        fill={heroVisible ? "transparent" : "#000000"}
      />
      
      {/* MacBook Camera */}
      <circle 
        cx="400" 
        cy="85" 
        r="3" 
        fill="#6B7280"
      />
       
      {/* MacBook Base */}
      <rect 
        x="50" 
        y="370" 
        width="700" 
        height="40" 
        rx="10" 
        fill="#E5E7EB" 
        stroke="#D1D5DB" 
        strokeWidth="2"
      />
      {/* MacBook Keyboard Area */}
      <rect 
        x="150" 
        y="370" 
        width="500" 
        height="8" 
        rx="4" 
        fill="#D1D5DB"
      />
      
      {/* MacBook Trackpad */}
      {/* <rect 
        x="350" 
        y="400" 
        width="100" 
        height="60" 
        rx="8" 
        fill="#F3F4F6" 
        stroke="#D1D5DB" 
        strokeWidth="1"
      /> */}
    </svg>
    
    {/* Screen mask overlay for hero content */}
    {heroVisible && (
      <div 
        className="absolute top-[70px] left-[120px] w-[560px] h-[280px] overflow-hidden rounded-[10px]"
        style={{
          clipPath: 'inset(0 0 0 0 round 10px)'
        }}
      />
    )}
  </div>
);

const TabletMockup = ({ heroVisible = false }) => (
  <div className="relative">
    {/* iPad SVG */}
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
        rx="30" 
        fill="#F3F4F6" 
        stroke="#D1D5DB" 
        strokeWidth="3"
      />
      
      {/* iPad Screen */}
      <rect 
        x="70" 
        y="90" 
        width="260" 
        height="370" 
        rx="15" 
        fill={heroVisible ? "transparent" : "#000000"}
      />
      
      {/* iPad Home Button */}
      <circle 
        cx="200" 
        cy="480" 
        r="15" 
        fill="#E5E7EB" 
        stroke="#D1D5DB" 
        strokeWidth="2"
      />
      
      {/* iPad Camera */}
      <circle 
        cx="200" 
        cy="70" 
        r="3" 
        fill="#6B7280"
      />
    </svg>
  </div>
);

const MobileMockup = ({ heroVisible = false }) => (
  <div className="relative">
    {/* iPhone SVG */}
    <svg 
      width="280" 
      height="560" 
      viewBox="0 0 280 560" 
      className="drop-shadow-2xl"
    >
      {/* iPhone Body */}
      <rect 
        x="40" 
        y="40" 
        width="200" 
        height="480" 
        rx="40" 
        fill="#1F2937" 
        stroke="#111827" 
        strokeWidth="3"
      />
      
      {/* iPhone Screen */}
      <rect 
        x="50" 
        y="80" 
        width="180" 
        height="400" 
        rx="25" 
        fill={heroVisible ? "transparent" : "#000000"}
      />
      
      {/* iPhone Notch */}
      <rect 
        x="110" 
        y="50" 
        width="60" 
        height="25" 
        rx="12" 
        fill="#111827"
      />
      
      {/* iPhone Speaker */}
      <rect 
        x="125" 
        y="57" 
        width="30" 
        height="3" 
        rx="2" 
        fill="#374151"
      />
      
      {/* iPhone Camera */}
      <circle 
        cx="120" 
        cy="62" 
        r="3" 
        fill="#6B7280"
      />
    </svg>
  </div>
);

export default DeviceMockup;
