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
}) => {
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
