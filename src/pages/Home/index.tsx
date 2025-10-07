import AboutMe from '@/components/AboutMe';
import Section from '@/components/Container';
import MainHeader from '@components/MainHeader';

const Home = () => {
  return (
    <>
      <Section className="bg-yellow">
        <MainHeader />
      </Section>
      <Section className="bg-dark justify-start">
        <AboutMe />
      </Section>
    </>
  );
};

export default Home;
