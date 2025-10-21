import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GoToSurah = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [surahNumber, setSurahNumber] = useState('');

  const handleGoToSurah = () => {
    const surah = parseInt(surahNumber);
    if (surah >= 1 && surah <= 114) {
      navigate(`/quran/surah/${surah}`);
    } else {
      toast({
        title: 'Invalid Surah',
        description: 'Please enter a Surah number between 1 and 114',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/quran')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Go to Surah</h1>
            <p className="text-lg text-right text-muted-foreground">سورہ پر جائیں</p>
          </div>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Enter Surah Number (1-114)
              </label>
              <Input
                type="number"
                placeholder="Enter Surah number"
                value={surahNumber}
                onChange={(e) => setSurahNumber(e.target.value)}
                min="1"
                max="114"
                className="text-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleGoToSurah();
                  }
                }}
              />
            </div>
            <Button onClick={handleGoToSurah} className="w-full" size="lg">
              Go to Surah
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GoToSurah;
