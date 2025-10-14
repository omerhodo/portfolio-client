import xHodo from '@assets/xhodo.png';
import { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  border?: string;
  borderRadius?: string;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  className?: string;
  placeholderColor?: string;
  threshold?: number;
  rootMargin?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  style,
  border,
  borderRadius,
  width,
  height,
  backgroundColor,
  className,
  placeholderColor = '#e5e7eb',
  threshold = 0.01,
  rootMargin = '50px',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const imageStyle: React.CSSProperties = {
    ...style,
    border: border ? border : undefined,
    borderRadius: borderRadius || '0',
    width: width || 'auto',
    height: height || 'auto',
    backgroundColor: backgroundColor || 'transparent',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  const placeholderStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || '100%',
    backgroundImage: `url(${xHodo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundColor: placeholderColor,
    borderRadius: borderRadius || '0',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <div ref={imgRef} style={{ position: 'relative', width: width || '100%', height: height || '100%' }}>
      <div style={placeholderStyle}></div>
      {isInView && (
        <img src={src} alt={alt} className={className} style={imageStyle} onLoad={handleImageLoad} loading="lazy" />
      )}
    </div>
  );
};

export default LazyImage;
