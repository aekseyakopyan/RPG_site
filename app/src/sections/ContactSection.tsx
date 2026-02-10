import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Send, User, Mail, MessageSquare, Check, Loader2 } from 'lucide-react';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addXP, showXPPopup, setShowLevelUp } = useGame();
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    task: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Введите контакт';
    } else if (!formData.contact.includes('@') && !formData.contact.startsWith('@') && !formData.contact.startsWith('+')) {
      newErrors.contact = 'Введите email или Telegram';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      // Shake animation for errors
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Level up to 99!
    addXP(10000);
    showXPPopup(10000, window.innerWidth / 2, window.innerHeight / 2);
    setShowLevelUp(true);

    // Redirect to thank you page after animation
    setTimeout(() => {
      window.location.href = '/thank-you';
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">
            ФИНАЛЬНЫЙ БОСС
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-rpg-dark mb-4">
            ГОТОВ НАЧАТЬ КВЕСТ?
          </h2>
          <div className="w-24 h-1 bg-rpg-gold mx-auto" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Заполни форму, и я помогу победить твои маркетинговые проблемы
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-rpg-light rounded-2xl p-6 md:p-10"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-rpg-dark mb-2">КВЕСТ НАЧАЛСЯ!</h3>
              <p className="text-gray-600">Переходим на следующий уровень...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-rpg-dark mb-2">
                  Как тебя зовут?
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иван"
                    className={`w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 transition-all ${
                      errors.name 
                        ? 'border-red-400 animate-shake' 
                        : 'border-gray-200 focus:border-rpg-gold'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-semibold text-rpg-dark mb-2">
                  Твой Telegram или Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="@username или email@example.com"
                    className={`w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 transition-all ${
                      errors.contact 
                        ? 'border-red-400 animate-shake' 
                        : 'border-gray-200 focus:border-rpg-gold'
                    }`}
                  />
                </div>
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                )}
              </div>

              {/* Task */}
              <div>
                <label className="block text-sm font-semibold text-rpg-dark mb-2">
                  Кратко опиши задачу
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                    placeholder="Нужно настроить рекламу для..."
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-2 border-gray-200 focus:border-rpg-gold transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rpg-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Отправить заявку
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Нажимая кнопку, ты соглашаешься на обработку персональных данных
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
