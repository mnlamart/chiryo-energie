import * as Accordion from '@radix-ui/react-accordion';

interface FAQProps {
  value: string;
  question: string;
  answer: string;
}

export default function FAQ({ value, question, answer }: FAQProps) {
  return (
    <Accordion.Item
      value={value}
      className="bg-brand-card rounded-lg border border-white/40 overflow-hidden focus-within:relative focus-within:z-10"
    >
      <Accordion.Header className="flex">
        <Accordion.Trigger className="group w-full text-left p-6 flex items-center justify-between hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer data-[state=open]:bg-white/30">
          <h3 className="font-bold text-gray-900 text-lg pr-4">
            {question}
          </h3>
          <svg
            className="w-5 h-5 text-primary-600 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="px-6 pt-4 pb-6">
          <p className="text-gray-700 leading-relaxed">
            {answer}
          </p>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

