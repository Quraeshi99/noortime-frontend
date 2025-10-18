import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSurahWithTranslations, SurahWithTranslation } from '@/services/quranApi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookmarkPlus,
  Volume2,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AYAHS_PER_PAGE = 5;

export const SurahReader = () => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const navigate = useNavigate();
  const [surahData, setSurahData] = useState<SurahWithTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUrdu, setShowUrdu] = useState(true);
  const [showEnglish, setShowEnglish] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const loadSurah = async () => {
      if (!surahNumber) return;
      
      setLoading(true);
      try {
        const data = await fetchSurahWithTranslations(parseInt(surahNumber));
        setSurahData(data);
      } catch (error) {
        console.error('Error loading surah:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSurah();
  }, [surahNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-islamic-gold/5 to-islamic-crescent/5 p-6">
        <div className="container mx-auto max-w-4xl space-y-6">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!surahData) return null;

  const totalAyahs = surahData.arabic.ayahs?.length || 0;
  const totalPages = Math.ceil(totalAyahs / AYAHS_PER_PAGE);

  const getCurrentPageAyahs = () => {
    const startIdx = currentPage * AYAHS_PER_PAGE;
    const endIdx = Math.min(startIdx + AYAHS_PER_PAGE, totalAyahs);
    return surahData.arabic.ayahs?.slice(startIdx, endIdx) || [];
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-islamic-gold/5 to-islamic-crescent/5">
      <div className="container mx-auto p-4 max-w-3xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/quran')}
            className="gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <BookmarkPlus className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Translation Controls */}
        <Card className="mb-4 p-3 bg-islamic-gold/5 border-islamic-gold/20">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Switch
                id="urdu"
                checked={showUrdu}
                onCheckedChange={setShowUrdu}
              />
              <Label htmlFor="urdu" className="cursor-pointer">
                اردو ترجمہ
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="english"
                checked={showEnglish}
                onCheckedChange={setShowEnglish}
              />
              <Label htmlFor="english" className="cursor-pointer">
                English
              </Label>
            </div>
          </div>
        </Card>

        {/* Book Page Container */}
        <div className="relative perspective-[2000px]">
          <div 
            className={`
              transition-all duration-500 ease-in-out transform-style-3d
              ${isFlipping && flipDirection === 'next' ? 'animate-page-flip-next' : ''}
              ${isFlipping && flipDirection === 'prev' ? 'animate-page-flip-prev' : ''}
            `}
          >
            {/* Book Page with Traditional Quran Design */}
            <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-2xl border-8 border-double border-islamic-gold/40 p-8 min-h-[700px]">
              
              {/* Decorative Top Border */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-islamic-gold/20 to-transparent rounded-t-lg border-b-2 border-islamic-gold/30"></div>
              
              {/* Corner Decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-islamic-gold/60 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-islamic-gold/60 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-islamic-gold/60 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-islamic-gold/60 rounded-br-lg"></div>

              <div className="relative z-10 mt-8">
                {/* Surah Header - Decorative */}
                <div className="text-center mb-6 pb-4 border-b-2 border-islamic-gold/30">
                  <div className="inline-block bg-gradient-to-r from-islamic-gold/20 via-islamic-gold/30 to-islamic-gold/20 px-8 py-3 rounded-full border-2 border-islamic-gold/40 shadow-lg">
                    <h1 className="text-3xl font-arabic text-islamic-crescent mb-1">
                      {surahData.arabic.name}
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      {surahData.arabic.englishName} • {surahData.arabic.revelationType} • {surahData.arabic.numberOfAyahs} Ayahs
                    </p>
                  </div>
                </div>

                {/* Bismillah - First Page Only */}
                {currentPage === 0 && surahData.arabic.number !== 1 && surahData.arabic.number !== 9 && (
                  <div className="text-center mb-8 pb-6 border-b border-islamic-gold/20">
                    <div className="inline-block bg-gradient-to-r from-islamic-gold/10 via-islamic-gold/20 to-islamic-gold/10 px-6 py-3 rounded-lg border border-islamic-gold/30">
                      <p className="text-3xl font-arabic text-islamic-crescent">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </p>
                    </div>
                  </div>
                )}

                {/* Ayahs Content */}
                <ScrollArea className="h-[480px] px-2">
                  <div className="space-y-6">
                    {getCurrentPageAyahs().map((ayah, index) => (
                      <div key={ayah.number} className="relative">
                        {/* Arabic Text with Ayah Number */}
                        <div className="text-right mb-4">
                          <p className="text-3xl font-arabic leading-[3.5rem] text-islamic-crescent inline">
                            {ayah.text}
                            {/* Ayah Number in Traditional Circle */}
                            <span className="inline-flex items-center justify-center w-8 h-8 mx-2 rounded-full bg-gradient-to-br from-islamic-gold/30 to-islamic-crescent/30 border-2 border-islamic-gold/50 text-sm font-bold text-islamic-crescent align-middle">
                              {ayah.numberInSurah}
                            </span>
                          </p>
                        </div>

                        {/* Translations */}
                        {(showUrdu || showEnglish) && (
                          <div className="bg-background/40 rounded-lg p-4 border border-islamic-gold/20 space-y-3">
                            {/* Urdu Translation */}
                            {showUrdu && surahData.urduTranslation && (
                              <p className="text-lg text-right text-muted-foreground leading-relaxed font-urdu">
                                {surahData.urduTranslation.ayahs[ayah.numberInSurah - 1]?.text}
                              </p>
                            )}

                            {/* English Translation */}
                            {showEnglish && surahData.englishTranslation && (
                              <p className="text-base text-left text-muted-foreground leading-relaxed border-t border-islamic-gold/10 pt-3">
                                {surahData.englishTranslation.ayahs[ayah.numberInSurah - 1]?.text}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Divider between ayahs */}
                        {index < getCurrentPageAyahs().length - 1 && (
                          <div className="mt-6 border-b border-islamic-gold/20"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Page Number - Traditional Style */}
                <div className="text-center mt-6 pt-4 border-t border-islamic-gold/30">
                  <div className="inline-block bg-gradient-to-r from-islamic-gold/10 via-islamic-gold/20 to-islamic-gold/10 px-6 py-2 rounded-full border border-islamic-gold/30">
                    <span className="text-sm font-medium text-islamic-crescent">
                      صفحہ {currentPage + 1} از {totalPages}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Book Style */}
          <div className="flex items-center justify-between mt-6">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              variant="outline"
              size="lg"
              className="gap-2 border-2 border-islamic-gold/40 hover:border-islamic-gold hover:bg-islamic-gold/10 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
              پچھلا
            </Button>
            
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              variant="outline"
              size="lg"
              className="gap-2 border-2 border-islamic-gold/40 hover:border-islamic-gold hover:bg-islamic-gold/10 disabled:opacity-30"
            >
              اگلا
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
