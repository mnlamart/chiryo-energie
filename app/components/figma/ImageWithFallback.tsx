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
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imgSrc !== '/images/placeholder-avatar.jpg') {
      // Try to use local path if remote URL fails
      if (imgSrc.startsWith('http')) {
        // If it's a remote URL, try to extract filename and use local path
        const fallback = '/images/testimonials/placeholder.jpg';
        setImgSrc(fallback);
        setHasError(true);
      } else {
        setImgSrc('/images/placeholder-avatar.jpg');
        setHasError(true);
      }
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      onError={handleError}
    />
  );
}

