import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef();
  const logoRef = useRef();
  const progressBarRef = useRef();
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    // Initial setup - hide everything
    gsap.set(preloaderRef.current, { opacity: 1 });
    gsap.set(logoRef.current, { opacity: 0, y: 50 });
    gsap.set(progressBarRef.current, { scaleX: 0 });

    // Animate logo entrance
    gsap.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.3
    });

    // Simulate loading progress
    const progressTween = gsap.to({ value: 0 }, {
      value: 100,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: function() {
        const currentProgress = Math.floor(this.targets()[0].value);
        setProgress(currentProgress);
        
        // Update progress bar
        gsap.to(progressBarRef.current, {
          scaleX: currentProgress / 100,
          duration: 0.1,
          ease: "none"
        });
      },
      onComplete: () => {
        // Exit animation
        gsap.timeline()
          .to(logoRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in"
          })
          .to(preloaderRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
              if (onComplete) onComplete();
            }
          }, "-=0.3");
      }
    });

    return () => {
      progressTween.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-black flex-center flex-col"
      style={{ willChange: 'opacity' }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow/20 via-transparent to-yellow/10"></div>
      </div>

      {/* Logo */}
      <div ref={logoRef} className="text-center mb-8">
        <h1 className="font-modern-negra text-6xl md:text-8xl text-gradient mb-4">
          VELVET
        </h1>
        <p className="text-white-100 text-lg tracking-widest">POUR</p>
      </div>

      {/* Progress bar container */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
        <div 
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-yellow to-white origin-left"
          style={{ willChange: 'transform' }}
        ></div>
      </div>

      {/* Progress text */}
      <p className="text-white-100 text-sm font-mono">
        {progress}%
      </p>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-yellow rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-500"></div>
      <div className="absolute top-40 right-40 w-1 h-1 bg-yellow/60 rounded-full animate-pulse delay-1000"></div>
    </div>
  );
};

export default Preloader;
