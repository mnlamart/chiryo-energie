import Container from './Container';
import { aboutContent } from '../data/content';

export default function About() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            {aboutContent.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
            <div className="md:col-span-1">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80" 
                alt="Chiryo Energie - Psycho énergéticienne" 
                className="w-full rounded-lg shadow-lg object-cover aspect-square"
                loading="lazy"
              />
            </div>
            <div className="md:col-span-2 space-y-6 text-gray-700 leading-relaxed">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

