import type { Project } from '@/types';
import LazyImage from '@components/LazyImage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Project>(`${import.meta.env.VITE_API_URL}/projects/slug/${slug}`);
        setProject(response.data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Project not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-xl text-gray-600">{error || 'Project not found'}</div>
        <Link
          to="/projects"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const imageUrl = project.imageUrl;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <span className="text-xl">←</span>
            <span>Back to Projects</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Image */}
        <div className="w-full h-[500px] bg-gray-100 rounded-2xl overflow-hidden mb-12 relative shadow-xl">
          {imageUrl ? (
            <LazyImage
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              width="100%"
              height="100%"
              threshold={0}
              rootMargin="0px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-9xl text-gray-300">📁</div>
          )}

          {project.featured && (
            <div className="absolute top-6 right-6 bg-yellow-400 text-gray-800 px-6 py-3 rounded-lg text-base font-bold flex items-center gap-2 shadow-lg">
              ⭐ Featured Project
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span
                className="inline-block px-5 py-2 rounded-lg text-white text-sm font-bold uppercase tracking-wide"
                style={{ backgroundColor: getProjectTypeColor(project.projectType || '') }}
              >
                {project.projectType}
              </span>
              {project.createdAt && (
                <span className="text-gray-500 text-sm flex items-center gap-2">
                  <span>📅</span>
                  {formatDate(project.createdAt)}
                </span>
              )}
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">{project.title}</h1>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>📝</span>
              <span>About This Project</span>
            </h3>
            <p className="text-lg leading-relaxed text-gray-600 whitespace-pre-wrap">{project.description}</p>
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span>🛠️</span>
                <span>Technologies Used</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-base font-medium transition-all hover:-translate-y-1 hover:shadow-md cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap pt-8 border-t border-gray-200">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white no-underline rounded-xl text-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-3 text-center"
              >
                <span className="text-2xl">🔗</span>
                <span>View Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] px-8 py-4 bg-gray-800 hover:bg-black text-white no-underline rounded-xl text-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-900/30 flex items-center justify-center gap-3 text-center"
              >
                <span className="text-2xl">💻</span>
                <span>View on GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Back button at bottom */}
        <div className="flex justify-center">
          <Link
            to="/projects"
            className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 rounded-xl font-semibold transition-all hover:-translate-y-1 hover:shadow-lg text-center no-underline"
          >
            ← Back to All Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
