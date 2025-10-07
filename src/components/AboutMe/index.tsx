import profilePic from '@assets/profile.jpg';
import Image from '@components/Image';

const AboutMe = () => {
  return (
    <div className="ml-0 justify-start flex md:flex-row flex-col md:p-0 p-5 md:ml-50 py-20 md:py-0">
      <Image
        src={profilePic}
        width={400}
        height={400}
        alt="Ömer Hodo"
        border="3px solid yellow"
        borderRadius="20px"
        className="brightness-20"
        style={{ transform: 'rotate(-5deg)' }}
      />
      <div className="max-w-lg flex flex-col justify-center gap-4 ml-0 -mt-50 z-1 text-fuchsia-400 md:-ml-20 md:-mt-10">
        <h2 className="ml-5 text-5xl font-raleway">About Me</h2>
        <p className="font-montserrat">
          I am a <span className="text-2xl text-lime-200 font-suse-mono">Frontend Developer</span> passionate about
          creating user-focused, high-quality interfaces with a detail-oriented mindset and strong emphasis on code
          maintainability. I leverage{' '}
          <span className="text-4xl text-lime-100 font-poiret-one">modern web technologies</span> to build efficient and
          scalable solutions, with experience in component-based architectures, responsive design, performance
          optimization, and UI/UX-driven development. I enjoy taking an active role in project workflows by
          collaborating effectively with crossfunctional teams and contributing with a solution-oriented approach.
          Committed to continuous learning, I stay up to date with{' '}
          <span className="text-xl text-yellow-500 font-poiret-one">evolving frontend technologies</span> and aim to
          grow with every project I contribute to. Motivated by the drive to deliver impactful digital experiences, I’m
          eager to be part of a dynamic team where I can apply my skills and create meaningful value.
        </p>
        <p className="font-montserrat">
          I enjoy <span className="text-2xl text-lime-200 font-noto-sans">taking an active role</span> in project
          workflows by collaborating effectively with crossfunctional teams and contributing with a solution-oriented
          approach. Committed to continuous learning, I stay up to date with evolving frontend technologies and aim to
          grow with every project I contribute to.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
