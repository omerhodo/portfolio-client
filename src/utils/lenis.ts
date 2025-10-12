import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;

export const initLenis = () => {
  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time: number) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenisInstance;
};

export const getLenis = () => lenisInstance;

export const stopLenis = () => {
  if (lenisInstance) {
    lenisInstance.stop();
  }
};

export const startLenis = () => {
  if (lenisInstance) {
    lenisInstance.start();
  }
};

export const destroyLenis = () => {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};
