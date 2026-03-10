import { motion } from 'framer-motion';
import { PixelCard } from '@/components/PixelCard';
import { 
  Target, 
  TrendingUp, 
  Search, 
  MapPin, 
  Globe, 
  Megaphone 
} from 'lucide-react';

const services = [
  {
    icon: Target,
    title: 'Контекстная реклама',
    target: 'Для тех, кто хочет быстрых заявок',
    result: 'Настройка Яндекс Директ и Google Ads с фокусом на конверсию, а не клики',
    color: 'gold'
  },
  {
    icon: Megaphone,
    title: 'Таргетированная реклама',
    target: 'Для бизнеса с визуальным продуктом',
    result: 'VK, Telegram Ads, MyTarget — точное попадание в ЦА с минимальным CPL',
    color: 'cyan'
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    target: 'Для роста на всех этапах воронки',
    result: 'Комплексный подход: аналитика, тесты, оптимизация под ROI',
    color: 'gold'
  },
  {
    icon: Search,
    title: 'SEO и поисковый трафик',
    target: 'Для долгосрочного результата',
    result: 'Органический трафик, который не исчезает после отключения рекламы',
    color: 'cyan'
  },
  {
    icon: MapPin,
    title: 'Geo-реклама',
    target: 'Для локального бизнеса',
    result: 'Привлечение клиентов из конкретного района или города',
    color: 'gold'
  },
  {
    icon: Globe,
    title: 'Разработка сайтов',
    target: 'Для тех, кто начинает с нуля',
    result: 'Landing pages на Tilda, доработка существующих сайтов под конверсию',
    color: 'cyan'
  }
];

export function Services() {
  return (
    <section id="services" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-pixel-gold font-pixel text-sm mb-4 block">УСЛУГИ</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-4">
            Чем могу помочь
          </h2>
          <div className="w-24 h-1 bg-pixel-gold mx-auto mb-6" />
          <p className="text-pixel-muted max-w-2xl mx-auto">
            Полный спектр маркетинговых услуг — от настройки рекламы до комплексной стратегии роста
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PixelCard 
                glow={service.color as 'gold' | 'cyan'} 
                className="h-full group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 flex items-center justify-center border-2 ${
                    service.color === 'gold' 
                      ? 'border-pixel-gold bg-pixel-gold/10' 
                      : 'border-pixel-cyan bg-pixel-cyan/10'
                  }`}>
                    <service.icon className={`w-6 h-6 ${
                      service.color === 'gold' ? 'text-pixel-gold' : 'text-pixel-cyan'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-pixel text-sm text-white group-hover:text-pixel-gold transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-pixel-muted uppercase tracking-wider">Для кого</span>
                    <p className="text-sm text-pixel-text mt-1">{service.target}</p>
                  </div>
                  <div>
                    <span className="text-xs text-pixel-muted uppercase tracking-wider">Результат</span>
                    <p className="text-sm text-pixel-text mt-1">{service.result}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-pixel-muted/20">
                  <span className={`text-xs font-mono-pixel ${
                    service.color === 'gold' ? 'text-pixel-gold' : 'text-pixel-cyan'
                  }`}>
                    #{service.title.split(' ')[0].toLowerCase()}
                  </span>
                </div>
              </PixelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
