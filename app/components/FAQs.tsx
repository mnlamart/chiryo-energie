import * as Accordion from '@radix-ui/react-accordion';
import Container from './Container';
import FAQ from './FAQ';
import { generalFAQs } from '../data/faqs';

export default function FAQs() {
  return (
    <section className="py-20 bg-brand-bg" aria-labelledby="faq-heading">
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
          
          <div className="space-y-12">
            {generalFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  {category.title}
                </h3>
                <Accordion.Root 
                  type="single" 
                  collapsible 
                  className="space-y-4"
                >
                  {category.faqs.map((faq, faqIndex) => (
                    <FAQ 
                      key={faqIndex}
                      value={`category-${categoryIndex}-faq-${faqIndex}`}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </Accordion.Root>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

