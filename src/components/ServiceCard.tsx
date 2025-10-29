import { Link } from 'react-router-dom';
import type { Service } from '../types';
import Button from './Button';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 overflow-hidden flex flex-col hover:scale-105">
      {service.image && (
        <Link to={`/services/${service.id}`} className="mb-4 -mx-6 -mt-6 block">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
            loading="lazy"
          />
        </Link>
      )}
      <h3 className="text-xl font-bold text-primary-600 mb-3">
        <Link 
          to={`/services/${service.id}`}
          className="hover:text-primary-700 transition-colors"
        >
          {service.title}
        </Link>
      </h3>
      <p className="text-gray-700 mb-4 leading-relaxed flex-grow">{service.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">Tarif:</span>
          <span className="text-primary-600 font-medium">{service.price}</span>
        </div>
        {service.duration && (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">Durée:</span>
            <span className="text-gray-600">{service.duration}</span>
          </div>
        )}
      </div>
      
      {service.notes && (
        <p className="text-sm text-gray-600 italic border-t pt-3 mb-4">{service.notes}</p>
      )}

      <Link to={`/services/${service.id}`}>
        <Button variant="secondary" className="w-full">
          En savoir plus
        </Button>
      </Link>
    </div>
  );
}

