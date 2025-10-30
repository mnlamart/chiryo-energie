import { contactInfo } from '../data/content';

export default function FloatingActionButton() {
  return (
    <div className="fixed bottom-24 right-8 z-50">
      <a
        href={`tel:${contactInfo.phone}`}
        className="flex items-center gap-3 bg-green-700 text-white px-6 py-4 rounded-full shadow-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 hover:scale-105 border border-white/20"
        aria-label="Appeler maintenant"
        title="Appeler maintenant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="font-semibold hidden sm:inline">Appeler</span>
      </a>
    </div>
  );
}

