import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const nineRef = useRef<HTMLDivElement>(null);
  const fullNameRef = useRef<HTMLDivElement>(null);
  const [showFullName, setShowFullName] = useState(false);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete,
          });
        }, 800);
      },
    });

    // Stage 1: Animate the "9" - rotate and scale
    timeline
      .fromTo(
        nineRef.current,
        { 
          opacity: 0, 
          scale: 0.5,
          rotation: -180
        },
        { 
          opacity: 1, 
          scale: 1.2,
          rotation: 0,
          duration: 1.2, 
          ease: 'power3.out' 
        }
      )
      .to(nineRef.current, {
        rotation: 360,
        scale: 1,
        duration: 1,
        ease: 'power2.inOut',
      })
      .to(nineRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => setShowFullName(true),
      })
      // Stage 2: Show "9 Architects" in classy design
      .fromTo(
        fullNameRef.current,
        { 
          opacity: 0, 
          y: 30,
          letterSpacing: '0.5em'
        },
        { 
          opacity: 1, 
          y: 0,
          letterSpacing: '0.1em',
          duration: 1, 
          ease: 'power2.out' 
        }
      )
      .to(fullNameRef.current, {
        delay: 0.8,
        opacity: 1,
        duration: 0.3,
      });

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {!showFullName ? (
        <div ref={nineRef} className="text-center">
          <div className="text-[20vw] font-extralight text-foreground leading-none">
            9
          </div>
        </div>
      ) : (
        <div ref={fullNameRef} className="text-center">
          <div className="flex flex-col items-center">
            <div className="text-8xl md:text-9xl font-extralight tracking-wider text-foreground mb-4">
              9
            </div>
            <div className="text-3xl md:text-4xl font-light tracking-[0.2em] text-foreground uppercase">
              Architects
            </div>
            <div className="mt-8 w-32 h-[1px] bg-foreground/20"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
