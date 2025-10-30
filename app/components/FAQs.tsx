import * as Accordion from '@radix-ui/react-accordion';
import Container from './Container';
import FAQ from './FAQ';
import { generalFAQs } from '../data/faqs';

export default function FAQs() {
  return (
    <section className="py-20 bg-gray-50" aria-labelledby="faq-heading">
      <Container>
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-gray-600">
              Trouvez rapidement les réponses aux questions les plus courantes sur nos services de bien-être à Joué-Les-Tours
            </p>
          </header>
          
          <Accordion.Root 
            type="single" 
            collapsible 
            className="space-y-4"
          >
            {generalFAQs.map((faq, index) => (
              <FAQ 
                key={index}
                value={`faq-${index}`}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </Accordion.Root>
        </div>
      </Container>
    </section>
  );
}

