import Container from './Container';
import { aboutContent } from '../data/content';

export default function About() {
  return (
    <section className="py-20 bg-gray-50" aria-labelledby="about-heading">
      <Container>
        <article className="max-w-4xl mx-auto">
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            {aboutContent.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
            <div className="md:col-span-1">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80" 
                srcSet="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80 400w, https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80 800w, https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80 1200w"
                sizes="(max-width: 768px) 100vw, 33vw"
                alt="Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours, magnétiseuse coupeuse de feu, voyante et médium" 
                className="w-full rounded-lg shadow-lg object-cover aspect-square"
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="md:col-span-2 space-y-6 text-gray-700 leading-relaxed">
              {aboutContent.paragraphs.map((paragraph, index) => {
                // Enhance paragraph about working locations with more specific location keywords
                if (paragraph.includes('à distance, en présentiel, à domicile')) {
                  return (
                    <p key={index} className="text-lg">
                      {paragraph} Mes consultations sont disponibles à Joué-Les-Tours, Tours et dans tout le département d'Indre-et-Loire (région Centre-Val de Loire).
                    </p>
                  );
                }
                return (
                  <p key={index} className="text-lg">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

