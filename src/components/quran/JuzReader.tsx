import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchJuz } from '@/services/quranApi';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const JuzReader = () => {
  const { juzNumber } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJuz = async () => {
      if (juzNumber) {
        try {
          const data = await fetchJuz(parseInt(juzNumber));
          console.log('Juz data:', data);
          setLoading(false);
        } catch (error) {
          console.error('Error loading Juz:', error);
          setLoading(false);
        }
      }
    };
    loadJuz();
  }, [juzNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/quran/juz')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Juz Index
        </Button>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Juz {juzNumber}</h1>
          <p className="text-muted-foreground mb-4">پارہ {juzNumber}</p>
          <p className="text-sm text-muted-foreground">
            Coming soon - Juz reading feature will be added
          </p>
        </div>
      </div>
    </div>
  );
};

export default JuzReader;
