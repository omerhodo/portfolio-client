import type { Project } from '@/types';
import ProjectCard from '@components/ProjectCard';
import ProjectDetailModal from '@components/ProjectDetailModal';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ProjectCarouselProps {
  projects: Project[];
  projectType: string;
  title: string;
}

const ProjectCarousel = ({ projects, title }: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsPerView);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && canGoNext) {
        handleNext();
      } else if (diff < 0 && canGoPrev) {
        handlePrev();
      }
    }
  };

  if (projects.length === 0) return null;

  return (
    <div className="mb-16 relative">
      <div className="flex justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-xl md:text-3xl text-gray-800 m-0 font-suse-mono">{title}</h3>
          <span className="px-3 py-1 rounded-full text-white text-sm font-bold bg-cyan-700">{projects.length}</span>
        </div>

        {/* Navigation Buttons - Desktop */}
        {projects.length > itemsPerView && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`
                w-10 h-10 rounded-full border-none text-white text-xl
                flex items-center justify-center transition-all
                ${
                  canGoPrev
                    ? 'bg-cyan-700 hover:bg-cyan-900 hover:scale-110 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed'
                }
              `}
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`
                w-10 h-10 rounded-full border-none text-white text-xl
                flex items-center justify-center transition-all
                ${
                  canGoNext
                    ? 'bg-cyan-700 hover:bg-cyan-900 hover:scale-110 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed'
                }
              `}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden py-2" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div
          ref={carouselRef}
          className="flex gap-6 transition-transform duration-400 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView + 1.5)}%)`,
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              style={{
                minWidth: `calc(${100 / itemsPerView}% - ${(1.5 * (itemsPerView - 1)) / itemsPerView}rem)`,
                maxWidth: `calc(${100 / itemsPerView}% - ${(1.5 * (itemsPerView - 1)) / itemsPerView}rem)`,
              }}
              initial={{ y: 200 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {projects.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                h-2 rounded border-none cursor-pointer transition-all duration-300
                ${currentIndex === index ? 'w-6' : 'w-2'}
              `}
              style={{
                backgroundColor: currentIndex === index ? '#0d9488' : 'darkgray',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ProjectCarousel;
