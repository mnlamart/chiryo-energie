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

const services = [
  {
    title: 'Tous les services',
    description: 'Découvrez tous nos services de bien-être holistique',
    href: '/#services',
  },
  {
    title: 'Magnétiseuse / Coupeuse de feu',
    description: 'Soins énergétiques par magnétisme',
    href: '/services/magnetiseuse',
  },
  {
    title: 'Voyance / Médiumnité',
    description: 'Consultations de voyance et médiumnité',
    href: '/services/mediumnite',
  },
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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

  // Close mobile services submenu when route changes
  useEffect(() => {
    setMobileServicesOpen(false);
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
    <nav className="sticky top-0 z-50 w-full border-b bg-[#E5B8BC] border-[#D4A5A9]">
      <div className="mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink min-w-0 flex-1">
            <Link to="/" className="text-[#6B4B4E] tracking-wide hover:text-[#4A3638] transition-colors block">
              <h1 className="text-sm sm:text-base lg:text-xl xl:text-2xl font-medium uppercase truncate">
                Chiryo Energie Psycho Energeticienne
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
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
                  <NavigationMenuTrigger className="bg-transparent hover:bg-[#D4A5A9] text-[#6B4B4E] data-[state=open]:bg-[#D4A5A9]">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-6 md:grid-cols-2 bg-white">
                      {services.map((service) => (
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
                      to="/a-propos"
                      className={cn(
                        "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 transition-colors hover:bg-[#D4A5A9] hover:text-[#4A3638] focus:bg-[#D4A5A9] focus:text-[#4A3638] focus:outline-none text-[#6B4B4E]",
                        isActive('/a-propos') && 'bg-[#D4A5A9] text-[#4A3638]'
                      )}
                    >
                      À propos
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/faqs"
                      className={cn(
                        "inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 transition-colors hover:bg-[#D4A5A9] hover:text-[#4A3638] focus:bg-[#D4A5A9] focus:text-[#4A3638] focus:outline-none text-[#6B4B4E]",
                        isActive('/faqs') && 'bg-[#D4A5A9] text-[#4A3638]'
                      )}
                    >
                      Questions fréquentes
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
            <Sheet>
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
              <SheetContent side="top" className="bg-[#E5B8BC] border-[#D4A5A9] p-0">
                <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#D4A5A9]">
                  <SheetTitle className="text-[#6B4B4E] tracking-wide uppercase text-left text-lg">
                    CHIRYO ENERGIE PSYCHO ENERGETICIENNE
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-2 px-6 pb-6">
                  <Link
                    to="/"
                    className="block rounded-md bg-white px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#F5E8E9] font-medium"
                  >
                    Accueil
                  </Link>

                  <div className="flex flex-col">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between rounded-md bg-[#F5E8E9] px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#D4A5A9] font-medium"
                    >
                      Services
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform",
                          mobileServicesOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {mobileServicesOpen && (
                      <div className="mt-2 flex flex-col gap-2 pl-4">
                        {services.map((service) => (
                          <Link
                            key={service.title}
                            to={service.href}
                            onClick={(e) => {
                              handleHashLink(e, service.href);
                              setMobileServicesOpen(false);
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
                    to="/a-propos"
                    className="block rounded-md bg-white px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#F5E8E9] font-medium"
                  >
                    À propos
                  </Link>

                  <Link
                    to="/faqs"
                    className="block rounded-md bg-white px-4 py-3 text-[#6B4B4E] transition-colors hover:bg-[#F5E8E9] font-medium"
                  >
                    Questions fréquentes
                  </Link>

                  <Link
                    to="/contact"
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
    </nav>
  );
}
