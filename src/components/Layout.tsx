import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import StructuredData from './StructuredData';
import SkipToContent from './SkipToContent';
import ScrollToTop from './ScrollToTop';
import ScrollToTopOnRouteChange from './ScrollToTopOnRouteChange';
import FloatingActionButton from './FloatingActionButton';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipToContent />
      <ScrollToTopOnRouteChange />
      <StructuredData />
      <Header />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingActionButton />
    </div>
  );
}

