import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Lightbulb, Pencil, FileText, Hammer, Key } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    icon: Search,
    title: 'Discovery',
    description: 'Understanding your vision, requirements, and project goals',
  },
  {
    icon: Lightbulb,
    title: 'Planning',
    description: 'Developing strategic approaches and feasibility studies',
  },
  {
    icon: Pencil,
    title: 'Concept Design',
    description: 'Creating initial design concepts and visual representations',
  },
  {
    icon: FileText,
    title: 'Detailed Design',
    description: 'Refining designs with technical specifications and documentation',
  },
  {
    icon: Hammer,
    title: 'Execution',
    description: 'Overseeing construction and ensuring quality implementation',
  },
  {
    icon: Key,
    title: 'Handover',
    description: 'Final inspections and project delivery to client',
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => {
        gsap.fromTo(
          '.process-step',
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
          }
        );
      },
    });
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-center mb-16 text-black">Our Process</h2>

        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="process-step flex gap-8 mb-12 last:mb-0 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="text-3xl font-light text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg text-black/70 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="flex-shrink-0 text-6xl font-light text-black/10">
                  0{index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
