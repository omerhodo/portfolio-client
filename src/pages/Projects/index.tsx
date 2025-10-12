import type { Project } from '@/types';
import ProjectCard from '@components/ProjectCard';
import ProjectDetailModal from '@components/ProjectDetailModal';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>(`${import.meta.env.VITE_API_URL}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <h2 className="text-3xl mt-10 font-bold mb-6 text-center">My All Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
        {projects.map((project) => (
          <div key={project._id}>
            <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
          </div>
        ))}
      </div>

      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Projects;
