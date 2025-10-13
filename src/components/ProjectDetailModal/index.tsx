import type { Project } from '@/types';
import Modal from '@components/Modal';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  const getProjectTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      frontend: '#61dafb',
      backend: '#68a063',
      fullstack: '#162b82ff',
      mobile: '#a4c639',
      wordpress: '#21759b',
      ai: '#ff6f00',
      other: '#9c27b0',
    };
    return colors[type] || '#666';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-8 relative">
          {project.imagePath || project.imageUrl ? (
            <img
              src={project.imagePath ? `${import.meta.env.VITE_API_URL}${project.imagePath}` : project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-9xl text-gray-300">📁</div>
          )}

          {project.featured && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 shadow-md">
              ⭐ Featured Project
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-3 flex-wrap">
            <span
              className="inline-block px-4 py-2 rounded-md text-white text-sm font-bold uppercase"
              style={{ backgroundColor: getProjectTypeColor(project.projectType || '') }}
            >
              {project.projectType}
            </span>
            <span className="text-gray-500 text-sm">{formatDate(project.createdAt || '')}</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">{project.title}</h1>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">📝 Açıklama</h3>
          <p className="text-base leading-relaxed text-gray-600 whitespace-pre-wrap">{project.description}</p>
        </div>

        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🛠️ Teknolojiler</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm font-medium transition-all hover:-translate-y-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 flex-wrap pt-6 border-t border-gray-200">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white no-underline rounded-lg text-base font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 text-center"
            >
              🔗 Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] px-6 py-3.5 bg-gray-800 hover:bg-black text-white no-underline rounded-lg text-base font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-900/30 flex items-center justify-center gap-2 text-center"
            >
              💻 GitHub Repository
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProjectDetailModal;
