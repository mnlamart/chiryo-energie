import Container from './Container';
import { aboutContent } from '../data/content';

export default function QuiSuisJe() {
  return (
    <section className="py-12 md:py-24 bg-brand-bg" aria-labelledby="qui-suis-je-heading">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg border border-white/40 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
              {/* Left Side - Image */}
              <div className="order-1 lg:order-1">
                {/* Mobile: Horizontal cropped image (4:3) - shows more of original */}
                <div className="relative aspect-[4/3] lg:hidden rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/qui-suis-je/qui-suis-je-image-h-400w.avif 400w,
                              /images/qui-suis-je/qui-suis-je-image-h-600w.avif 600w,
                              /images/qui-suis-je/qui-suis-je-image-h-800w.avif 800w,
                              /images/qui-suis-je/qui-suis-je-image-h-1000w.avif 1000w"
                      sizes="100vw"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/qui-suis-je/qui-suis-je-image-h-400w.webp 400w,
                              /images/qui-suis-je/qui-suis-je-image-h-600w.webp 600w,
                              /images/qui-suis-je/qui-suis-je-image-h-800w.webp 800w,
                              /images/qui-suis-je/qui-suis-je-image-h-1000w.webp 1000w"
                      sizes="100vw"
                    />
                    <source
                      type="image/jpeg"
                      srcSet="/images/qui-suis-je/qui-suis-je-image-h-400w.jpg 400w,
                              /images/qui-suis-je/qui-suis-je-image-h-600w.jpg 600w,
                              /images/qui-suis-je/qui-suis-je-image-h-800w.jpg 800w,
                              /images/qui-suis-je/qui-suis-je-image-h-1000w.jpg 1000w"
                      sizes="100vw"
                    />
                    <img
                      src="/images/qui-suis-je/qui-suis-je-image-h-800w.jpg"
                      alt="Chiryo Energie - Magnétiseuse coupeuse de feu, voyante et médium"
                      className="w-full h-full object-cover"
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>

                {/* Desktop: Full original image */}
                <div className="relative hidden lg:block rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/qui-suis-je/qui-suis-je-image-400w.avif 400w,
                              /images/qui-suis-je/qui-suis-je-image-600w.avif 600w,
                              /images/qui-suis-je/qui-suis-je-image-800w.avif 800w,
                              /images/qui-suis-je/qui-suis-je-image-1000w.avif 1000w"
                      sizes="640px"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/qui-suis-je/qui-suis-je-image-400w.webp 400w,
                              /images/qui-suis-je/qui-suis-je-image-600w.webp 600w,
                              /images/qui-suis-je/qui-suis-je-image-800w.webp 800w,
                              /images/qui-suis-je/qui-suis-je-image-1000w.webp 1000w"
                      sizes="640px"
                    />
                    <source
                      type="image/jpeg"
                      srcSet="/images/qui-suis-je/qui-suis-je-image-400w.jpg 400w,
                              /images/qui-suis-je/qui-suis-je-image-600w.jpg 600w,
                              /images/qui-suis-je/qui-suis-je-image-800w.jpg 800w,
                              /images/qui-suis-je/qui-suis-je-image-1000w.jpg 1000w"
                      sizes="640px"
                    />
                    <img
                      src="/images/qui-suis-je/qui-suis-je-image-800w.jpg"
                      alt="Chiryo Energie - Magnétiseuse coupeuse de feu, voyante et médium"
                      className="w-full h-auto object-contain"
                      width={800}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              </div>

              {/* Right Side - Text Content */}
              <div className="order-2 lg:order-2 space-y-4 md:space-y-8 px-2 md:px-0">
                <div className="text-center md:text-left">
                  <h2 id="qui-suis-je-heading" className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
                    Qui suis-je?
                  </h2>
                  <p className="text-xl md:text-2xl font-semibold text-gray-800">
                    {aboutContent.name}
                  </p>
                </div>

                <div className="space-y-4 md:space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-sm md:text-lg">
                    Magnétiseuse coupeuse de feu, voyante et médium, j'ai hérité d'un <strong>véritable packaging familial</strong> : une arrière grand-mère qui coupait le feu, un grand-père radiesthésiste et des oncles médiums et cartomanciens. J'ai donc évolué dans un univers familial où <strong>pendule, tarot de Marseille et coton magnétisé</strong> faisaient partie du quotidien.
                  </p>

                  <p className="text-sm md:text-lg">
                    J'ai souvent eu l'impression depuis toute petite que je n'étais pas "comme tout le monde", mon <strong>hypersensibilité</strong> à mon environnement, aux gens, aux lieux que je croisais ne faisait que s'accroître au fil du temps jusqu'à devenir pressante. Il me fallait donc mettre cette sensibilité <strong>au service des gens</strong>.
                  </p>

                  <p className="text-sm md:text-lg">
                    Et puis des accidents de vie m'ont amenée à un long chemin de <strong>développement personnel</strong> : la <strong>Sophrologie</strong> tout d'abord et puis le <strong>Reiki</strong>, entre autres outils qui m'ont permis de me relever de ces parcours longs et difficiles, de travailler sur moi et d'accéder à un véritable <strong>lâcher-prise</strong>.
                  </p>

                  <p className="text-sm md:text-lg">
                    Chiryo Energie est alors né d'une passion pour le bien-être et d'une volonté d'aider chacun à <strong>trouver son équilibre</strong>. Je suis fière de vous offrir une approche personnalisée et attentive. Mon objectif est de vous accompagner vers une vie plus épanouie et pleine d'énergie. En tant que <strong>Psycho énergéticienne : Magnétiseuse, Maître enseignante en Reiki, Sophro relaxologue</strong>, je travaille <strong>à distance, en présentiel, à domicile</strong>.
                  </p>

                  <p className="text-xs md:text-lg italic text-gray-600 pt-3 md:pt-4 border-t border-white/60">
                    En aucun cas les séances ne sauraient se substituer à un avis médical.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

