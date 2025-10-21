import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const juzData = [
  { number: 1, nameUrdu: 'الٓمٓ', startSurah: 1, endSurah: 2 },
  { number: 2, nameUrdu: 'سَیَقُوۡلُ', startSurah: 2, endSurah: 2 },
  { number: 3, nameUrdu: 'تِلۡکَ الرُّسُلُ', startSurah: 2, endSurah: 3 },
  { number: 4, nameUrdu: 'لَنۡ تَنَالُوا', startSurah: 3, endSurah: 4 },
  { number: 5, nameUrdu: 'وَالۡمُحۡصَنٰتُ', startSurah: 4, endSurah: 5 },
  { number: 6, nameUrdu: 'لَا یُحِبُّ اللّٰہُ', startSurah: 4, endSurah: 5 },
  { number: 7, nameUrdu: 'وَاِذَا سَمِعُوۡا', startSurah: 5, endSurah: 6 },
  { number: 8, nameUrdu: 'وَلَوۡ اَنَّنَا', startSurah: 6, endSurah: 7 },
  { number: 9, nameUrdu: 'قَالَ الۡمَلَاُ', startSurah: 7, endSurah: 8 },
  { number: 10, nameUrdu: 'وَاعۡلَمُوۡۤا', startSurah: 8, endSurah: 9 },
  { number: 11, nameUrdu: 'یَعۡتَذِرُوۡنَ', startSurah: 9, endSurah: 11 },
  { number: 12, nameUrdu: 'وَمَا مِنۡ دَآبَّۃٍ', startSurah: 11, endSurah: 12 },
  { number: 13, nameUrdu: 'وَمَاۤ اُبَرِّیُٔ', startSurah: 12, endSurah: 14 },
  { number: 14, nameUrdu: 'رُبَمَا', startSurah: 15, endSurah: 16 },
  { number: 15, nameUrdu: 'سُبۡحٰنَ الَّذِیۡۤ', startSurah: 17, endSurah: 18 },
  { number: 16, nameUrdu: 'قَالَ اَلَمۡ', startSurah: 18, endSurah: 20 },
  { number: 17, nameUrdu: 'اِقۡتَرَبَ لِلنَّاسِ', startSurah: 21, endSurah: 22 },
  { number: 18, nameUrdu: 'قَدۡ اَفۡلَحَ', startSurah: 23, endSurah: 25 },
  { number: 19, nameUrdu: 'وَقَالَ الَّذِیۡنَ', startSurah: 25, endSurah: 27 },
  { number: 20, nameUrdu: 'اَمَّنۡ خَلَقَ', startSurah: 27, endSurah: 29 },
  { number: 21, nameUrdu: 'اُتۡلُ مَاۤ اُوۡحِیَ', startSurah: 29, endSurah: 33 },
  { number: 22, nameUrdu: 'وَمَنۡ یَّقۡنُتۡ', startSurah: 33, endSurah: 36 },
  { number: 23, nameUrdu: 'وَمَالِیَ', startSurah: 36, endSurah: 39 },
  { number: 24, nameUrdu: 'فَمَنۡ اَظۡلَمُ', startSurah: 39, endSurah: 41 },
  { number: 25, nameUrdu: 'اِلَیۡہِ یُرَدُّ', startSurah: 41, endSurah: 45 },
  { number: 26, nameUrdu: 'حٰمٓ', startSurah: 46, endSurah: 51 },
  { number: 27, nameUrdu: 'قَالَ فَمَا خَطۡبُکُمۡ', startSurah: 51, endSurah: 57 },
  { number: 28, nameUrdu: 'قَدۡ سَمِعَ اللّٰہُ', startSurah: 58, endSurah: 66 },
  { number: 29, nameUrdu: 'تَبٰرَکَ الَّذِیۡ', startSurah: 67, endSurah: 77 },
  { number: 30, nameUrdu: 'عَمَّ یَتَسَآءَلُوۡنَ', startSurah: 78, endSurah: 114 }
];

const JuzIndex = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/quran')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Juz Index</h1>
            <p className="text-lg text-right text-muted-foreground">پارہ انڈیکس</p>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid gap-4">
            {juzData.map((juz) => (
              <Card
                key={juz.number}
                onClick={() => navigate(`/quran/juz/${juz.number}`)}
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Juz {juz.number}</h3>
                    <p className="text-sm text-muted-foreground">
                      Surah {juz.startSurah} - {juz.endSurah}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-arabic">{juz.nameUrdu}</p>
                    <p className="text-sm text-muted-foreground">پارہ {juz.number}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default JuzIndex;
