import AboutMe from '@/components/AboutMe';
import Container from '@/components/Container';
import type { Project } from '@/types';
import MainHeader from '@components/MainHeader';
import ProjectCarousel from '@components/ProjectCarousel';
import { useEffect, useState } from 'react';

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const projectTypes = [
    { type: 'frontend', title: 'Frontend Projects', icon: '🎨' },
    { type: 'backend', title: 'Backend Projects', icon: '⚙️' },
    { type: 'mobile', title: 'Mobile Projects', icon: '📱' },
    { type: 'wordpress', title: 'WordPress Projects', icon: '📝' },
    { type: 'ai', title: 'AI Projects', icon: '🤖' },
    { type: 'other', title: 'Other Projects', icon: '📦' },
  ];

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

  const groupedProjects = projectTypes.map((typeInfo) => ({
    ...typeInfo,
    projects: projects.filter((p) => p.projectType === typeInfo.type),
  }));

  return (
    <>
      <Container className="bg-klein">
        <MainHeader />
      </Container>

      <Container className="bg-dark justify-start">
        <AboutMe />
      </Container>

      {!loading && projects.length > 0 && (
        <Container className="bg-violet-200">
          <div className="w-full max-w-7xl mx-auto px-8">
            <h2 className="text-3xl md:text-6xl text-center text-cyan-700 font-notable mb-4 mt-4 md:mb-20 md:mt-0">
              My Projects
            </h2>

            {error && <div className="bg-red-50 text-red-700 p-4 rounded mb-8 text-center">{error}</div>}

            <div>
              {groupedProjects.map((group) =>
                group.projects.length > 0 ? (
                  <ProjectCarousel
                    key={group.type}
                    projects={group.projects}
                    projectType={group.type}
                    title={`${group.icon} ${group.title}`}
                  />
                ) : null
              )}
            </div>
          </div>
        </Container>
      )}

      {loading && (
        <Container className="bg-white">
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Projeler yükleniyor...</p>
          </div>
        </Container>
      )}

      {!loading && projects.length === 0 && !error && (
        <Container className="bg-white">
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Henüz proje eklenmemiş.</p>
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
