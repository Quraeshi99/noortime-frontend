import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPage } from '@/services/quranApi';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const PageReader = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      if (pageNumber) {
        try {
          const data = await fetchPage(parseInt(pageNumber));
          console.log('Page data:', data);
          setLoading(false);
        } catch (error) {
          console.error('Error loading page:', error);
          setLoading(false);
        }
      }
    };
    loadPage();
  }, [pageNumber]);

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
          onClick={() => navigate('/quran/page')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Page {pageNumber}</h1>
          <p className="text-muted-foreground mb-4">صفحہ {pageNumber}</p>
          <p className="text-sm text-muted-foreground">
            Coming soon - Page reading feature will be added
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageReader;
