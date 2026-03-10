import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Gamepad2, Home, Search, ArrowLeft } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { useEffect } from 'react';

export function NotFoundPage() {
  const { addXP } = useGame();

  useEffect(() => {
    // Easter egg XP for finding the 404 page
    addXP(5);
  }, [addXP]);

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Pixel Art Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Ghost character */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-8xl mb-4"
            >
              👻
            </motion.div>
            
            {/* Question marks */}
            <motion.div
              animate={{ 
                opacity: [0, 1, 0],
                y: [-10, -30, -50]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
              className="absolute -top-4 -right-8 text-4xl"
            >
              ❓
            </motion.div>
            <motion.div
              animate={{ 
                opacity: [0, 1, 0],
                y: [-10, -30, -50]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 1
              }}
              className="absolute -top-8 left-0 text-3xl"
            >
              ❔
            </motion.div>
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-[#ff6b6b] mb-4 font-['Press_Start_2P']">
            404
          </h1>
          <div className="bg-[#2a2a3e] border-4 border-[#ff6b6b] rounded-lg p-6 mb-8 inline-block">
            <p className="text-xl md:text-2xl text-[#c0c0c0] mb-2">
              ⚠️ БОСС НЕ НАЙДЕН
            </p>
            <p className="text-[#888]">
              Эта страница исчезла в подземелье...
            </p>
          </div>
        </motion.div>

        {/* Game Over Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-[#888] max-w-md mx-auto">
            Похоже, ты забрёл в неизведанные земли. 
            Но не переживай — даже в этом есть плюс: ты получил +5 XP за находчивость! 🎮
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/">
              <Button className="bg-[#ffd700] text-[#1a1a2e] hover:bg-[#ffec8b] px-6 py-6 text-lg font-bold">
                <Home className="w-5 h-5 mr-2" />
                На главную
              </Button>
            </Link>
            <Link to="/quest">
              <Button variant="outline" className="border-2 border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700]/10 px-6 py-6 text-lg">
                <Gamepad2 className="w-5 h-5 mr-2" />
                Пройти квиз
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              to="/services"
              className="text-[#888] hover:text-[#ffd700] flex items-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Услуги
            </Link>
            <Link
              to="/cases"
              className="text-[#888] hover:text-[#ffd700] flex items-center transition-colors"
            >
              <Search className="w-4 h-4 mr-1" />
              Кейсы
            </Link>
            <Link
              to="/tools"
              className="text-[#888] hover:text-[#ffd700] flex items-center transition-colors"
            >
              <Gamepad2 className="w-4 h-4 mr-1" />
              Инструменты
            </Link>
          </div>
        </motion.div>

        {/* Pixel Art Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center gap-2"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.3, 1, 0.3],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-4 h-4 bg-[#3a3a4e] rounded-sm"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
