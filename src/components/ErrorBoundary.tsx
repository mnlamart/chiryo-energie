import { Component, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import Button from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-20 bg-gray-50 min-h-screen flex items-center">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Quelque chose s'est mal passé
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Une erreur s'est produite. Veuillez rafraîchir la page ou retourner à l'accueil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Rafraîchir la page
                </button>
                <Link to="/">
                  <Button variant="secondary">Retour à l'accueil</Button>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}

