import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from './Container';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on ESC key press and route change
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            Chiryo Energie
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/#services"
              className={`font-medium transition-colors ${
                location.pathname.startsWith('/services')
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-[73px]"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation */}
        <nav 
          className={`md:hidden fixed left-0 right-0 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${
            isMenuOpen 
              ? 'translate-y-0 top-[73px]' 
              : '-translate-y-full -top-full'
          }`}
        >
          <div className="px-4 py-6 flex flex-col gap-4 border-t border-gray-200">
            <Link
              to="/"
              onClick={closeMenu}
              className={`font-medium transition-colors py-2 ${
                isActive('/') 
                  ? 'text-primary-600 border-l-4 border-primary-600 pl-4' 
                  : 'text-gray-700 hover:text-primary-600 pl-4'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/#services"
              onClick={closeMenu}
              className={`font-medium transition-colors py-2 ${
                location.pathname.startsWith('/services')
                  ? 'text-primary-600 border-l-4 border-primary-600 pl-4' 
                  : 'text-gray-700 hover:text-primary-600 pl-4'
              }`}
            >
              Services
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className={`font-medium transition-colors py-2 ${
                isActive('/contact') 
                  ? 'text-primary-600 border-l-4 border-primary-600 pl-4' 
                  : 'text-gray-700 hover:text-primary-600 pl-4'
              }`}
            >
              Contact
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}

