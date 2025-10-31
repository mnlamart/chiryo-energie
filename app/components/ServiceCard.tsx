import { Link } from 'react-router-dom';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Extract base filename from image path
  const imageName = service.image ? service.image.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/-\d+w$/, '') : '';
  const imageDir = service.image?.substring(0, service.image.lastIndexOf('/')) || '';
  
  return (
    <Link 
      to={`/services/${service.id}`}
      className="group block w-full bg-brand-card rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-white/40 flex flex-col hover:border-primary-300"
    >
      <div className="flex flex-col h-full">
        {/* Image */}
        {service.image && imageName && (
          <div className="relative w-full aspect-square overflow-hidden bg-gray-100 flex-shrink-0">
            <picture>
              <source
                type="image/avif"
                srcSet={`${imageDir}/${imageName}-sq-96w.avif 96w,
                        ${imageDir}/${imageName}-sq-192w.avif 192w,
                        ${imageDir}/${imageName}-sq-300w.avif 300w,
                        ${imageDir}/${imageName}-sq-400w.avif 400w,
                        ${imageDir}/${imageName}-sq-500w.avif 500w`}
                sizes="(max-width: 640px) 400px, (max-width: 1024px) 200px, 150px"
              />
              <source
                type="image/webp"
                srcSet={`${imageDir}/${imageName}-sq-96w.webp 96w,
                        ${imageDir}/${imageName}-sq-192w.webp 192w,
                        ${imageDir}/${imageName}-sq-300w.webp 300w,
                        ${imageDir}/${imageName}-sq-400w.webp 400w,
                        ${imageDir}/${imageName}-sq-500w.webp 500w`}
                sizes="(max-width: 640px) 400px, (max-width: 1024px) 200px, 150px"
              />
              <source
                type="image/jpeg"
                srcSet={`${imageDir}/${imageName}-sq-96w.jpg 96w,
                        ${imageDir}/${imageName}-sq-192w.jpg 192w,
                        ${imageDir}/${imageName}-sq-300w.jpg 300w,
                        ${imageDir}/${imageName}-sq-400w.jpg 400w,
                        ${imageDir}/${imageName}-sq-500w.jpg 500w`}
                sizes="(max-width: 640px) 400px, (max-width: 1024px) 200px, 150px"
              />
              <img 
                src={`${imageDir}/${imageName}-sq-400w.jpg`}
                alt={`${service.title} - Chiryo Energie`}
                className="w-full h-full object-cover"
                width={400}
                height={400}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('.webp')) {
                    target.src = target.src.replace('.jpg', '.webp');
                  }
                }}
              />
              <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </picture>
          </div>
        )}
        
        {/* Content */}
        <div className="p-3 md:p-3 flex-1 flex flex-col min-w-0">
          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2 text-center">
            {service.title}
          </h3>
          
          {/* Description */}
          {service.description && (
            <p className="text-xs md:text-sm text-gray-600 mb-3 leading-relaxed text-center flex-grow">
              {service.description}
            </p>
          )}
          
          {/* Price */}
          {service.price && (
            <div className="mt-auto text-center">
              <div className="text-sm md:text-base font-bold text-primary-700">
                {service.price}
              </div>
              {service.duration && (
                <div className="text-xs text-gray-500 mt-1">
                  {service.duration}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

