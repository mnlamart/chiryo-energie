import { Link } from 'react-router-dom';
import type { Service } from '../types';
import ResponsiveImage from './ResponsiveImage';
import { getBaseImageName } from '../utils/images';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Extract base image name from service image path
  const imageName = service.image ? getBaseImageName(service.image) : null;
  
  return (
    <Link 
      to={`/services/${service.id}`}
      className="group block w-full bg-brand-card rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-white/40 flex flex-col hover:border-primary-300"
    >
      <div className="flex flex-col h-full">
        {/* Image */}
        {service.image && imageName && (
          <div className="relative w-full aspect-square overflow-hidden bg-gray-100 flex-shrink-0">
            <ResponsiveImage
              src={imageName}
              category="services"
              variant="sq"
              alt={`${service.title} - Chiryo Energie`}
              className="w-full h-full object-cover"
              sizes="(max-width: 640px) 400px, (max-width: 1024px) 200px, 150px"
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              customSizes={[96, 192, 300, 400, 500]}
            />
            <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
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

