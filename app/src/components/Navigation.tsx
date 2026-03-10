import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wrench, Target, Swords } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { getSettings, getServices, urlFor } from '@/lib/sanity';
import { useSanityData } from '@/hooks/useSanityData';
import type { SanitySettings, SanityService } from '@/types/sanity';

interface NavLink {
  label: string;
  href: string;
  icon?: any;
  highlight?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'Услуги', href: '/#/services' },
  { label: 'Кейсы', href: '/#/cases' },
  { label: 'Battle', href: '/#/battle', icon: Swords, highlight: true },
  { label: 'Квиз', href: '/#/quest' },
  { label: 'Инструменты', href: '/#/tools', icon: Wrench },
  { label: 'Процесс', href: '/#/process' },
  { label: 'Контакты', href: '/#/contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { level } = useGame();
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const { data: settingsData } = useSanityData<SanitySettings>(getSettings);
  const { data: sanityServices } = useSanityData<SanityService[]>(getServices);

  const services = useMemo(() => {
    if (!sanityServices || sanityServices.length === 0) {
      return [
        { id: 'contextual', name: 'Контекстная реклама', anchor: 'contextual' },
        { id: 'targeted', name: 'Таргетированная реклама', anchor: 'targeted' },
        { id: 'seo', name: 'SEO-продвижение', anchor: 'seo' },
        { id: 'analytics', name: 'Аналитика и аудит', anchor: 'analytics' },
        { id: 'crm', name: 'Email/CRM-маркетинг', anchor: 'crm' },
        { id: 'complex', name: 'Комплексный маркетинг', anchor: 'complex' },
      ];
    }
    return sanityServices.map(s => ({
      id: s.slug?.current || s._id,
      name: s.name,
      anchor: s.slug?.current || s._id
    }));
  }, [sanityServices]);

  const settings = useMemo(() => {
    if (!settingsData) return {
      brandName: 'АЛЕКСЕЙ.M',
      logoUrl: '/logo.gif'
    };
    return {
      brandName: settingsData.siteName || 'АЛЕКСЕЙ.M',
      logoUrl: settingsData.logo ? urlFor(settingsData.logo).width(100).url() : '/logo.gif'
    };
  }, [settingsData]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsServicesHovered(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/Hide logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#1a1a2e]/95 backdrop-blur-md shadow-lg border-b-2 border-[#3a3a4e]'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="/#/"
              className="flex items-center gap-4 group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-110 shrink-0">
                <img
                  src={settings.logoUrl}
                  alt={`${settings.brandName} Logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className={`text-xl md:text-2xl font-black transition-colors ${isScrolled ? 'text-white' : 'text-rpg-dark'
                  } group-hover:text-rpg-gold`}>
                  {settings.brandName.split('.')[0]}
                </span>
                <span className="text-rpg-gold font-black text-xl md:text-2xl">{settings.brandName.split('.')[1] ? `.${settings.brandName.split('.')[1]}` : ''}</span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isServices = link.label === 'Услуги';
                return (
                  <div
                    key={link.label}
                    className="relative py-4"
                    onMouseEnter={() => isServices && setIsServicesHovered(true)}
                    onMouseLeave={() => isServices && setIsServicesHovered(false)}
                  >
                    <a
                      href={link.href}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all relative group flex items-center gap-2 ${link.highlight
                        ? 'bg-rpg-gold/10 text-rpg-gold hover:bg-rpg-gold/20'
                        : isScrolled
                          ? 'text-gray-300 hover:text-white hover:bg-white/10'
                          : 'text-rpg-dark/70 hover:text-rpg-dark hover:bg-rpg-light'
                        }`}
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.label}
                      {link.highlight && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </a>

                    <AnimatePresence>
                      {isServices && isServicesHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-2 p-4">
                            {services.map((service) => (
                              <button
                                key={service.id}
                                onClick={() => {
                                  const targetHash = `/services#${service.anchor}`;
                                  if (window.location.hash.includes('services')) {
                                    window.location.hash = targetHash;
                                    scrollToSection(service.anchor);
                                  } else {
                                    window.location.hash = targetHash;
                                    setIsServicesHovered(false);
                                  }
                                }}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-rpg-light transition-all group/item text-left w-full"
                              >
                                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-100 shadow-sm group-hover/item:border-rpg-gold transition-colors">
                                  <img
                                    src={`/assets/images/weapon-${service.id}.png`}
                                    alt={service.name}
                                    className="w-7 h-7 object-contain mix-blend-multiply group-hover/item:scale-110 transition-transform"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = '/assets/images/hero-marketer.png';
                                    }}
                                  />
                                </div>
                                <div>
                                  <p className="text-xs font-black text-rpg-dark group-hover/item:text-rpg-gold transition-colors">
                                    {service.name}
                                  </p>
                                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Гвардейское оружие</p>
                                </div>
                              </button>
                            ))}
                          </div>
                          <div className="bg-rpg-dark p-3 text-center">
                            <a
                              href="/#/services"
                              onClick={() => setIsServicesHovered(false)}
                              className="text-[10px] font-black text-white hover:text-rpg-gold transition-colors uppercase tracking-[0.2em]"
                            >
                              Смотреть весь арсенал →
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Level indicator */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-[#2a2a3e] px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border-2 border-rpg-gold">
                <span className="text-base sm:text-lg">🏆</span>
                <span className="text-xs sm:text-sm font-bold text-rpg-gold">
                  Lv.{level}
                </span>
              </div>

              {/* CTA Button */}
              <a
                href="/#/contact"
                className="hidden md:inline-flex items-center gap-2 bg-rpg-gold text-rpg-dark px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold hover:bg-white transition-colors"
              >
                <Target className="w-4 h-4" />
                <span className="hidden lg:inline">Начать квест</span>
                <span className="lg:hidden">Квест</span>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all ${isScrolled || isMobileMenuOpen ? 'text-white' : 'text-rpg-dark'
                  } hover:text-rpg-gold hover:bg-white/10 active:scale-95`}
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#1a1a2e] pt-20 lg:hidden border-b-4 border-[#ffd700]"
          >
            <nav className="flex flex-col p-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-bold py-4 border-b border-[#3a3a4e] flex items-center gap-3 ${link.highlight ? 'text-[#ffd700]' : 'text-[#c0c0c0]'
                    }`}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.label}
                  {link.highlight && (
                    <span className="px-2 py-0.5 bg-[#ffd700] text-[#1a1a2e] text-xs rounded">NEW</span>
                  )}
                </motion.a>
              ))}
              <motion.a
                href="/#/contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#ffd700] text-[#1a1a2e] font-bold py-4 px-6 rounded-lg text-center mt-6 flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" />
                Начать квест
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
