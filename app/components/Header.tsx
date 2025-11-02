import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
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
import { aboutContent } from '../data/content';

const guidanceSpirituelle = [
  {
    title: 'Magnétiseuse coupeuse de feu',
    description: 'Soins énergétiques par magnétisme',
    href: '/services/magnetiseuse',
  },
  {
    title: 'Médiumnité Voyance Cartomancie',
    description: 'Consultations de voyance et médiumnité',
    href: '/services/mediumnite',
  },
];

const soinsEnergetiqueCorps = [
  {
    title: 'Reiki',
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
  const [mobileSoinsOpen, setMobileSoinsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/#services') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  // Close mobile menu and submenus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileGuidanceOpen(false);
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
    <div className="fixed top-0 z-50 w-full">
      {/* 20px line above header */}
      <div className="w-full" style={{ height: '20px', backgroundColor: 'rgb(242, 189, 189)' }}></div>
      <nav className="w-full" style={{ backgroundColor: 'rgb(246, 210, 210)' }}>
      <div className="mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex h-[100px] items-center justify-between gap-4">
          {/* Logo and Name */}
          <div className="flex items-center gap-3 shrink-0 min-w-0 h-full">
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
            <div className="hidden sm:flex flex-col justify-center">
              <Link to="/" className="hover:opacity-90 transition-opacity">
                <div className="text-[#6B4B4E] font-medium text-sm sm:text-base lg:text-lg">
                  {aboutContent.name}
                </div>
                <div className="text-[#6B4B4E] text-xs sm:text-sm lg:text-base opacity-80">
                  Psycho-énergéticienne
                </div>
                <div className="text-[#6B4B4E] text-xs sm:text-sm lg:text-base opacity-70">
                  Chiryo Energie
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
                  <NavigationMenuTrigger className="h-10 min-h-0 px-4 py-2 bg-transparent hover:bg-[#D4A5A9] hover:text-[#4A3638] text-[#6B4B4E] data-[state=open]:bg-[#D4A5A9] data-[state=open]:text-[#4A3638]">
                    Guidance spirituelle
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[90vw] max-w-[400px] gap-3 p-6 bg-white">
                      {guidanceSpirituelle.map((service) => (
                        <Link
                          key={service.title}
                          to={service.href}
                          onClick={(e) => handleHashLink(e, service.href)}
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5E8E9] focus:bg-[#F5E8E9]"
                        >
                          <div className="text-[#2C1B1D] font-medium">{service.title}</div>
                          <p className="line-clamp-2 text-[#6B4B4E] opacity-70 text-sm">
                            {service.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 min-h-0 px-4 py-2 bg-transparent hover:bg-[#D4A5A9] hover:text-[#4A3638] text-[#6B4B4E] data-[state=open]:bg-[#D4A5A9] data-[state=open]:text-[#4A3638]">
                    Soins énergetique corps
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[90vw] max-w-[600px] gap-3 p-6 md:grid-cols-2 bg-white">
                      {soinsEnergetiqueCorps.map((service) => (
                        <Link
                          key={service.title}
                          to={service.href}
                          onClick={(e) => handleHashLink(e, service.href)}
                          className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#F5E8E9] focus:bg-[#F5E8E9]"
                        >
                          <div className="text-[#2C1B1D] font-medium">{service.title}</div>
                          <p className="line-clamp-2 text-[#6B4B4E] opacity-70 text-sm">
                            {service.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
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
              <SheetContent side="top" className="border-[#D4A5A9] p-0" style={{ backgroundColor: 'rgb(246, 210, 210)' }}>
                <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#D4A5A9]">
                  <SheetTitle className="text-[#6B4B4E] tracking-wide uppercase text-left text-lg">
                    CHIRYO ENERGIE PSYCHO ENERGETICIENNE
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-2 px-6 pb-6">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md bg-white px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#F5E8E9] font-medium"
                  >
                    Accueil
                  </Link>

                  <div className="flex flex-col">
                    <button
                      onClick={() => setMobileGuidanceOpen(!mobileGuidanceOpen)}
                      className="flex items-center justify-between rounded-md bg-white px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#F5E8E9] font-medium"
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
                      <div className="mt-2 flex flex-col gap-2 pl-4">
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
                      className="flex items-center justify-between rounded-md bg-white px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#F5E8E9] font-medium"
                    >
                      Soins énergetique corps
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform",
                          mobileSoinsOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {mobileSoinsOpen && (
                      <div className="mt-2 flex flex-col gap-2 pl-4">
                        {soinsEnergetiqueCorps.map((service) => (
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
