import { Link } from 'react-router-dom';
import type { Service } from '../types';
import Button from './Button';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Extract base filename from image path (e.g., /images/services/reiki.jpg -> reiki)
  const imageName = service.image ? service.image.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/-\d+w$/, '') : '';
  const imageDir = service.image?.substring(0, service.image.lastIndexOf('/')) || '';
  
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 overflow-hidden flex flex-col hover:scale-105">
      {service.image && imageName && (
        <Link to={`/services/${service.id}`} className="mb-4 -mx-6 -mt-6 block">
          <picture>
            <source
              type="image/avif"
              srcSet={`${imageDir}/${imageName}-h-400w.avif 400w,
                      ${imageDir}/${imageName}-h-640w.avif 640w,
                      ${imageDir}/${imageName}-h-800w.avif 800w,
                      ${imageDir}/${imageName}-h-1200w.avif 1200w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <source
              type="image/webp"
              srcSet={`${imageDir}/${imageName}-h-400w.webp 400w,
                      ${imageDir}/${imageName}-h-640w.webp 640w,
                      ${imageDir}/${imageName}-h-800w.webp 800w,
                      ${imageDir}/${imageName}-h-1200w.webp 1200w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <source
              type="image/jpeg"
              srcSet={`${imageDir}/${imageName}-h-400w.jpg 400w,
                      ${imageDir}/${imageName}-h-640w.jpg 640w,
                      ${imageDir}/${imageName}-h-800w.jpg 800w,
                      ${imageDir}/${imageName}-h-1200w.jpg 1200w`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <img 
              src={`${imageDir}/${imageName}-h-800w.jpg`}
              alt={`${service.title} - Chiryo Energie à Joué-Les-Tours`}
              className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
              width={800}
              height={480}
              loading="lazy"
              decoding="async"
            />
          </picture>
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
      <p className="text-gray-700 mb-4 leading-relaxed grow">{service.description}</p>
      
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
          {service.id === 'reiki' && 'Découvrir le Reiki'}
          {service.id === 'sophro-relaxation' && 'En savoir plus sur la Sophro-relaxation'}
          {service.id === 'relaxation-energetique' && 'Découvrir la Relaxation énergétique'}
          {service.id === 'reflexologie' && 'En savoir plus sur la Réflexologie'}
          {service.id === 'harmonisation-lymphatique' && 'Découvrir l\'Harmonisation lymphatique'}
          {service.id === 'shiatsu-sevrage' && 'En savoir plus sur le Shiatsu sevrage'}
          {service.id === 'magnetiseuse' && 'Découvrir le Magnétisme'}
          {service.id === 'mediumnite' && 'En savoir plus sur la Médiumnité'}
          {!['reiki', 'sophro-relaxation', 'relaxation-energetique', 'reflexologie', 'harmonisation-lymphatique', 'shiatsu-sevrage', 'magnetiseuse', 'mediumnite'].includes(service.id) && `En savoir plus sur ${service.title}`}
        </Button>
      </Link>
    </article>
  );
}

