import AboutMe from '@/components/AboutMe';
import Section from '@/components/Container';
import MainHeader from '@components/MainHeader';
import ProjectSection from '@components/ProjectSection';
import { useEffect, useState } from 'react';

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

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`);

      if (!response.ok) {
        throw new Error('Projeler yüklenemedi');
      }

      const data = await response.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
      console.error('Fetch projects error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section className="bg-yellow">
        <MainHeader />
      </Section>

      <Section className="bg-dark justify-start">
        <AboutMe />
      </Section>

      {!loading && projects.length > 0 && (
        <Section className="bg-white">
          <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '3rem',
                textAlign: 'center',
                color: '#333',
              }}
            >
              Projects
            </h2>

            {error && (
              <div
                style={{
                  backgroundColor: '#fee',
                  color: '#c33',
                  padding: '1rem',
                  borderRadius: '4px',
                  marginBottom: '2rem',
                  textAlign: 'center',
                }}
              >
                {error}
              </div>
            )}

            <div>
              {projects.map((project, index) => (
                <ProjectSection key={project._id} project={project} reverse={index % 2 !== 0} />
              ))}
            </div>
          </div>
        </Section>
      )}

      {loading && (
        <Section className="bg-white">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>Projeler yükleniyor...</p>
          </div>
        </Section>
      )}

      {!loading && projects.length === 0 && !error && (
        <Section className="bg-white">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>Henüz proje eklenmemiş.</p>
          </div>
        </Section>
      )}
    </>
  );
};

export default Home;
