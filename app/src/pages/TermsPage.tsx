import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { FileText, CheckCircle, AlertTriangle, MessageCircle } from 'lucide-react';

export function TermsPage() {
  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-[#ffd700] rounded-lg flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-[#1a1a2e]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#ffd700] mb-4 font-['Press_Start_2P']">
              ПРАВИЛА ИГРЫ
            </h1>
            <p className="text-[#888]">Условия использования сайта</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Intro */}
            <div className="bg-[#2a2a3e] rounded-lg p-6 border-l-4 border-[#ffd700]">
              <p className="text-[#c0c0c0] leading-relaxed">
                Добро пожаловать в мир performance-маркетинга! Используя этот сайт, ты соглашаешься с правилами игры. 
                Не волнуйся, здесь нет скрытых ловушек — только честные условия. 🎮
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-[#00d4aa]" />
                  <h2 className="text-xl font-bold text-[#fff]">1. Общие положения</h2>
                </div>
                <p className="text-[#c0c0c0] leading-relaxed">
                  Этот сайт — персональный сайт маркетолога Алексея. Все материалы, представленные здесь, 
                  являются интеллектуальной собственностью и защищены законом. Используй контент разумно 
                  и не забывай указывать источник при цитировании.
                </p>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-[#00d4aa]" />
                  <h2 className="text-xl font-bold text-[#fff]">2. Услуги</h2>
                </div>
                <div className="space-y-3 text-[#c0c0c0]">
                  <p>Я предоставляю следующие услуги:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Настройка и ведение рекламных кампаний</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Аудит существующих кампаний</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Консультации по performance-маркетингу</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Обучение и наставничество</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-[#00d4aa]" />
                  <h2 className="text-xl font-bold text-[#fff]">3. Гарантии</h2>
                </div>
                <div className="space-y-3 text-[#c0c0c0]">
                  <p>Я гарантирую:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Честный подход к каждому проекту</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Прозрачную отчётность по всем кампаниям</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Соблюдение сроков и договорённостей</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Конфиденциальность данных клиентов</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-[#ff6b6b]" />
                  <h2 className="text-xl font-bold text-[#fff]">4. Ограничение ответственности</h2>
                </div>
                <p className="text-[#c0c0c0] leading-relaxed">
                  Результаты рекламных кампаний зависят от множества факторов: ниши, конкуренции, 
                  качества продукта, сайта и других. Я не гарантирую конкретные цифры, 
                  но гарантирую профессиональный подход и максимум усилий для достижения лучших результатов.
                </p>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-[#00d4aa]" />
                  <h2 className="text-xl font-bold text-[#fff]">5. Оплата</h2>
                </div>
                <div className="space-y-3 text-[#c0c0c0]">
                  <p>Условия оплаты:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Предоплата 50% перед началом работы</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Оставшиеся 50% — по факту выполнения</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00d4aa]">•</span>
                      <span>Возможна оплата по договорённости для долгосрочных проектов</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-[#00d4aa]" />
                  <h2 className="text-xl font-bold text-[#fff]">6. Интеллектуальная собственность</h2>
                </div>
                <p className="text-[#c0c0c0] leading-relaxed">
                  Все материалы сайта (тексты, изображения, код, дизайн) являются интеллектуальной 
                  собственностью. Копирование без разрешения запрещено. Если хочешь использовать 
                  что-то — просто напиши мне, договоримся! 🤝
                </p>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-[#ffd700]" />
                  <h2 className="text-xl font-bold text-[#fff]">7. Связь</h2>
                </div>
                <p className="text-[#c0c0c0] leading-relaxed">
                  По всем вопросам пиши мне в Telegram:{' '}
                  <a 
                    href="https://t.me/alexey_marketer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#ffd700] hover:underline"
                  >
                    @alexey_marketer
                  </a>
                  . Отвечаю быстро и по делу!
                </p>
              </section>
            </div>

            {/* Agreement */}
            <div className="bg-gradient-to-r from-[#00d4aa]/20 to-[#00d4aa]/10 border-2 border-[#00d4aa] rounded-lg p-6 text-center">
              <p className="text-[#c0c0c0] mb-4">
                Используя этот сайт, ты подтверждаешь, что ознакомился с правилами и согласен с ними.
              </p>
              <p className="text-[#00d4aa] font-bold">
                Удачи в игре! 🎮
              </p>
            </div>

            {/* Footer */}
            <div className="text-center text-[#888] text-sm">
              <p>Последнее обновление: февраль 2026</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
