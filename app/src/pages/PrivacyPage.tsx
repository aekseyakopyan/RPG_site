import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react';

export function PrivacyPage() {
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
            <div className="w-20 h-20 bg-[#00d4aa] rounded-lg flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-[#1a1a2e]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#00d4aa] mb-4 font-['Press_Start_2P']">
              ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
            </h1>
            <p className="text-[#888]">Как я обрабатываю твои данные</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Intro */}
            <div className="bg-[#2a2a3e] rounded-lg p-6">
              <p className="text-[#c0c0c0] leading-relaxed">
                Я, Алексей, уважаю твою конфиденциальность. Эта политика объясняет, какие данные я собираю, 
                как их использую и как защищаю. Играй спокойно — твои данные в безопасности! 🛡️
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-[#ffd700]" />
                  <h2 className="text-xl font-bold text-[#fff]">Какие данные я собираю</h2>
                </div>
                <ul className="space-y-3 text-[#c0c0c0]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span><strong>Контактная информация:</strong> имя, email, телефон — когда ты заполняешь форму</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span><strong>Игровой прогресс:</strong> уровень, XP — хранится локально в твоём браузере</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span><strong>Аналитика:</strong> анонимные данные о посещениях страниц (через Google Analytics)</span>
                  </li>
                </ul>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-[#ffd700]" />
                  <h2 className="text-xl font-bold text-[#fff]">Как я использую данные</h2>
                </div>
                <ul className="space-y-3 text-[#c0c0c0]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span>Для связи с тобой по твоему запросу</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span>Для улучшения игрового опыта на сайте</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span>Для анализа эффективности сайта</span>
                  </li>
                </ul>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-[#ffd700]" />
                  <h2 className="text-xl font-bold text-[#fff]">Как я защищаю данные</h2>
                </div>
                <ul className="space-y-3 text-[#c0c0c0]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span>Использую HTTPS для шифрования передачи данных</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span>Не передаю данные третьим лицам без твоего согласия</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span>Храню данные только на защищённых серверах</span>
                  </li>
                </ul>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-[#ffd700]" />
                  <h2 className="text-xl font-bold text-[#fff]">Твои права</h2>
                </div>
                <p className="text-[#c0c0c0] mb-4">
                  Ты можешь в любой момент:
                </p>
                <ul className="space-y-3 text-[#c0c0c0]">
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span>Запросить удаление своих данных</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span>Узнать, какие данные я храню</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#ffd700]">•</span>
                    <span>Отозвать согласие на обработку данных</span>
                  </li>
                </ul>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#fff] mb-4">Cookies</h2>
                <p className="text-[#c0c0c0] leading-relaxed">
                  Сайт использует cookies для сохранения игрового прогресса (уровень, XP) и аналитики. 
                  Это безопасно и не содержит персональных данных. Ты можешь отключить cookies в настройках браузера, 
                  но тогда игровой прогресс не будет сохраняться.
                </p>
              </section>

              <section className="bg-[#2a2a3e] rounded-lg p-6">
                <h2 className="text-xl font-bold text-[#fff] mb-4">Контакты</h2>
                <p className="text-[#c0c0c0] leading-relaxed">
                  По всем вопросам о данных пиши мне в Telegram:{' '}
                  <a 
                    href="https://t.me/alexey_marketer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#ffd700] hover:underline"
                  >
                    @alexey_marketer
                  </a>
                </p>
              </section>
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
