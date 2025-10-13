import type { Project } from '@/types';

interface ProjectSectionProps {
  project: Project;
  reverse?: boolean;
}

const ProjectSection = ({ project, reverse = false }: ProjectSectionProps) => {
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

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: reverse ? '1fr 1.2fr' : '1.2fr 1fr',
        gap: '2rem',
        alignItems: 'center',
        padding: '3rem 0',
        borderBottom: '1px solid #eee',
      }}
      className="project-section"
    >
      <div
        style={{
          order: reverse ? 2 : 1,
          position: 'relative',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          aspectRatio: '16/9',
          backgroundColor: '#f0f0f0',
        }}
      >
        {project.imagePath || project.imageUrl ? (
          <img
            src={project.imagePath ? `${import.meta.env.VITE_API_URL}${project.imagePath}` : project.imageUrl}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#ccc',
            }}
          >
            📁
          </div>
        )}
        {project.featured && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: '#ffd700',
              color: '#333',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}
          >
            ⭐ Featured
          </div>
        )}
      </div>

      <div style={{ order: reverse ? 1 : 2 }}>
        <div
          style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            backgroundColor: getProjectTypeColor(project.projectType || ''),
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          {project.projectType}
        </div>

        <h3
          style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#333',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#666',
            marginBottom: '1.5rem',
          }}
        >
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#f0f0f0',
                    color: '#333',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0056b3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#007bff';
              }}
            >
              🔗 Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#333',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#333';
              }}
            >
              💻 GitHub
            </a>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-section {
            grid-template-columns: 1fr !important;
          }
          .project-section > div {
            order: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectSection;
