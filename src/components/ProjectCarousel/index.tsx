import type { Project } from '@/types';
import ProjectCard from '@components/ProjectCard';
import ProjectDetailModal from '@components/ProjectDetailModal';
import { useEffect, useRef, useState } from 'react';

interface ProjectCarouselProps {
  projects: Project[];
  projectType: string;
  title: string;
}

const ProjectCarousel = ({ projects, projectType, title }: ProjectCarouselProps) => {
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

  const getProjectTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      frontend: '#61dafb',
      backend: '#68a063',
      mobile: '#a4c639',
      wordpress: '#21759b',
      ai: '#ff6f00',
      other: '#9c27b0',
    };
    return colors[type] || '#666';
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
    <div
      style={{
        marginBottom: '4rem',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h3
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#333',
              margin: 0,
            }}
          >
            {title}
          </h3>
          <span
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              backgroundColor: getProjectTypeColor(projectType),
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            {projects.length}
          </span>
        </div>

        {/* Navigation Buttons - Desktop */}
        {projects.length > itemsPerView && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: canGoPrev ? '#333' : '#ddd',
                color: 'white',
                cursor: canGoPrev ? 'pointer' : 'not-allowed',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (canGoPrev) {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (canGoPrev) {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: canGoNext ? '#333' : '#ddd',
                color: 'white',
                cursor: canGoNext ? 'pointer' : 'not-allowed',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (canGoNext) {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (canGoNext) {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Carousel Container */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '0.5rem 0',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={carouselRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            transform: `translateX(-${currentIndex * (100 / itemsPerView + 1.5)}%)`,
            transition: 'transform 0.4s ease-in-out',
          }}
        >
          {projects.map((project) => (
            <div
              key={project._id}
              style={{
                minWidth: `calc(${100 / itemsPerView}% - ${(1.5 * (itemsPerView - 1)) / itemsPerView}rem)`,
                maxWidth: `calc(${100 / itemsPerView}% - ${(1.5 * (itemsPerView - 1)) / itemsPerView}rem)`,
              }}
            >
              <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {projects.length > itemsPerView && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem',
          }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: currentIndex === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: currentIndex === index ? getProjectTypeColor(projectType) : '#ddd',
                cursor: 'pointer',
                transition: 'all 0.3s',
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
