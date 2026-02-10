import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Layout } from '@/components/Layout';
import { User, MessageCircle, Building2, Wallet, MessageSquare, Loader2, ArrowLeft, X, Check } from 'lucide-react';
import { PixelIcon } from '@/components/PixelIcon';
import { getSettings } from '@/lib/sanity';
import { useSanityData } from '@/hooks/useSanityData';
import { useMemo } from 'react';
import type { SanitySettings } from '@/types/sanity';

const businessTypes = [
  'E-commerce',
  'B2B',
  'Стартап',
  'Инфобиз',
  'Другое',
];

const budgetRanges = [
  'До 50K₽/мес',
  '50–100K₽/мес',
  '100–300K₽/мес',
  '300K–1M₽/мес',
  'Более 1M₽/мес',
];

const dontWorkWith = [
  'Серые ниши, схемы, "кнопки бабло"',
  'Проекты без MVP и подтвержденного спроса',
  'Бюджет меньше 50 000₽/мес (не хватит на тесты)',
  'Заказчики, которым нужен "просто запуск" без аналитики',
];

const priorityClients = [
  'Стартапы после product-market fit',
  'E-commerce с оборотом 1M₽+/мес',
  'B2B с LTV от 50K₽',
  'Агентства (white label)',
];

export function ContactPage() {
  const { addXP, showXPPopup, setShowLevelUp } = useGame();
  const { data: settingsData } = useSanityData<SanitySettings>(getSettings);

  const contacts = useMemo(() => {
    return {
      telegram: settingsData?.telegram || 'alexey_marketer',
      email: settingsData?.contactEmail || 'hello@alexey-marketing.ru'
    };
  }, [settingsData]);

  const [formData, setFormData] = useState({
    name: '',
    telegram: '',
    businessType: '',
    budget: '',
    question: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!formData.telegram.trim()) newErrors.telegram = 'Введите Telegram';
    if (!formData.businessType) newErrors.businessType = 'Выберите тип бизнеса';
    if (!formData.budget) newErrors.budget = 'Выберите бюджет';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    addXP(10000);
    showXPPopup(10000, window.innerWidth / 2, window.innerHeight / 2);
    setShowLevelUp(true);

    setTimeout(() => {
      window.location.href = '/thank-you';
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-rpg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <a href="/#/" className="inline-flex items-center gap-2 text-gray-500 hover:text-rpg-gold mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              На главную
            </a>
            <div className="flex justify-center mb-4">
              <PixelIcon name="sword" size={48} />
            </div>
            <span className="text-rpg-gold font-bold text-sm uppercase tracking-wider mb-4 block">ФИНАЛЬНЫЙ БОСС</span>
            <h1 className="text-4xl md:text-6xl font-black text-rpg-dark mb-4">
              ОБСУДИМ ВАШ ПРОЕКТ?
            </h1>
            <div className="w-24 h-1 bg-rpg-gold mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Я не беру в работу все проекты подряд. Мне важно, чтобы мы сходились по ценностям и я действительно мог принести вам пользу. Начнем с короткого созвона.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form & Info */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-rpg-light rounded-2xl p-6 md:p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-rpg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                      <PixelIcon name="chest" size={48} />
                    </div>
                    <h3 className="text-2xl font-black text-rpg-dark mb-2">КВЕСТ НАЧАЛСЯ!</h3>
                    <p className="text-gray-600">Переходим на следующий уровень...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-rpg-dark mb-2">Как вас зовут?</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Иван"
                          className={`w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 transition-all ${errors.name ? 'border-red-400' : 'border-gray-200 focus:border-rpg-gold'}`}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Telegram */}
                    <div>
                      <label className="block text-sm font-semibold text-rpg-dark mb-2">Ваш Telegram</label>
                      <div className="relative">
                        <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="telegram"
                          value={formData.telegram}
                          onChange={handleChange}
                          placeholder="@username"
                          className={`w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 transition-all ${errors.telegram ? 'border-red-400' : 'border-gray-200 focus:border-rpg-gold'}`}
                        />
                      </div>
                      {errors.telegram && <p className="text-red-500 text-sm mt-1">{errors.telegram}</p>}
                    </div>

                    {/* Business Type */}
                    <div>
                      <label className="block text-sm font-semibold text-rpg-dark mb-2">Тип бизнеса</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 transition-all appearance-none ${errors.businessType ? 'border-red-400' : 'border-gray-200 focus:border-rpg-gold'}`}
                        >
                          <option value="">Выберите тип</option>
                          {businessTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-semibold text-rpg-dark mb-2">Текущий бюджет на маркетинг</label>
                      <div className="relative">
                        <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 transition-all appearance-none ${errors.budget ? 'border-red-400' : 'border-gray-200 focus:border-rpg-gold'}`}
                        >
                          <option value="">Выберите бюджет</option>
                          {budgetRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                      {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                    </div>

                    {/* Question */}
                    <div>
                      <label className="block text-sm font-semibold text-rpg-dark mb-2">Ваш главный вопрос</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                          name="question"
                          value={formData.question}
                          onChange={handleChange}
                          placeholder="Что вас беспокоит? Какая задача стоит?"
                          rows={4}
                          className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-rpg-gold transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={isSubmitting} className="w-full rpg-button disabled:opacity-50 disabled:cursor-not-allowed group">
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" />Отправка...</>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <PixelIcon name="sword" size={20} />
                          <span>Начать Битву (Отправить)</span>
                        </div>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
              {/* Direct Contacts */}
              <div className="bg-rpg-light rounded-2xl p-6">
                <h3 className="text-xl font-bold text-rpg-dark mb-4">Прямые контакты</h3>
                <div className="space-y-4">
                  <a href={`https://t.me/${contacts.telegram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-rpg-gold transition-colors group">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PixelIcon name="bubble" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">@{contacts.telegram}</p>
                      <p className="text-sm text-gray-500">Быстрая связь в Telegram</p>
                    </div>
                  </a>
                  <a href={`mailto:${contacts.email}`} className="flex items-center gap-3 text-gray-700 hover:text-rpg-gold transition-colors group">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PixelIcon name="scroll" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">{contacts.email}</p>
                      <p className="text-sm text-gray-500">Для предложений и ТЗ</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Don't Work With */}
              <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <h3 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
                  <X className="w-5 h-5" />
                  С кем я не работаю
                </h3>
                <ul className="space-y-2">
                  {dontWorkWith.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-red-600 text-sm">
                      <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Priority Clients */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  В приоритете
                </h3>
                <ul className="space-y-2">
                  {priorityClients.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-green-600 text-sm">
                      <span className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
