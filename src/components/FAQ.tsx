import { useState } from 'react';

interface FAQProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function FAQ({ question, answer, defaultOpen = false }: FAQProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-gradient-to-r from-primary-50 to-warm-50 rounded-lg border border-primary-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-center justify-between hover:bg-primary-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
        aria-expanded={isOpen}
      >
        <h3 className="font-bold text-gray-900 text-lg pr-4">
          {question}
        </h3>
        <svg
          className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pt-4 pb-6">
          <p className="text-gray-700 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

