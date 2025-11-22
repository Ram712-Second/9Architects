import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const [showMonogram, setShowMonogram] = useState(false);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete,
          });
        }, 500);
      },
    });

    timeline
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.in',
        delay: 1,
        onComplete: () => setShowMonogram(true),
      })
      .fromTo(
        monogramRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      )
      .to(monogramRef.current, {
        rotation: 360,
        duration: 1.2,
        ease: 'power2.inOut',
      });

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {!showMonogram ? (
        <div ref={textRef} className="text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white">
            9 Architects
          </h1>
        </div>
      ) : (
        <div ref={monogramRef} className="text-center">
          <div className="text-8xl md:text-9xl font-light tracking-tighter text-white">
            9A
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
