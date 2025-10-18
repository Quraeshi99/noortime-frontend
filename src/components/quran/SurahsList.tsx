import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllSurahs, Surah } from '@/services/quranApi';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, BookOpen, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const SurahsList = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await fetchAllSurahs();
        setSurahs(data);
        setFilteredSurahs(data);
      } catch (error) {
        console.error('Error loading surahs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSurahs();
  }, []);

  useEffect(() => {
    const filtered = surahs.filter(
      (surah) =>
        surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surah.name.includes(searchQuery) ||
        surah.number.toString().includes(searchQuery)
    );
    setFilteredSurahs(filtered);
  }, [searchQuery, surahs]);

  const handleSurahClick = (surahNumber: number) => {
    navigate(`/quran/surah/${surahNumber}`);
  };

  if (loading) {
    return (
      <div className="space-y-4 p-6">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-islamic-gold/5 to-islamic-crescent/5">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-islamic-crescent mb-2">القرآن الكريم</h1>
          <p className="text-lg text-muted-foreground">The Holy Quran</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search Surah by name or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg border-islamic-gold/30 focus:border-islamic-gold"
          />
        </div>

        {/* Surahs List */}
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-3">
            {filteredSurahs.map((surah) => (
              <Card
                key={surah.number}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-islamic-gold/20 hover:border-islamic-gold/50 bg-gradient-to-r from-background to-islamic-gold/5"
                onClick={() => handleSurahClick(surah.number)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {/* Left: Number Badge */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-islamic-gold/30 to-islamic-crescent/30 flex items-center justify-center border-2 border-islamic-gold/40">
                        <span className="text-lg font-bold text-islamic-crescent">
                          {surah.number}
                        </span>
                      </div>
                      
                      {/* Middle: Names */}
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-arabic text-islamic-crescent mb-1">
                          {surah.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {surah.englishName} - {surah.englishNameTranslation}
                        </p>
                      </div>
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-sm text-islamic-gold">
                        <MapPin className="h-4 w-4" />
                        <span className="capitalize">{surah.revelationType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{surah.numberOfAyahs} Ayahs</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
