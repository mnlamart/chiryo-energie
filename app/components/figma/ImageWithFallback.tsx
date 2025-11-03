import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export function ImageWithFallback({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      // Mark as error to prevent infinite error loops
      setHasError(true);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={handleError}
    />
  );
}

