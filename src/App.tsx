import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import SeedMarketplace from "./pages/SeedMarketplace";
import PlantingAdvisor from "./pages/PlantingAdvisor";
import GrowthMonitoring from "./pages/GrowthMonitoring";
import DiseaseDetection from "./pages/DiseaseDetection";
import HarvestTiming from "./pages/HarvestTiming";
import DryingStorage from "./pages/DryingStorage";
import Marketplace from "./pages/Marketplace";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/seeds" element={<SeedMarketplace />} />
              <Route path="/planting" element={<PlantingAdvisor />} />
              <Route path="/growth" element={<GrowthMonitoring />} />
              <Route path="/disease" element={<DiseaseDetection />} />
              <Route path="/harvest" element={<HarvestTiming />} />
              <Route path="/storage" element={<DryingStorage />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
