import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';
import MetaTags from '../components/MetaTags';

export default function NotFound() {
  return (
    <>
      <MetaTags 
        title="Page non trouvée - 404"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
      />
      <div className="py-20 bg-gray-50 min-h-screen flex items-center">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-primary-600 mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Page non trouvée
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button>Retour à l'accueil</Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary">Me contacter</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

