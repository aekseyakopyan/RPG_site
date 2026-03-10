import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home, Bug, MessageCircle } from 'lucide-react';

export function ErrorPage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Glitch Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 relative"
        >
          <motion.div
            animate={{ 
              x: [-2, 2, -2, 0],
              opacity: [1, 0.8, 1, 1]
            }}
            transition={{ 
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="text-8xl mb-4"
          >
            💥
          </motion.div>
          
          {/* Glitch effect lines */}
          <motion.div
            animate={{ 
              opacity: [0, 1, 0],
              x: [-50, 50]
            }}
            transition={{ 
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-[#ff6b6b]"
          />
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-[#ff6b6b] mb-4 font-['Press_Start_2P']">
            500
          </h1>
          <div className="bg-[#2a2a3e] border-4 border-[#ff6b6b] rounded-lg p-6 mb-8 inline-block">
            <p className="text-xl md:text-2xl text-[#c0c0c0] mb-2">
              🔥 КРИТИЧЕСКАЯ ОШИБКА
            </p>
            <p className="text-[#888]">
              Сервер взорвался от перегрузки...
            </p>
          </div>
        </motion.div>

        {/* Error Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-[#888] max-w-md mx-auto">
            Что-то пошло не так на сервере. Наши гномы-программисты уже бегут чинить проблему!
          </p>

          <div className="bg-[#1a1a2e] border-2 border-[#3a3a4e] rounded-lg p-4 mb-6 inline-block text-left">
            <p className="text-sm text-[#888] font-mono">
              <span className="text-[#ff6b6b]">Error:</span> Internal Server Error<br/>
              <span className="text-[#ffd700]">Status:</span> 500<br/>
              <span className="text-[#00d4aa]">Action:</span> Try again later
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleReload}
              className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffec8b] px-6 py-6 text-lg font-bold"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Перезагрузить
            </Button>
            <Link to="/">
              <Button variant="outline" className="border-2 border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700]/10 px-6 py-6 text-lg">
                <Home className="w-5 h-5 mr-2" />
                На главную
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="https://t.me/alexey_marketer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#00d4aa] flex items-center transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Написать в Telegram
            </a>
            <button
              onClick={() => alert('Отправлено разработчику!')}
              className="text-[#888] hover:text-[#ff6b6b] flex items-center transition-colors"
            >
              <Bug className="w-4 h-4 mr-1" />
              Сообщить об ошибке
            </button>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <p className="text-[#888] text-sm mb-4">Гномы чинят сервер...</p>
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scaleY: [1, 1.5, 1],
                  backgroundColor: ['#3a3a4e', '#ffd700', '#3a3a4e']
                }}
                transition={{ 
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
                className="w-3 h-8 bg-[#3a3a4e] rounded-sm"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
