import LazyImage from '@components/LazyImage';

interface ImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  border?: string;
  borderRadius?: string;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  className?: string;
  lazy?: boolean;
  placeholderColor?: string;
  threshold?: number;
  rootMargin?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  style,
  border,
  borderRadius,
  width,
  height,
  backgroundColor,
  className,
  lazy = true,
  placeholderColor,
  threshold,
  rootMargin,
}) => {
  if (lazy) {
    return (
      <LazyImage
        src={src}
        alt={alt}
        style={style}
        border={border}
        borderRadius={borderRadius}
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        className={className}
        placeholderColor={placeholderColor}
        threshold={threshold}
        rootMargin={rootMargin}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        ...style,
        border: border ? border : undefined,
        borderRadius: borderRadius || '0',
        width: width || 'auto',
        height: height || 'auto',
        backgroundColor: backgroundColor || 'transparent',
      }}
    />
  );
};

export default Image;
