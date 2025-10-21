import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QuranPage from "./pages/QuranPage";
import { SurahReader } from "./components/quran/SurahReader";
import { SurahsList } from "./components/quran/SurahsList";
import JuzIndex from "./components/quran/JuzIndex";
import JuzReader from "./components/quran/JuzReader";
import PageReader from "./components/quran/PageReader";
import GoToPage from "./components/quran/GoToPage";
import GoToSurah from "./components/quran/GoToSurah";
import Bookmarks from "./components/quran/Bookmarks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quran" element={<QuranPage />} />
          <Route path="/quran/surahs" element={<SurahsList />} />
          <Route path="/quran/juz" element={<JuzIndex />} />
          <Route path="/quran/juz/:juzNumber" element={<JuzReader />} />
          <Route path="/quran/page" element={<GoToPage />} />
          <Route path="/quran/page/:pageNumber" element={<PageReader />} />
          <Route path="/quran/goto-surah" element={<GoToSurah />} />
          <Route path="/quran/bookmarks" element={<Bookmarks />} />
          <Route path="/quran/surah/:surahNumber" element={<SurahReader />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
