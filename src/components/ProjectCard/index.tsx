interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer relative hover:-translate-y-2"
    >
      <div className="relative w-full h-[450px] bg-gray-100 overflow-hidden group">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-8xl text-gray-300">📁</div>
        )}

        {project.featured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-800 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 shadow-md">
            ⭐
          </div>
        )}

        <div
          className="absolute bottom-0 left-0 right-0 pt-12 px-5 pb-5"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)',
          }}
        >
          <h3 className="text-white text-xl font-bold m-0 leading-snug text-center line-clamp-3 drop-shadow-lg">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
