import MainHeader from '@components/MainHeader';
import Projects from '@components/Projects';
import Section from '@/components/Container';

const Home = () => {
  return (
    <>
      <Section className="bg-yellow">
        <MainHeader />
      </Section>
      <Section className="bg-dark">
        <Projects />
      </Section>
    </>
  );
};

export default Home;
