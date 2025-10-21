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
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/quran')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Go to Surah</h1>
          <p className="text-lg text-right text-muted-foreground">سورہ پر جائیں</p>
        </div>

        <Card className="p-6 bg-card">
          <div className="space-y-4">
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
            <Button onClick={handleGoToSurah} className="w-full">
              Go to Surah
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GoToSurah;
