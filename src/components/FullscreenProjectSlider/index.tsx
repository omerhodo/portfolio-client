import type { Project } from '@/types';
import ProjectCard from '@components/ProjectCard';
import ProjectDetailModal from '@components/ProjectDetailModal';
import { useEffect, useRef, useState } from 'react';

interface FullscreenProjectSliderProps {
  projects: Project[];
  projectType: string;
  title: string;
  icon: string;
  isLastSection?: boolean;
}

const FullscreenProjectSlider = ({
  projects,
  projectType,
  title,
  icon,
  isLastSection = false,
}: FullscreenProjectSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const getProjectTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      frontend: '#61dafb',
      backend: '#68a063',
      mobile: '#a4c639',
      wordpress: '#21759b',
      ai: '#ff6f00',
      other: '#9c27b0',
    };
    return colors[type] || '#0d9488';
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < projects.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const scrollToNextSection = () => {
    const currentElement =
      document.querySelector('.fullscreen-slider:hover') || document.querySelector('.fullscreen-slider');
    const nextElement = currentElement?.nextElementSibling;

    if (nextElement) {
      nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;

      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const isInView = rect.top >= -100 && rect.top <= 100;

      if (!isInView) return;

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowDown' && !isLastSection) {
        scrollToNextSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isModalOpen, canGoPrev, canGoNext, isLastSection]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleWheel = (e: Event) => {
      if (isModalOpen || isScrolling) return;

      const wheelEvent = e as WheelEvent;
      const isVerticalScroll = Math.abs(wheelEvent.deltaY) > Math.abs(wheelEvent.deltaX);

      if (isVerticalScroll) {
        // Only navigate to next section when scrolling down and we're at the last card
        if (wheelEvent.deltaY > 50 && !isLastSection && currentIndex === projects.length - 1) {
          e.preventDefault();
          isScrolling = true;
          scrollToNextSection();

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 1500);
        }
      }
    };

    const element = sliderRef.current;
    element?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      element?.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [isModalOpen, isLastSection, currentIndex, projects.length]);
  if (projects.length === 0) return null;

  return (
    <div
      ref={sliderRef}
      className="fullscreen-slider relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="absolute inset-0 opacity-5" style={{ backgroundColor: getProjectTypeColor(projectType) }} />

      {currentIndex === 0 && (
        <div className="absolute w-full top-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl md:text-6xl font-notable text-stone-300 text-shadow-md opacity-50">
              {icon} {title}
            </h2>
          </div>
        </div>
      )}

      {projects.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className={`absolute left-8 top-1/2 transform -translate-y-1/2 z-20
                     w-16 h-16 rounded-full bg-white/10 hover:bg-white/30 shadow-2xl
                     flex items-center justify-center transition-all hover:scale-110
                     hover:border-gray-300 ${!canGoPrev ? 'opacity-30 cursor-not-allowed' : ''}`}
            disabled={!canGoPrev}
          >
            <span className="text-3xl text-stone-100">←</span>
          </button>

          <button
            onClick={handleNext}
            className={`absolute right-8 top-1/2 transform -translate-y-1/2 z-20
                     w-16 h-16 rounded-full bg-white/10 hover:bg-white/30 shadow-2xl
                     flex items-center justify-center transition-all hover:scale-110
                     hover:border-gray-300 ${!canGoNext ? 'opacity-30 cursor-not-allowed' : ''}`}
            disabled={!canGoNext}
          >
            <span className="text-3xl text-stone-100">→</span>
          </button>
        </>
      )}

      {/* Project Card - Center */}
      <ProjectCard project={projects[currentIndex]} onClick={() => handleProjectClick(projects[currentIndex])} />

      {/* Project Name - Bottom Left Overlay */}
      <div className="absolute bottom-4 left-8 z-10 max-w-[300px]">
        <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-2xl shadow-lg">
          <p className="text-sm text-stone-100 font-suse-mono truncate">{projects[currentIndex].title}</p>
        </div>
      </div>

      {/* Counter - Bottom Right Overlay */}
      <div className="absolute bottom-4 right-8 z-10 max-w-[300px]">
        <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-2xl shadow-lg">
          <span className="text-sm text-stone-100 font-suse-mono">
            {currentIndex + 1} / {projects.length}
          </span>
        </div>
      </div>

      {/* Scroll Down Button */}
      {!isLastSection && (
        <button
          onClick={scrollToNextSection}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10
                     w-16 h-8 rounded-full bg-white/10 hover:bg-white/30 shadow-2xl
                     flex items-center justify-center transition-all hover:scale-110
                     animate-bounce"
          aria-label="Scroll to next section"
        >
          <span className="text-md text-stone-100">↓</span>
        </button>
      )}

      {/* Progress Dots - Bottom Center */}
      {projects.length > 1 && (
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 flex gap-2 ${
            isLastSection ? 'bottom-4' : 'bottom-20'
          }`}
        >
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
              h-2 rounded-full border-none cursor-pointer transition-all duration-300
              bg-white/50
              ${currentIndex === index ? 'w-8 bg-white/80' : 'w-2'}
            `}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default FullscreenProjectSlider;
