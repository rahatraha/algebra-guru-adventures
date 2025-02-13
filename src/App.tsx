
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DailyChallenge from "./pages/DailyChallenge";
import SubjectGrade from "./pages/SubjectGrade";
import TopicDetails from "./pages/TopicDetails";
import Calculator from "./pages/Calculator";
import Achievements from "./pages/Achievements";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/daily-challenge" element={<DailyChallenge />} />
          <Route path="/:subject" element={<SubjectGrade />} />
          <Route path="/:subject/:grade/:topicId" element={<TopicDetails />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/forum" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
