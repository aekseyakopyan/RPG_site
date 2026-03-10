import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from '@/context/GameContext';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { CasesPage } from '@/pages/CasesPage';
import { CaseDetailPage } from '@/pages/CaseDetailPage';
import { ProcessPage } from '@/pages/ProcessPage';
import { ReviewsPage } from '@/pages/ReviewsPage';
import { ContactPage } from '@/pages/ContactPage';
import { ThankYouPage } from '@/pages/ThankYouPage';
import { QuestPage } from '@/pages/QuestPage';
import { BattleTestPage } from '@/pages/BattleTestPage';
import { ServiceDetailPage } from '@/pages/ServiceDetailPage';
import { ToolsPage } from '@/pages/ToolsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ErrorPage } from '@/pages/ErrorPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { LoadingScreen } from '@/components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('alexey_site_visited');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('alexey_site_visited', 'true');
    setIsLoading(false);
  };

  return (
    <GameProvider>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <Router>
        <Routes>
          {/* Main Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/:slug" element={<CaseDetailPage />} />
          <Route path="/battle" element={<BattleTestPage />} />
          <Route path="/quest" element={<QuestPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Utility Pages */}
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Error Pages */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
