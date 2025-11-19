import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { cn } from '../utils/cn';
import ResponsiveImage from './ResponsiveImage';

const guidanceSpirituelle = [
  {
    title: 'Voyance et cartomancie',
    description: 'Consultations de voyance et cartomancie',
    href: '/services/voyance',
  },
  {
    title: 'Médiumnité',
    description: 'Consultations de médiumnité',
    href: '/services/mediumnite',
  },
];

const conseilNaturopathie = [
  {
    title: 'Conseil en naturopathie',
    description: 'Accompagnement vers une meilleure santé avec outils naturels',
    href: '/services/conseil-naturopathie',
  },
];

const soinsEnergetique = [
  {
    title: 'Magnétiseuse coupeuse de feu',
    description: 'Soins énergétiques par magnétisme',
    href: '/services/magnetiseuse',
  },
  {
    title: 'Maître enseignante Reiki',
    description: 'Soins énergétiques par imposition des mains',
    href: '/services/reiki',
  },
  {
    title: 'Sophro-relaxation',
    description: 'Techniques de relaxation et de bien-être',
    href: '/services/sophro-relaxation',
  },
  {
    title: 'Relaxation énergétique corps',
    description: 'Stimulation de points en digipression sur la face avant',
    href: '/services/relaxation-energetique',
  },
  {
    title: 'Rééquilibrage des chakras',
    description: 'Réharmonisation énergétique et levée des blocages',
    href: '/services/reequilibrage-des-chakras',
  },
  {
    title: 'Réflexologie plantaire',
    description: 'Soins énergétiques par travail sur les zones réflexes des pieds',
    href: '/services/reflexologie',
  },
  {
    title: 'Harmonisation lymphatique',
    description: 'Drainage lymphatique manuel pour favoriser l\'élimination des déchets',
    href: '/services/harmonisation-lymphatique',
  },
  {
    title: 'Shiatsu sevrage tabagique',
    description: 'Accompagnement au sevrage tabagique par shiatsu',
    href: '/services/shiatsu-sevrage',
  },
];

export default function Header() {
  const [mobileGuidanceOpen, setMobileGuidanceOpen] = useState(false);
  const [mobileConseilNaturopathieOpen, setMobileConseilNaturopathieOpen] = useState(false);
  const [mobileSoinsOpen, setMobileSoinsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/services') {
      return location.pathname === '/services' || location.pathname.startsWith('/services/');
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  // Close mobile menu and submenus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileGuidanceOpen(false);
    setMobileConseilNaturopathieOpen(false);
    setMobileSoinsOpen(false);
  }, [location.pathname]);

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      e.preventDefault();
      const [path] = href.split('#');
      if (path === '/') {
        window.location.href = href;
      } else {
        // Navigate to path first, then scroll to hash
        window.location.href = href;
      }
    }
  };

  return (
    <div className="fixed top-0 z-100 w-full">
      {/* 20px line above header */}
      <div className="w-full" style={{ height: '20px', backgroundColor: 'rgb(242, 189, 189)' }}></div>
      <nav className="w-full" style={{ backgroundColor: 'rgb(246, 210, 210)' }}>
        <div className="mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex h-[100px] items-center justify-between gap-4">
              {/* Logo and Name */}
              <div className="flex items-center sm:gap-3 min-w-0 h-full shrink">
                <Link to="/" className="flex items-center h-full hover:opacity-90 transition-opacity py-1">
                  <ResponsiveImage
                    src="logo-noella-high"
                    category="logos"
                    alt="Chiryo Energie Logo"
                    className="max-h-full w-auto object-contain"
                    sizes="94px"
                    loading="eager"
                    fetchPriority="high"
                    width={94}
                    height={94}
                    customSizes={[94, 188]}
                  />
                </Link>
                <div className="flex flex-col justify-center min-w-0">
                  <Link to="/" className="hover:opacity-90 transition-opacity">
                    <div className="flex flex-col">
                      <div className="text-[#6B4B4E] font-medium text-sm md:text-base lg:text-lg">
                        Noëlla Angignard - Cabinet Chiryo Énergie
                      </div>
                      <div className="text-[#6B4B4E] text-xs md:text-sm lg:text-base opacity-80">
                        Psycho-énergéticienne - Magnétisme - Voyance
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:gap-1 lg:shrink-0">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/"
                          className={cn(
                            "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 transition-colors hover:bg-[#D4A5A9] hover:text-[#4A3638] focus:bg-[#D4A5A9] focus:text-[#4A3638] focus:outline-none text-[#6B4B4E]",
                            isActive('/') && 'bg-[#D4A5A9] text-[#4A3638]'
                          )}
                        >
                          Accueil
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>


                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/tarifs"
                          className={cn(
                            "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 transition-colors hover:bg-[#D4A5A9] hover:text-[#4A3638] focus:bg-[#D4A5A9] focus:text-[#4A3638] focus:outline-none text-[#6B4B4E]",
                            isActive('/tarifs') && 'bg-[#D4A5A9] text-[#4A3638]'
                          )}
                        >
                          Tarifs
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>


                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className="h-10 min-h-0 px-4 py-2 bg-transparent hover:bg-[#D4A5A9] hover:text-[#4A3638] text-[#6B4B4E] data-[state=open]:bg-[#D4A5A9] data-[state=open]:text-[#4A3638] cursor-pointer"
                        onClick={() => {
                          // On click, navigate to services page
                          void navigate('/services');
                        }}
                      >
                        Services
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[90vw] max-w-[800px] p-4 bg-white">
                          {/* Tous les services link at top */}
                          <Link
                            to="/services"
                            className="block mb-4 pb-2 border-b border-[#D4A5A9]"
                          >
                            <div className="text-base font-semibold text-[#2C1B1D] hover:text-[#4A3638] transition-colors">
                              Tous les services
                            </div>
                          </Link>
                          
                          {/* Three columns for categories */}
                          <div className="grid md:grid-cols-3 gap-6">
                            {/* Guidance spirituelle section */}
                            <div>
                              <h3 className="text-sm font-semibold text-[#2C1B1D] mb-2">Guidance spirituelle</h3>
                              <div className="space-y-1">
                                {guidanceSpirituelle.map((service) => (
                                  <Link
                                    key={service.title}
                                    to={service.href}
                                    onClick={(e) => handleHashLink(e, service.href)}
                                    className="block select-none rounded-md px-3 py-3 min-h-[44px] text-sm leading-normal no-underline outline-none transition-colors hover:bg-[#F5E8E9] focus:bg-[#F5E8E9] text-[#2C1B1D] font-medium flex items-center"
                                  >
                                    {service.title}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Soins énergétiques section */}
                            <div>
                              <h3 className="text-sm font-semibold text-[#2C1B1D] mb-2">Soins énergétiques et développement personnel</h3>
                              <div className="space-y-1">
                                {soinsEnergetique.map((service) => (
                                  <Link
                                    key={service.title}
                                    to={service.href}
                                    onClick={(e) => handleHashLink(e, service.href)}
                                    className="block select-none rounded-md px-3 py-3 min-h-[44px] text-sm leading-normal no-underline outline-none transition-colors hover:bg-[#F5E8E9] focus:bg-[#F5E8E9] text-[#2C1B1D] font-medium flex items-center"
                                  >
                                    {service.title}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Conseil en Naturopathie section */}
                            <div>
                              <h3 className="text-sm font-semibold text-[#2C1B1D] mb-2">Conseil en Naturopathie</h3>
                              <div className="space-y-1">
                                {conseilNaturopathie.map((service) => (
                                  <Link
                                    key={service.title}
                                    to={service.href}
                                    onClick={(e) => handleHashLink(e, service.href)}
                                    className="block select-none rounded-md px-3 py-3 min-h-[44px] text-sm leading-normal no-underline outline-none transition-colors hover:bg-[#F5E8E9] focus:bg-[#F5E8E9] text-[#2C1B1D] font-medium flex items-center"
                                  >
                                    {service.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/contact"
                          className={cn(
                            "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 transition-colors hover:bg-[#D4A5A9] hover:text-[#4A3638] focus:bg-[#D4A5A9] focus:text-[#4A3638] focus:outline-none text-[#6B4B4E]",
                            isActive('/contact') && 'bg-[#D4A5A9] text-[#4A3638]'
                          )}
                        >
                          Contact
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-[#6B4B4E] hover:bg-[#D4A5A9]"
                    >
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                   <SheetContent side="top" className="border-[#D4A5A9] p-0 rounded-b-2xl z-[99] mt-[120px] [&>button]:hidden" style={{ backgroundColor: 'rgb(246, 210, 210)' }}>
                    <ScrollArea className="h-[calc(100vh-120px)] max-h-[calc(100vh-120px)]">
                      <div className="pt-4 flex flex-col gap-2 px-6 pb-6">
                      <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-md bg-white px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#F5E8E9] font-medium"
                      >
                        Accueil
                      </Link>

                      <Link
                        to="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-md bg-white px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#F5E8E9] font-medium"
                      >
                        Services
                      </Link>

                      <div className="flex flex-col">
                        <button
                          onClick={() => setMobileGuidanceOpen(!mobileGuidanceOpen)}
                          className="flex items-center justify-between rounded-md bg-white/80 px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-white font-medium ml-4"
                        >
                          Guidance spirituelle
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform",
                              mobileGuidanceOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        {mobileGuidanceOpen && (
                          <div className="mt-2 flex flex-col gap-2 pl-8">
                            {guidanceSpirituelle.map((service) => (
                              <Link
                                key={service.title}
                                to={service.href}
                                onClick={(e) => {
                                  handleHashLink(e, service.href);
                                  setMobileGuidanceOpen(false);
                                  setMobileMenuOpen(false);
                                }}
                                className="block rounded-md bg-white/50 px-4 py-2 text-[#6B4B4E] transition-colors hover:bg-white"
                              >
                                <div className="font-medium">{service.title}</div>
                                <p className="opacity-70 mt-1 text-sm">{service.description}</p>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <button
                          onClick={() => setMobileSoinsOpen(!mobileSoinsOpen)}
                          className="flex items-center justify-between rounded-md bg-white/80 px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-white font-medium ml-4"
                        >
                          Soins énergétiques et développement personnel
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform",
                              mobileSoinsOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        {mobileSoinsOpen && (
                          <div className="mt-2 flex flex-col gap-2 pl-8">
                            {soinsEnergetique.map((service) => (
                              <Link
                                key={service.title}
                                to={service.href}
                                onClick={(e) => {
                                  handleHashLink(e, service.href);
                                  setMobileSoinsOpen(false);
                                  setMobileMenuOpen(false);
                                }}
                                className="block rounded-md bg-white/50 px-4 py-2 text-[#6B4B4E] transition-colors hover:bg-white"
                              >
                                <div className="font-medium">{service.title}</div>
                                <p className="opacity-70 mt-1 text-sm">{service.description}</p>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <button
                          onClick={() => setMobileConseilNaturopathieOpen(!mobileConseilNaturopathieOpen)}
                          className="flex items-center justify-between rounded-md bg-white/80 px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-white font-medium ml-4"
                        >
                          Conseil en Naturopathie
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform",
                              mobileConseilNaturopathieOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        {mobileConseilNaturopathieOpen && (
                          <div className="mt-2 flex flex-col gap-2 pl-8">
                            {conseilNaturopathie.map((service) => (
                              <Link
                                key={service.title}
                                to={service.href}
                                onClick={(e) => {
                                  handleHashLink(e, service.href);
                                  setMobileConseilNaturopathieOpen(false);
                                  setMobileMenuOpen(false);
                                }}
                                className="block rounded-md bg-white/50 px-4 py-2 text-[#6B4B4E] transition-colors hover:bg-white"
                              >
                                <div className="font-medium">{service.title}</div>
                                <p className="opacity-70 mt-1 text-sm">{service.description}</p>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      <Link
                        to="/tarifs"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-md bg-white px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#F5E8E9] font-medium"
                      >
                        Tarifs
                      </Link>

                      <Link
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-md bg-white px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#F5E8E9] font-medium"
                      >
                        Contact
                      </Link>
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
