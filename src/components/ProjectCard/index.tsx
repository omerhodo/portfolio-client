import type { Project } from '@/types';
import { getImageUrl } from '@utils/api';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const imageUrl = project.imagePath ? getImageUrl(project.imagePath) : project.imageUrl;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer relative hover:-translate-y-2"
    >
      <div className="relative w-full h-full bg-gray-100 overflow-hidden group">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full min-h-[350px] object-cover transition-transform duration-300 group-hover:scale-105 filter brightness-70 hover:brightness-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-8xl text-gray-300">📁</div>
        )}

        {project.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-800 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 shadow-md">
            ⭐
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
