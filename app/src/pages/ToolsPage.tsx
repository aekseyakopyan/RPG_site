import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import {
  Calculator,
  ClipboardCheck,
  FileText,
  Bot,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const tools: Tool[] = [
  {
    id: 'roi',
    name: 'Калькулятор ROI',
    description: 'Рассчитай окупаемость рекламы за 30 секунд',
    icon: Calculator,
    color: '#ffd700',
  },
  {
    id: 'checklist',
    name: 'Чек-лист аудита',
    description: 'Проверь свои кампании по 25 пунктам',
    icon: ClipboardCheck,
    color: '#00d4aa',
  },
  {
    id: 'templates',
    name: 'Шаблоны UTM-меток',
    description: 'Готовые UTM для любых каналов',
    icon: FileText,
    color: '#ff6b6b',
  },
  {
    id: 'ai',
    name: 'AI-ассистент',
    description: 'Получи рекомендации по своей нише',
    icon: Bot,
    color: '#a855f7',
  },
];

// ROI Calculator Component
function ROICalculator() {
  const [budget, setBudget] = useState('');
  const [leads, setLeads] = useState('');
  const [conversion, setConversion] = useState('');
  const [dealValue, setDealValue] = useState('');
  const [result, setResult] = useState<null | { roi: number; cpl: number; revenue: number; profit: number }>(null);
  const { addXP } = useGame();

  const calculate = () => {
    const b = parseFloat(budget) || 0;
    const l = parseFloat(leads) || 0;
    const c = parseFloat(conversion) || 0;
    const v = parseFloat(dealValue) || 0;

    if (b > 0 && l > 0) {
      const cpl = b / l;
      const customers = Math.floor(l * (c / 100));
      const revenue = customers * v;
      const profit = revenue - b;
      const roi = b > 0 ? ((revenue - b) / b) * 100 : 0;

      setResult({ roi, cpl, revenue, profit });
      addXP(15);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#888] mb-2">Бюджет на рекламу (₽)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-[#1a1a2e] border-2 border-[#3a3a4e] rounded-lg px-4 py-3 text-[#fff] focus:border-[#ffd700] focus:outline-none"
            placeholder="100000"
          />
        </div>
        <div>
          <label className="block text-sm text-[#888] mb-2">Количество лидов</label>
          <input
            type="number"
            value={leads}
            onChange={(e) => setLeads(e.target.value)}
            className="w-full bg-[#1a1a2e] border-2 border-[#3a3a4e] rounded-lg px-4 py-3 text-[#fff] focus:border-[#ffd700] focus:outline-none"
            placeholder="50"
          />
        </div>
        <div>
          <label className="block text-sm text-[#888] mb-2">Конверсия в продажу (%)</label>
          <input
            type="number"
            value={conversion}
            onChange={(e) => setConversion(e.target.value)}
            className="w-full bg-[#1a1a2e] border-2 border-[#3a3a4e] rounded-lg px-4 py-3 text-[#fff] focus:border-[#ffd700] focus:outline-none"
            placeholder="10"
          />
        </div>
        <div>
          <label className="block text-sm text-[#888] mb-2">Средний чек (₽)</label>
          <input
            type="number"
            value={dealValue}
            onChange={(e) => setDealValue(e.target.value)}
            className="w-full bg-[#1a1a2e] border-2 border-[#3a3a4e] rounded-lg px-4 py-3 text-[#fff] focus:border-[#ffd700] focus:outline-none"
            placeholder="50000"
          />
        </div>
      </div>

      <Button
        onClick={calculate}
        className="w-full bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffec8b] py-4 font-bold"
      >
        <Calculator className="w-5 h-5 mr-2" />
        Рассчитать ROI
      </Button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a2e] rounded-lg p-6 border-2 border-[#ffd700]"
        >
          <h4 className="text-lg font-bold text-[#ffd700] mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Результаты расчёта
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2a2a3e] p-4 rounded-lg">
              <p className="text-sm text-[#888]">ROI</p>
              <p className={`text-2xl font-bold ${result.roi >= 0 ? 'text-[#00d4aa]' : 'text-[#ff6b6b]'}`}>
                {result.roi.toFixed(1)}%
              </p>
            </div>
            <div className="bg-[#2a2a3e] p-4 rounded-lg">
              <p className="text-sm text-[#888]">CPL (стоимость лида)</p>
              <p className="text-2xl font-bold text-[#fff]">{result.cpl.toFixed(0)} ₽</p>
            </div>
            <div className="bg-[#2a2a3e] p-4 rounded-lg">
              <p className="text-sm text-[#888]">Выручка</p>
              <p className="text-2xl font-bold text-[#00d4aa]">{result.revenue.toLocaleString()} ₽</p>
            </div>
            <div className="bg-[#2a2a3e] p-4 rounded-lg">
              <p className="text-sm text-[#888]">Прибыль</p>
              <p className={`text-2xl font-bold ${result.profit >= 0 ? 'text-[#00d4aa]' : 'text-[#ff6b6b]'}`}>
                {result.profit.toLocaleString()} ₽
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Checklist Component
function AuditChecklist() {
  const { addXP } = useGame();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const checklistItems = [
    { category: 'Настройка кампаний', items: [
      'Разделение по типам соответствия ключевых слов',
      'Настроены минус-слова на уровне кампании',
      'Настроены минус-слова на уровне групп',
      'Правильная структура аккаунта',
      'Географический таргетинг настроен корректно',
    ]},
    { category: 'Объявления', items: [
      'Используются все доступные расширения',
      'В объявлениях есть призыв к действию',
      'A/B тестирование объявлений активно',
      'Адаптивные объявления настроены',
      'В заголовках используются ключевые слова',
    ]},
    { category: 'Аналитика', items: [
      'Цели конверсии настроены корректно',
      'UTM-метки используются во всех ссылках',
      'Google Analytics связан с рекламным кабинетом',
      'Отслеживание звонков настроено',
      'Регулярный анализ поисковых запросов',
    ]},
    { category: 'Оптимизация', items: [
      'Автоматические правила настроены',
      'Ставки корректируются по времени суток',
      'Ставки корректируются по устройствам',
      'Аудитории используются для корректировок',
      'Ремаркетинг настроен',
    ]},
    { category: 'Бюджет и ставки', items: [
      'Стратегия назначения ставок оптимальна',
      'Бюджет распределён по приоритетам',
      'Достаточный бюджет для конкуренции',
      'Частота показов контролируется',
    ]},
  ];

  const toggleItem = (globalIndex: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(globalIndex)) {
      newChecked.delete(globalIndex);
    } else {
      newChecked.add(globalIndex);
      if (newChecked.size % 5 === 0) {
        addXP(5);
      }
    }
    setCheckedItems(newChecked);
  };

  const progress = Math.round((checkedItems.size / 25) * 100);

  return (
    <div className="space-y-4">
      <div className="bg-[#1a1a2e] rounded-lg p-4 flex items-center justify-between">
        <span className="text-[#c0c0c0]">Прогресс проверки</span>
        <span className="text-[#00d4aa] font-bold">{checkedItems.size}/25 ({progress}%)</span>
      </div>

      <div className="h-3 bg-[#1a1a2e] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00d4aa] to-[#00ff88]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
        {checklistItems.map((category, catIdx) => (
          <div key={catIdx}>
            <h4 className="text-[#ffd700] font-bold mb-3">{category.category}</h4>
            <div className="space-y-2">
              {category.items.map((item, itemIdx) => {
                const globalIndex = catIdx * 5 + itemIdx;
                const isChecked = checkedItems.has(globalIndex);
                return (
                  <motion.button
                    key={globalIndex}
                    onClick={() => toggleItem(globalIndex)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-3 rounded-lg border-2 text-left flex items-center gap-3 transition-all ${
                      isChecked
                        ? 'border-[#00d4aa] bg-[#00d4aa]/10'
                        : 'border-[#3a3a4e] bg-[#1a1a2e] hover:border-[#5a5a6e]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isChecked ? 'border-[#00d4aa] bg-[#00d4aa]' : 'border-[#5a5a6e]'
                    }`}>
                      {isChecked && <CheckCircle className="w-3 h-3 text-[#1a1a2e]" />}
                    </div>
                    <span className={isChecked ? 'text-[#00d4aa] line-through' : 'text-[#c0c0c0]'}>
                      {item}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#00d4aa]/20 border-2 border-[#00d4aa] rounded-lg p-4 text-center"
        >
          <Sparkles className="w-8 h-8 text-[#00d4aa] mx-auto mb-2" />
          <p className="text-[#00d4aa] font-bold">Отлично! Все пункты проверены +50 XP</p>
        </motion.div>
      )}
    </div>
  );
}

// UTM Templates Component
function UTMTemplates() {
  const { addXP } = useGame();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const templates = [
    { name: 'Google Ads - Поиск', template: 'utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}' },
    { name: 'Google Ads - КМС', template: 'utm_source=google&utm_medium=display&utm_campaign={campaignid}&utm_content={adgroupid}&utm_placement={placement}' },
    { name: 'Яндекс Директ - Поиск', template: 'utm_source=yandex&utm_medium=cpc&utm_campaign={campaign_id}&utm_content={ad_id}&utm_term={keyword}' },
    { name: 'Яндекс Директ - РСЯ', template: 'utm_source=yandex&utm_medium=display&utm_campaign={campaign_id}&utm_content={banner_id}&utm_term={source}' },
    { name: 'VK Реклама', template: 'utm_source=vk&utm_medium=social&utm_campaign={{campaign_id}}&utm_content={{ad_id}}' },
    { name: 'Telegram Ads', template: 'utm_source=telegram&utm_medium=social&utm_campaign=promote&utm_content={{ad_id}}' },
    { name: 'Email-рассылка', template: 'utm_source=email&utm_medium=email&utm_campaign=newsletter_{{date}}&utm_content={{subject}}' },
    { name: 'YouTube', template: 'utm_source=youtube&utm_medium=video&utm_campaign={{video_title}}&utm_content={{timestamp}}' },
  ];

  const copyToClipboard = (template: string, index: number) => {
    navigator.clipboard.writeText(template);
    setCopiedIndex(index);
    addXP(5);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-[#888] text-sm">
        Кликни на шаблон, чтобы скопировать. Используй динамические параметры для автоматической подстановки данных.
      </p>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {templates.map((tpl, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#1a1a2e] rounded-lg p-4 border-2 border-[#3a3a4e] hover:border-[#ff6b6b] transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#ff6b6b] font-semibold">{tpl.name}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(tpl.template, index)}
                className="text-[#888] hover:text-[#ff6b6b]"
              >
                {copiedIndex === index ? (
                  <><Check className="w-4 h-4 mr-1" /> Скопировано</>
                ) : (
                  <><Copy className="w-4 h-4 mr-1" /> Копировать</>
                )}
              </Button>
            </div>
            <code className="text-xs text-[#c0c0c0] bg-[#2a2a3e] px-2 py-1 rounded block overflow-x-auto">
              {tpl.template}
            </code>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#ff6b6b]/10 border-2 border-[#ff6b6b] rounded-lg p-4">
        <h4 className="text-[#ff6b6b] font-bold mb-2 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Параметры UTM
        </h4>
        <ul className="text-sm text-[#c0c0c0] space-y-1">
          <li><strong>utm_source</strong> — источник трафика (google, yandex, vk)</li>
          <li><strong>utm_medium</strong> — тип трафика (cpc, display, email)</li>
          <li><strong>utm_campaign</strong> — название кампании</li>
          <li><strong>utm_content</strong> — идентификатор объявления</li>
          <li><strong>utm_term</strong> — ключевое слово</li>
        </ul>
      </div>
    </div>
  );
}

// AI Assistant Component
function AIAssistant() {
  const [niche, setNiche] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const { addXP } = useGame();

  const niches = [
    'E-commerce',
    'SaaS / IT',
    'Услуги B2B',
    'EdTech / Курсы',
    'Недвижимость',
    'Медицина',
    'Финансы',
    'Другое',
  ];

  const budgets = [
    { label: 'До 100K ₽/мес', value: 'small' },
    { label: '100K-300K ₽/мес', value: 'medium' },
    { label: '300K-1M ₽/мес', value: 'large' },
    { label: '1M+ ₽/мес', value: 'enterprise' },
  ];

  const generateRecommendation = () => {
    setLoading(true);
    addXP(10);

    // Simulate AI response
    setTimeout(() => {
      const recommendations: Record<string, string> = {
        'E-commerce': 'Для e-commerce рекомендую фокус на Google Shopping и динамический ремаркетинг. Начните с аудита текущих кампаний и внедрения smart bidding. Ожидаемый результат: снижение CPA на 25-40% за 2 месяца.',
        'SaaS / IT': 'Для SaaS ключевые каналы — LinkedIn Ads и Google Search по high-intent запросам. Создайте контент-воронку с whitepaper и case studies. Фокус на demo-запросы, не на регистрации.',
        'Услуги B2B': 'B2B услугам отлично подходит контекстная реклама + LinkedIn. Создайте лид-магнит в виде чек-листа или калькулятора. Настройте сквозную аналитику до сделки.',
        'EdTech / Курсы': 'EdTech: YouTube pre-roll + VK Реклама. Создайте серию обучающих видео как лид-магнит. Используйте webinar-воронку для продаж premium-курсов.',
        'Недвижимость': 'Недвижимость: Яндекс Директ + Instagram/Facebook. Ключевой фокус — качество лидов, не количество. Настройте квалификацию через чат-бота перед передачей менеджеру.',
        'Медицина': 'Медицина: требует особого подхода к креативам из-за ограничений. Фокус на информационном контенте и SEO. Контекст — только на узкие, безопасные запросы.',
        'Финансы': 'Финансы: высокая конкуренция, нужен большой бюджет. Рекомендую начать с нишевых запросов и постепенно масштабироваться. Обязательна лицензия для рекламы.',
        'Другое': 'Для вашей ниши рекомендую комплексный аудит текущих каналов. Чаще всего быстрый рост даёт оптимизация существующих кампаний + добавление 1-2 новых каналов.',
      };

      setRecommendation(recommendations[niche] || recommendations['Другое']);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#888] mb-2">Выбери свою нишу</label>
          <div className="grid grid-cols-2 gap-2">
            {niches.map((n) => (
              <button
                key={n}
                onClick={() => setNiche(n)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  niche === n
                    ? 'border-[#a855f7] bg-[#a855f7]/20 text-[#a855f7]'
                    : 'border-[#3a3a4e] bg-[#1a1a2e] text-[#c0c0c0] hover:border-[#5a5a6e]'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#888] mb-2">Бюджет на рекламу</label>
          <div className="grid grid-cols-2 gap-2">
            {budgets.map((b) => (
              <button
                key={b.value}
                onClick={() => setBudget(b.value)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  budget === b.value
                    ? 'border-[#a855f7] bg-[#a855f7]/20 text-[#a855f7]'
                    : 'border-[#3a3a4e] bg-[#1a1a2e] text-[#c0c0c0] hover:border-[#5a5a6e]'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={generateRecommendation}
          disabled={!niche || !budget || loading}
          className="w-full bg-[#a855f7] text-white hover:bg-[#9333ea] py-4 font-bold disabled:opacity-50"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            />
          ) : (
            <Zap className="w-5 h-5 mr-2" />
          )}
          {loading ? 'Анализирую...' : 'Получить рекомендацию'}
        </Button>
      </div>

      {recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#a855f7]/10 border-2 border-[#a855f7] rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-6 h-6 text-[#a855f7]" />
            <span className="text-[#a855f7] font-bold">AI-рекомендация</span>
          </div>
          <p className="text-[#c0c0c0] leading-relaxed">{recommendation}</p>
          <div className="mt-4 pt-4 border-t border-[#a855f7]/30">
            <p className="text-sm text-[#888]">
              Хочешь детальную стратегию для своего бизнеса?{' '}
              <a href="/#/contact" className="text-[#a855f7] hover:underline">
                Запишись на консультацию
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const { addXP } = useGame();

  const handleToolClick = (toolId: string) => {
    setActiveTool(toolId);
    addXP(5);
  };

  const renderToolContent = () => {
    switch (activeTool) {
      case 'roi':
        return <ROICalculator />;
      case 'checklist':
        return <AuditChecklist />;
      case 'templates':
        return <UTMTemplates />;
      case 'ai':
        return <AIAssistant />;
      default:
        return null;
    }
  };

  const activeToolData = tools.find((t) => t.id === activeTool);

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-[#ffd700] mb-4 font-['Press_Start_2P']">
              🧰 ИНСТРУМЕНТЫ
            </h1>
            <p className="text-[#888] max-w-2xl mx-auto">
              Бесплатные инструменты для маркетологов. Используй их, чтобы улучшить свои кампании и получи XP за каждое действие!
            </p>
          </motion.div>

          {activeTool ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#2a2a3e] border-4 border-[#3a3a4e] rounded-lg overflow-hidden"
            >
              {/* Tool Header */}
              <div className="bg-[#1a1a2e] p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: activeToolData?.color }}
                  >
                    {activeToolData && <activeToolData.icon className="w-7 h-7 text-[#1a1a2e]" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#fff]">{activeToolData?.name}</h2>
                    <p className="text-[#888]">{activeToolData?.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setActiveTool(null)}
                  className="border-2 border-[#3a3a4e] text-[#c0c0c0] hover:bg-[#2a2a3e]"
                >
                  ← Назад к инструментам
                </Button>
              </div>

              {/* Tool Content */}
              <div className="p-6">
                {renderToolContent()}
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#2a2a3e] border-4 border-[#3a3a4e] rounded-lg p-6 cursor-pointer hover:border-[#ffd700] transition-colors group"
                  onClick={() => handleToolClick(tool.id)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: tool.color }}
                    >
                      <tool.icon className="w-8 h-8 text-[#1a1a2e]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#fff] mb-2 group-hover:text-[#ffd700] transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-[#888] mb-4">{tool.description}</p>
                      <div className="flex items-center text-[#ffd700] text-sm font-semibold">
                        Открыть инструмент
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          {!activeTool && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 bg-gradient-to-r from-[#ffd700]/20 to-[#ff6b35]/20 border-4 border-[#ffd700] rounded-lg p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-[#ffd700] mb-4">
                Нужен персональный аудит?
              </h2>
              <p className="text-[#c0c0c0] mb-6 max-w-xl mx-auto">
                Эти инструменты — только начало. Получи полный аудит своих рекламных кампаний с конкретными рекомендациями по росту.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#/quest"
                  className="inline-flex items-center justify-center bg-[#ffd700] text-[#1a1a2e] px-6 py-3 rounded-lg font-bold hover:bg-[#ffec8b] transition-colors"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Пройти квиз
                </a>
                <a
                  href="/#/contact"
                  className="inline-flex items-center justify-center border-2 border-[#ffd700] text-[#ffd700] px-6 py-3 rounded-lg font-bold hover:bg-[#ffd700]/10 transition-colors"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Заказать аудит
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
