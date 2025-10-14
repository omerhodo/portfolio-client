import AboutMe from '@/components/AboutMe';
import Container from '@/components/Container';
import FullscreenProjectSlider from '@/components/FullscreenProjectSlider';
import type { Project } from '@/types';
import MainHeader from '@components/MainHeader';
import { useEffect, useState } from 'react';

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const projectTypes = [
    { type: 'frontend', title: 'Frontend Projects', icon: '🎨' },
    { type: 'backend', title: 'Backend Projects', icon: '⚙️' },
    { type: 'fullstack', title: 'Fullstack Projects', icon: '🌐' },
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
        <>
          {error && (
            <Container className="bg-red-50">
              <div className="text-red-700 p-4 rounded text-center">{error}</div>
            </Container>
          )}

          {groupedProjects.map((group, _index, array) => {
            const filteredArray = array.filter((g) => g.projects.length > 0);
            const filteredIndex = filteredArray.findIndex((g) => g.type === group.type);
            const isLastSection = filteredIndex === filteredArray.length - 1;

            return group.projects.length > 0 ? (
              <FullscreenProjectSlider
                key={group.type}
                projects={group.projects}
                projectType={group.type}
                title={group.title}
                icon={group.icon}
                isLastSection={isLastSection}
              />
            ) : null;
          })}
        </>
      )}

      {loading && (
        <Container className="bg-white">
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Projeler yükleniyor...</p>
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
