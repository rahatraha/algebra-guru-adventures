
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';

import Index from './pages/Index';
import SubjectGrade from './pages/SubjectGrade';
import TopicDetails from './pages/TopicDetails';
import Achievements from './pages/Achievements';
import Calculator from './pages/Calculator';
import DailyChallenge from './pages/DailyChallenge';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:subject" element={<SubjectGrade />} />
          <Route path="/:subject/:grade/:topicId" element={<TopicDetails />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/daily-challenge" element={<DailyChallenge />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
