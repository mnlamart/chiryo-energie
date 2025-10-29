import Container from './Container';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Témoignages de transformation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment Chiryo Energie a aidé d'autres personnes à transformer leur vie et à atteindre un bien-être durable. Laissez-vous inspirer par leurs histoires et imaginez votre propre succès.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 shadow-md border border-purple-100"
            >
              <div className="flex items-start gap-4 mb-4">
                {testimonial.avatar && (
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-purple-200"
                    loading="lazy"
                  />
                )}
                <p className="text-gray-700 italic leading-relaxed flex-1">
                  "{testimonial.text}"
                </p>
              </div>
              <p className="font-semibold text-purple-600">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

