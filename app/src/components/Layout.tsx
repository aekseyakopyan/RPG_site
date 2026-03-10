import { Navigation } from './Navigation';
import { HeroSprite } from './HeroSprite';
import { LevelUpOverlay } from './LevelUpOverlay';
import { Footer } from '@/sections/Footer';
import { Helmet } from 'react-helmet-async';
import { useSanityData } from '@/hooks/useSanityData';
import { getSettings, urlFor } from '@/lib/sanity';
import type { SanitySettings } from '@/types/sanity';
import { ParticleBackground } from './ParticleBackground';

interface LayoutProps {
  children: React.ReactNode;
  showHero?: boolean;
}

export function Layout({ children, showHero = true }: LayoutProps) {
  const { data: settings } = useSanityData<SanitySettings>(getSettings);

  const seo = {
    title: settings?.seo?.title || settings?.siteName || 'Алексей — Маркетолог-Герой | ROI Master',
    description: settings?.seo?.description || settings?.siteDescription || 'Превращаю хаос маркетинга в понятную систему. Performance, аналитика и рост прибыли с оплатой за результат.',
    keywords: settings?.seo?.keywords?.join(', ') || 'маркетолог, performance marketing, growth hacking, ROI, контекстная реклама, таргетинг, аналитика',
    image: settings?.seo?.ogImage ? urlFor(settings.seo.ogImage).url() : '/og-image.jpg'
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-x-hidden">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:locale" content="ru_RU" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.image} />
      </Helmet>

      <ParticleBackground />

      <Navigation />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />

      {/* Fixed Hero Sprite */}
      {showHero && (
        <div className="fixed bottom-6 right-6 z-30 hidden md:block">
          <HeroSprite animation="idle" size="md" />
        </div>
      )}

      {/* Level Up Overlay */}
      <LevelUpOverlay />
    </div>
  );
}
