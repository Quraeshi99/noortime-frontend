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
  Settings,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

const AYAHS_PER_PAGE = 5; // Number of ayahs per page for book-like experience

export const SurahReader = () => {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const navigate = useNavigate();
  const [surahData, setSurahData] = useState<SurahWithTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUrdu, setShowUrdu] = useState(true);
  const [showEnglish, setShowEnglish] = useState(false);
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
  const pages = [];

  // Create pages with ayahs
  for (let i = 0; i < totalPages; i++) {
    const startIdx = i * AYAHS_PER_PAGE;
    const endIdx = Math.min(startIdx + AYAHS_PER_PAGE, totalAyahs);
    pages.push({
      pageNumber: i + 1,
      ayahs: surahData.arabic.ayahs?.slice(startIdx, endIdx) || [],
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-islamic-gold/5 to-islamic-crescent/5">
      <div className="container mx-auto p-6 max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/quran')}
            className="gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Surahs
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-arabic text-islamic-crescent">
              {surahData.arabic.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {surahData.arabic.englishName} - {surahData.arabic.numberOfAyahs} Ayahs
            </p>
          </div>

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
        <Card className="mb-6 p-4 bg-islamic-gold/5 border-islamic-gold/20">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Switch
                id="urdu"
                checked={showUrdu}
                onCheckedChange={setShowUrdu}
              />
              <Label htmlFor="urdu" className="cursor-pointer">
                Urdu Translation
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="english"
                checked={showEnglish}
                onCheckedChange={setShowEnglish}
              />
              <Label htmlFor="english" className="cursor-pointer">
                English Translation
              </Label>
            </div>
          </div>
        </Card>

        {/* Bismillah */}
        {currentPage === 0 && surahData.arabic.number !== 1 && surahData.arabic.number !== 9 && (
          <div className="text-center mb-8">
            <p className="text-3xl font-arabic text-islamic-crescent">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>
        )}

        {/* Book-like Carousel */}
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {pages.map((page) => (
              <CarouselItem key={page.pageNumber}>
                <Card className="min-h-[600px] p-8 bg-gradient-to-br from-background to-islamic-gold/5 border-islamic-gold/30 shadow-2xl">
                  <ScrollArea className="h-[550px]">
                    <div className="space-y-8">
                      {page.ayahs.map((ayah) => (
                        <div
                          key={ayah.number}
                          className="p-6 rounded-lg bg-background/50 border border-islamic-gold/20 hover:border-islamic-gold/40 transition-all"
                        >
                          {/* Ayah Number */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-islamic-gold/30 to-islamic-crescent/30 flex items-center justify-center border-2 border-islamic-gold/40">
                              <span className="text-sm font-bold text-islamic-crescent">
                                {ayah.numberInSurah}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <BookmarkPlus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Arabic Text */}
                          <p className="text-2xl font-arabic text-right leading-loose mb-6 text-islamic-crescent">
                            {ayah.text}
                          </p>

                          {/* Urdu Translation */}
                          {showUrdu && surahData.urduTranslation && (
                            <p className="text-lg text-right mb-4 text-muted-foreground leading-relaxed font-urdu">
                              {surahData.urduTranslation.ayahs[ayah.numberInSurah - 1]?.text}
                            </p>
                          )}

                          {/* English Translation */}
                          {showEnglish && surahData.englishTranslation && (
                            <p className="text-base text-left text-muted-foreground leading-relaxed">
                              {surahData.englishTranslation.ayahs[ayah.numberInSurah - 1]?.text}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Page Number */}
                  <div className="text-center mt-4 text-sm text-muted-foreground">
                    Page {page.pageNumber} of {totalPages}
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <CarouselPrevious className="relative left-0 translate-y-0" />
            <span className="text-sm text-muted-foreground">
              Swipe or click arrows to turn pages
            </span>
            <CarouselNext className="relative right-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};
