import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Stats {
  STR: number;
  DEX: number;
  INT: number;
  LUCK: number;
}

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory' | 'tool';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stats: Partial<Stats>;
  icon: string;
  description: string;
}

export interface DerivedStats {
  criticalChance: number;
  manaRegen: number;
  armor: number;
  speed: number;
  wisdom: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  xpReward: number;
}

export interface Quest {
  id: string;
  title: string;
  type: 'daily' | 'weekly';
  description: string;
  img?: string; // Icon/Image for the quest
  progress: number;
  maxProgress: number;
  xpReward: number;
  completed: boolean;
  expiresAt: number; // Timestamp
}

const INITIAL_QUESTS: Quest[] = [
  {
    id: 'daily_researcher',
    title: 'Ежедневный ритуал',
    type: 'daily',
    description: 'Изучи 3 разных раздела сайта',
    progress: 0,
    maxProgress: 3,
    xpReward: 150,
    completed: false,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  },
  {
    id: 'weekly_arsenal',
    title: 'Сбор арсенала',
    type: 'weekly',
    description: 'Собери 3 инструмента в инвентарь',
    progress: 0,
    maxProgress: 3,
    xpReward: 500,
    completed: false,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  }
];

interface GameContextType {
  level: number;
  xp: number;
  addXP: (amount: number) => void;
  showLevelUp: boolean;
  setShowLevelUp: (show: boolean) => void;
  xpPopup: { show: boolean; amount: number; x: number; y: number };
  showXPPopup: (amount: number, x: number, y: number) => void;
  hideXPPopup: () => void;
  stats: Stats;
  derivedStats: DerivedStats;
  inventory: Item[];
  charClass: string;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  updateStats: (newStats: Partial<Stats>) => void;
  addItem: (item: Item) => void;
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  visitSection: (sectionId: string) => void;
  quests: Quest[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const BASE_STATS: Stats = {
  STR: 85,
  DEX: 90,
  INT: 92,
  LUCK: 80,
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_steps', name: 'Первые шаги', description: 'Посетил сайт', icon: '🦶', unlocked: true, progress: 1, maxProgress: 1, xpReward: 50 },
  { id: 'curious', name: 'Любознательный', description: 'Изучил 3 раздела', icon: '👀', unlocked: false, progress: 0, maxProgress: 3, xpReward: 150 },
  { id: 'collector', name: 'Оружейник', description: 'Собрал 2 услуги в инвентарь', icon: '⚔️', unlocked: false, progress: 0, maxProgress: 2, xpReward: 200 },
  { id: 'scholar', name: 'Знаток', description: 'Изучил все разделы', icon: '🎓', unlocked: false, progress: 0, maxProgress: 5, xpReward: 500 },
];

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState(42);
  const [xp, setXp] = useState(4250);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [xpPopup, setXpPopup] = useState({ show: false, amount: 0, x: 0, y: 0 });
  const [stats, setStats] = useState<Stats>(BASE_STATS);
  const [derivedStats, setDerivedStats] = useState<DerivedStats>({
    criticalChance: 0,
    manaRegen: 0,
    armor: 0,
    speed: 0,
    wisdom: 0
  });
  const [inventory, setInventory] = useState<Item[]>([]);
  const [charClass] = useState('Performance Master');
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);

  // HUD Stats
  const [hp] = useState(100);
  const [maxHp] = useState(100);
  const [mp] = useState(85);
  const [maxMp] = useState(100);

  // Recalculate derived stats whenever base stats change
  React.useEffect(() => {
    setDerivedStats({
      criticalChance: Number(((stats.LUCK * 0.3) + (stats.DEX * 0.2)).toFixed(1)),
      manaRegen: Number(((stats.INT * 0.4) + (stats.STR * 0.1)).toFixed(1)),
      armor: Number(((stats.STR * 0.3) + (stats.INT * 0.2)).toFixed(1)),
      speed: Number(((stats.DEX * 0.5) + (stats.LUCK * 0.1)).toFixed(1)),
      wisdom: Number(((stats.INT * 0.4) + (stats.STR * 0.2)).toFixed(1)),
    });
  }, [stats]);

  const addXP = useCallback((amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      const newLevel = Math.min(99, Math.floor(newXp / 100) + 1);
      if (newLevel > level) {
        setLevel(newLevel);
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }
      return newXp;
    });
  }, [level]);

  const showXPPopup = useCallback((amount: number, x: number, y: number) => {
    setXpPopup({ show: true, amount, x, y });
    setTimeout(() => hideXPPopup(), 1500);
  }, []);

  const hideXPPopup = useCallback(() => {
    setXpPopup(prev => ({ ...prev, show: false }));
  }, []);

  // Helper to update quest progress (Moved after addXP and showXPPopup)
  const updateQuestProgress = useCallback((questId: string, amount: number = 1) => {
    setQuests(prev => prev.map(q => {
      if (q.id === questId && !q.completed) {
        const newProgress = Math.min(q.maxProgress, q.progress + amount);
        if (newProgress >= q.maxProgress && !q.completed) {
          // Quest Completed!
          addXP(q.xpReward);
          showXPPopup(q.xpReward, window.innerWidth / 2, window.innerHeight / 2);
          return { ...q, progress: newProgress, completed: true };
        }
        return { ...q, progress: newProgress };
      }
      return q;
    }));
  }, [addXP, showXPPopup]);

  const updateStats = useCallback((newStats: Partial<Stats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  }, []);

  const addItem = useCallback((item: Item) => {
    setInventory(prev => {
      const newInv = [...prev, item];
      // Update Weekly Quest: Arsenal
      if (newInv.length <= 3) {
        updateQuestProgress('weekly_arsenal', 1);
      }
      return newInv;
    });
    if (item.stats) {
      updateStats(item.stats);
    }
  }, [updateStats, updateQuestProgress]);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => prev.map(ach => {
      if (ach.id === id && !ach.unlocked) {
        addXP(ach.xpReward);
        showXPPopup(ach.xpReward, window.innerWidth / 2, window.innerHeight / 2);
        return { ...ach, unlocked: true, progress: ach.maxProgress };
      }
      return ach;
    }));
  }, [addXP, showXPPopup]);

  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  // ... existing stats logic ...

  const visitSection = useCallback((sectionId: string) => {
    setVisitedSections(prev => {
      if (!prev.has(sectionId)) {
        const newSet = new Set(prev);
        newSet.add(sectionId);

        // Update Daily Quest: Researcher
        updateQuestProgress('daily_researcher', 1);

        return newSet;
      }
      return prev;
    });
  }, [updateQuestProgress]);

  // Achievement Checks: Sections
  React.useEffect(() => {
    const sectionsCount = visitedSections.size;

    // Curious: 3 sections
    if (sectionsCount >= 3) {
      unlockAchievement('curious');
    }

    // Scholar: 5 sections (assuming 5 main sections)
    if (sectionsCount >= 5) {
      unlockAchievement('scholar');
    }
  }, [visitedSections, unlockAchievement]);

  // Achievement Checks: Inventory
  React.useEffect(() => {
    // Collector: 2 items
    if (inventory.length >= 2) {
      unlockAchievement('collector');
    }
  }, [inventory, unlockAchievement]);

  return (
    <GameContext.Provider value={{
      level,
      xp,
      addXP,
      showLevelUp,
      setShowLevelUp,
      xpPopup,
      showXPPopup,
      hideXPPopup,
      stats,
      derivedStats,
      inventory,
      charClass,
      hp,
      maxHp,
      mp,
      maxMp,
      updateStats,
      addItem,
      achievements,
      unlockAchievement,
      visitSection,
      quests
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
