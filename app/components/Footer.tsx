import { Link } from 'react-router-dom';
import Container from './Container';
import { contactInfo } from '../data/content';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-header mt-auto border-t-2 border-brand-accent">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-600">Chiryo Energie</h3>
            <p className="text-gray-900 mb-2 font-medium">
              L'équilibre à portée de mains
            </p>
            <p className="text-sm text-gray-700 italic">
              Séances en présentiel ou à distance • Sur rendez-vous
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-900">
              <p>
                <a href={`tel:${contactInfo.phone}`} className="hover:text-primary-600 transition-colors">
                  {contactInfo.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary-600 transition-colors">
                  {contactInfo.email}
                </a>
              </p>
              <p>{contactInfo.location}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2 text-gray-900">
              <Link to="/" className="hover:text-primary-600 transition-colors">Accueil</Link>
              <Link to="/#services" className="hover:text-primary-600 transition-colors">Services</Link>
              <Link to="/a-propos" className="hover:text-primary-600 transition-colors">À propos</Link>
              <Link to="/faqs" className="hover:text-primary-600 transition-colors">Questions fréquentes</Link>
              <Link to="/contact" className="hover:text-primary-600 transition-colors">Contact</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61577552733494" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-primary-600 transition-colors"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/40 text-center text-gray-700">
          <p>&copy; {currentYear} Chiryo Energie. Tous droits réservés.</p>
        </div>
      </Container>
    </footer>
  );
}

