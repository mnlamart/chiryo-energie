import Container from './Container';
import FAQ from './FAQ';
import { generalFAQs } from '../data/faqs';

export default function FAQs() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-gray-600">
              Trouvez rapidement les réponses aux questions les plus courantes
            </p>
          </div>
          
          <div className="space-y-4">
            {generalFAQs.map((faq, index) => (
              <FAQ 
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

