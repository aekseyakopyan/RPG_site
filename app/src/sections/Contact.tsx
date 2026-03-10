import { motion } from 'framer-motion';
import { Send, Mail, ExternalLink } from 'lucide-react';

const contacts = [
  {
    icon: Send,
    label: 'Telegram',
    value: '@alexey_marketer',
    href: 'https://t.me/alexey_marketer',
    color: 'gold'
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'alexey@marketing.ru',
    href: 'mailto:alexey@marketing.ru',
    color: 'cyan'
  }
];

const socials = [
  { name: 'VK', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'YouTube', href: '#' }
];

export function Contact() {
  return (
    <footer id="contact" className="relative py-16 md:py-24 bg-pixel-dark border-t border-pixel-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-pixel text-xl text-white mb-4">
              Алексей <span className="text-pixel-gold">Маркетолог</span>
            </h3>
            <p className="text-pixel-muted text-sm leading-relaxed mb-6">
              Независимый маркетолог, который работает руками и говорит правду. 
              Помогаю бизнесу зарабатывать на рекламе.
            </p>
            <div className="flex items-center gap-2">
              <img 
                src="/cat-mascot.png" 
                alt="Cat" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-xs text-pixel-muted">С любовью к пикселям</span>
            </div>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-pixel text-sm text-white mb-6">КОНТАКТЫ</h4>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className={`w-10 h-10 flex items-center justify-center border-2 transition-colors ${
                    contact.color === 'gold' 
                      ? 'border-pixel-gold bg-pixel-gold/10 group-hover:bg-pixel-gold/20' 
                      : 'border-pixel-cyan bg-pixel-cyan/10 group-hover:bg-pixel-cyan/20'
                  }`}>
                    <contact.icon className={`w-5 h-5 ${
                      contact.color === 'gold' ? 'text-pixel-gold' : 'text-pixel-cyan'
                    }`} />
                  </div>
                  <div>
                    <span className="text-xs text-pixel-muted block">{contact.label}</span>
                    <span className="text-white group-hover:text-pixel-gold transition-colors flex items-center gap-1">
                      {contact.value}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-pixel text-sm text-white mb-6">НАВИГАЦИЯ</h4>
            <nav className="space-y-2">
              {[
                { label: 'Обо мне', href: '#about' },
                { label: 'Услуги', href: '#services' },
                { label: 'Кейсы', href: '#cases' },
                { label: 'Блог', href: '#blog' },
                { label: 'FAQ', href: '#faq' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-pixel-muted hover:text-pixel-gold transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-pixel-muted/20">
              <span className="text-xs text-pixel-muted block mb-2">Соцсети:</span>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-sm text-pixel-muted hover:text-pixel-cyan transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-pixel-muted/20 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-pixel-muted">
            © 2026 Алексей Маркетолог. Все права защищены.
          </p>
          <p className="text-xs text-pixel-muted">
            Сделано с <span className="text-pixel-red">♥</span> и пикселями
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
