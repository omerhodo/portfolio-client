import profilePic from '@assets/profile.jpg';
import Image from '@components/Image';
import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';
import styles from './MainHeader.module.scss';

const MainHeader = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <div className="flex flex-col w-full">
      <div className="flex mb-8 items-center flex-col md:flex-row gap-8 md:gap-0">
        <p className={styles['first-one']}>I'm &nbsp;</p>
        <p className={`${styles['first-two']}`}>
          Ömer <span className="bg-klein-opacity-10 p-3">Hodo</span>
        </p>
        <Image
          src={profilePic}
          alt="Ömer Hodo"
          className="ml-0 md:ml-10"
          width="100px"
          height="50px"
          border="2px solid black"
          borderRadius="50px"
          style={{ objectFit: 'contain', filter: 'drop-shadow(2px 4px 6px black)' }}
          backgroundColor="black"
        />
      </div>
      <div className="flex mb-8 md:mb-24 items-center justify-end flex-col md:flex-row gap-8 md:gap-0">
        <p className={styles['second-one']}>a software</p>
        <Image
          src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Coding"
          width="50px"
          height="50px"
          border="3px solid black"
          borderRadius="20px"
          style={{ objectFit: 'cover', marginInlineStart: '10px', marginInlineEnd: '10px' }}
        />
        <p className={styles['second-two']}>developer</p>
      </div>
      <div className="flex items-center justify-center tracking-[10px] md:flex-row flex-col gap-8 md:gap-0">
        <p className={styles['third-one']}>based in Antalya</p>
        <Image
          src="https://images.unsplash.com/photo-1648325129746-abcc1b872380?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Antalya"
          width="75px"
          height="50px"
          border="3px solid black"
          borderRadius="20px"
          style={{ objectFit: 'cover', marginInlineStart: '10px' }}
        />
        <span className={styles['third-two']}>, Turkiye</span>
      </div>
    </div>
  );
};

export default MainHeader;
