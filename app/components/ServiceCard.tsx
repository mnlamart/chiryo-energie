import { Link } from 'react-router-dom';
import type { Service } from '../types';
import ResponsiveImage from './ResponsiveImage';
import { getBaseImageName } from '../utils/images';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Extract base image name from service image path
  const imageName = service.image ? getBaseImageName(service.image) : null;
  
  return (
    <Link 
      to={`/services/${service.id}`}
      className="group w-full bg-brand-card rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-400 flex flex-col hover:border-primary-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      <div className="flex flex-col h-full">
        {/* Image */}
        {service.image && imageName && (
          <div className="relative w-full aspect-square overflow-hidden bg-gray-100 shrink-0">
            <ResponsiveImage
              src={imageName}
              category="services"
              variant="sq"
              alt={`${service.title} - Services de bien-être à Joué-Les-Tours par Chiryo Energie`}
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
          {(service.servicesPageDescription || service.description) && (
            <p className="text-xs md:text-sm text-gray-800 mb-3 leading-relaxed text-center grow">
              {service.servicesPageDescription || service.description}
            </p>
          )}
          
          {/* Price */}
          {service.price && (
            <div className="mt-auto text-center">
              <div className="text-sm md:text-base font-bold text-primary-700">
                {service.price}
              </div>
              {service.duration && (
                <div className="text-xs text-gray-700 mt-1">
                  {service.duration}
                </div>
              )}
            </div>
          )}
          
          {/* CTA Indicator */}
          <div className="mt-3 pt-3 border-t border-gray-400 flex items-center justify-center gap-2 text-primary-800 group-hover:text-primary-900 transition-colors">
            <span className="text-xs md:text-sm font-medium">En savoir plus</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

