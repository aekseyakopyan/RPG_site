import { motion } from 'framer-motion';
import { PixelButton } from '@/components/PixelButton';
import { Phone, Mail, MessageCircle, Check } from 'lucide-react';
import { useState } from 'react';

const contactMethods = [
  { id: 'telegram', label: 'Telegram', icon: MessageCircle },
  { id: 'phone', label: 'Телефон', icon: Phone },
  { id: 'email', label: 'Email', icon: Mail }
];

const steps = [
  'Созвонимся, обсудим задачу',
  'Я сделаю быстрый аудит',
  'Предложу гипотезы и план',
  'Начнем работать'
];

export function CTA() {
  const [selectedMethod, setSelectedMethod] = useState('telegram');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    task: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here would be actual form submission
  };

  return (
    <section id="cta" className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-pixel-gold font-pixel text-sm mb-4 block">ДАВАЙТЕ РАБОТАТЬ</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-6">
              Готов обсудить<br />
              <span className="text-pixel-gold">ваш проект</span>
            </h2>
            
            <p className="text-pixel-text text-lg mb-8">
              Без обещаний золотых гор. Только честная оценка, реалистичные сроки 
              и работа на результат.
            </p>

            <div className="space-y-4 mb-8">
              <h3 className="font-pixel text-sm text-pixel-muted mb-4">Что будет после заявки:</h3>
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-pixel-gold/20 border border-pixel-gold flex items-center justify-center">
                    <Check className="w-4 h-4 text-pixel-gold" />
                  </div>
                  <span className="text-pixel-text">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-pixel-card border-2 border-pixel-gold/50 p-6 md:p-8 relative">
              {/* Pixel corners */}
              <span className="absolute -top-1 -left-1 w-3 h-3 bg-pixel-gold" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-pixel-gold" />
              <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-pixel-gold" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-pixel-gold" />

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-pixel-success/20 border-2 border-pixel-success flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-pixel-success" />
                  </div>
                  <h3 className="font-pixel text-lg text-white mb-2">Заявка отправлена!</h3>
                  <p className="text-pixel-muted">Свяжусь с вами в течение дня</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact method selector */}
                  <div>
                    <label className="text-xs text-pixel-muted uppercase tracking-wider mb-3 block">
                      Способ связи
                    </label>
                    <div className="flex gap-2">
                      {contactMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSelectedMethod(method.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 border-2 transition-all ${
                            selectedMethod === method.id
                              ? 'border-pixel-gold bg-pixel-gold/20 text-pixel-gold'
                              : 'border-pixel-muted/30 text-pixel-muted hover:border-pixel-muted'
                          }`}
                        >
                          <method.icon className="w-4 h-4" />
                          <span className="text-sm hidden sm:inline">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="text-xs text-pixel-muted uppercase tracking-wider mb-2 block">
                      Как к вам обращаться
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-pixel-dark border-2 border-pixel-muted/30 px-4 py-3 text-white placeholder:text-pixel-muted/50 focus:border-pixel-gold focus:outline-none transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="text-xs text-pixel-muted uppercase tracking-wider mb-2 block">
                      {selectedMethod === 'telegram' && 'Telegram (@username или телефон)'}
                      {selectedMethod === 'phone' && 'Телефон'}
                      {selectedMethod === 'email' && 'Email'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full bg-pixel-dark border-2 border-pixel-muted/30 px-4 py-3 text-white placeholder:text-pixel-muted/50 focus:border-pixel-gold focus:outline-none transition-colors"
                      placeholder={
                        selectedMethod === 'telegram' ? '@username' :
                        selectedMethod === 'phone' ? '+7 (999) 999-99-99' :
                        'email@example.com'
                      }
                    />
                  </div>

                  {/* Task */}
                  <div>
                    <label className="text-xs text-pixel-muted uppercase tracking-wider mb-2 block">
                      Кратко о задаче
                    </label>
                    <textarea
                      rows={3}
                      value={formData.task}
                      onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                      className="w-full bg-pixel-dark border-2 border-pixel-muted/30 px-4 py-3 text-white placeholder:text-pixel-muted/50 focus:border-pixel-gold focus:outline-none transition-colors resize-none"
                      placeholder="Что нужно сделать?"
                    />
                  </div>

                  <PixelButton type="submit" className="w-full">
                    Отправить заявку
                  </PixelButton>

                  <p className="text-xs text-pixel-muted text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
