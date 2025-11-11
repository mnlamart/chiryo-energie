import { Link } from 'react-router-dom';
import Container from './Container';
import Button from './Button';
import { contactInfo } from '../data/content';

export default function Contact() {
  return (
    <section id="contact" className="py-12 md:py-16 bg-brand-bg" aria-labelledby="contact-heading">
      <Container>
        <header className="text-center mb-12">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contactez-moi
          </h2>
          <p className="text-lg text-gray-600">
            N'hésitez pas à me contacter pour toute question ou pour prendre
            rendez-vous à Joué-Les-Tours ou pour une consultation à distance
          </p>
        </header>

        <div className="bg-brand-card p-6 md:p-8 shadow-lg border border-white/40 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informations de contact
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-hover/30 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Téléphone</p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-hover/30 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-hover/30 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Localisation</p>
                    <p className="text-gray-700">
                      {contactInfo.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-hover/30 flex items-center justify-center shrink-0">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Réseaux sociaux</p>
                    <a
                      href="https://www.facebook.com/profile.php?id=61577552733494"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Facebook - Chiryo Energie
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/60">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Horaires de consultation:</strong>
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Séances en présentiel ou à distance • Sur rendez-vous
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div>
              <p className="text-gray-600 mb-4">
                {contactInfo.location}
              </p>
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border border-white/40">
                <iframe
                  src="https://www.google.com/maps?q=Joué-lès-Tours,+37300+France&hl=fr&t=m&z=13&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation de Chiryo Energie à Joué-Les-Tours"
                  aria-label="Carte Google Maps montrant la localisation de Chiryo Energie à Joué-Les-Tours"
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                <a
                  href="https://www.google.com/maps/search/Joué-lès-Tours,+37300+France"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Ouvrir dans Google Maps
                </a>
              </p>
              <div className="mt-8 text-center">
                <Link to="/contact">
                  <Button>Envoyer un message</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

