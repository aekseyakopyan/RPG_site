import { useMemo } from 'react';
import { Send, Mail, Phone, Clock, MessageSquare, Linkedin, Github, MessageCircle } from 'lucide-react';
import { getSettings } from '@/lib/sanity';
import { useSanityData } from '@/hooks/useSanityData';
import type { SanitySettings } from '@/types/sanity';

export function Footer() {
  const { data: sanitySettings } = useSanityData<SanitySettings[]>(getSettings);

  const settings = useMemo(() => {
    if (!sanitySettings || sanitySettings.length === 0) return {
      brandName: 'АЛЕКСЕЙ',
      tagline: 'Маркетолог-Герой',
      description: 'Performance-маркетинг без воды: конкретные цифры, прозрачная аналитика, быстрый запуск за 2 недели.',
      contacts: {
        telegram: '@alexey_marketer',
        email: 'hello@alexey-marketing.ru',
        phone: '+7 (XXX) XXX-XX-XX',
        workingHours: 'Пн-Пт 10:00-19:00 МСК'
      },
      socialLinks: [
        { platform: 'VK', url: 'https://vk.com/alexey_marketer', iconName: 'MessageSquare' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexey-marketer', iconName: 'Linkedin' },
        { platform: 'GitHub', url: 'https://github.com/alexey-marketer', iconName: 'Github' },
      ],
      legalInfo: 'ИП ИВАНОВ А.А., ИНН XXXXXXXXXXXX, ОГРНИП XXXXXXXXXXXXXXX'
    };

    const s = sanitySettings[0];
    return {
      brandName: s.siteName || 'АЛЕКСЕЙ',
      tagline: s.siteDescription || 'Маркетолог-Герой',
      description: 'Performance-маркетинг для тех, кто ценит результат и прозрачность.',
      contacts: {
        telegram: s.telegram || '@alexey_marketer',
        email: s.contactEmail || 'hello@alexey-marketing.ru',
        phone: s.contactPhone || '+7 (XXX) XXX-XX-XX',
        workingHours: 'Пн-Пт 10:00-19:00 МСК'
      },
      socialLinks: s.socialLinks || [],
      legalInfo: ''
    };
  }, [sanitySettings]);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'vk': return MessageSquare;
      case 'linkedin': return Linkedin;
      case 'github': return Github;
      case 'telegram': return MessageCircle;
      default: return MessageSquare;
    }
  };

  return (
    <footer className="bg-rpg-dark text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Колонка 1 — Брендовая */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-rpg-gold rounded-lg flex items-center justify-center text-rpg-dark font-black text-xl">
                {settings.brandName[0]}.
              </div>
              <h3 className="text-2xl font-black">
                {settings.brandName.toUpperCase()}
              </h3>
            </div>
            <p className="text-rpg-gold font-bold mb-3 uppercase tracking-wider text-sm">
              {settings.tagline}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {settings.description}
            </p>
          </div>

          {/* Колонка 2 — Навигационная */}
          <div className="md:pl-12">
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest pixel-text text-rpg-gold">НАВИГАЦИЯ</h4>
            <nav className="grid grid-cols-1 gap-3">
              {[
                { label: 'Услуги', href: '/#/services' },
                { label: 'Кейсы', href: '/#/cases' },
                { label: 'Квиз', href: '/#/quest' },
                { label: 'Инструменты', href: '/#/tools' },
                { label: 'Процесс', href: '/#/process' },
                { label: 'Контакты', href: '/#/contact' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-rpg-gold transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-gray-700 rounded-full group-hover:bg-rpg-gold transition-colors" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Колонка 3 — Контактная */}
          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-widest pixel-text text-rpg-gold">КОНТАКТЫ</h4>
            <div className="space-y-4">
              {settings.contacts.telegram && (
                <div className="flex items-start gap-3">
                  <Send className="w-5 h-5 text-rpg-gold shrink-0 mt-1" />
                  <div>
                    <a href={`https://t.me/${settings.contacts.telegram.replace('@', '')}`} className="text-gray-300 hover:text-white transition-colors block font-semibold">{settings.contacts.telegram}</a>
                    <span className="text-xs text-gray-500 italic block mt-0.5">(Ответ: 2 часа)</span>
                  </div>
                </div>
              )}
              {settings.contacts.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-rpg-gold shrink-0 mt-1" />
                  <div>
                    <a href={`mailto:${settings.contacts.email}`} className="text-gray-300 hover:text-white transition-colors block font-semibold">{settings.contacts.email}</a>
                  </div>
                </div>
              )}
              {settings.contacts.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-rpg-gold shrink-0" />
                  <span className="text-gray-300">{settings.contacts.phone}</span>
                </div>
              )}
              {settings.contacts.workingHours && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-rpg-gold shrink-0" />
                  <span className="text-gray-300 text-sm">{settings.contacts.workingHours}</span>
                </div>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              {settings.socialLinks.map((social: any) => {
                const SocialIcon = getSocialIcon(social.platform);
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-rpg-gold hover:text-rpg-dark transition-all duration-300 group"
                    aria-label={social.platform}
                  >
                    <SocialIcon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Юридический блок */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:row gap-6 mb-4">
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 uppercase tracking-widest">
              <span>© {new Date().getFullYear()} {settings.brandName} — Маркетолог-Герой</span>
              <span className="hidden sm:inline">|</span>
              <span>Все права защищены</span>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-gray-400">
              <a href="/#/privacy" className="hover:text-rpg-gold transition-colors">Политика конфиденциальности</a>
              <a href="/#/terms" className="hover:text-rpg-gold transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 font-mono mt-4">
            {settings.legalInfo}
          </p>
        </div>
      </div>
    </footer>
  );
}
