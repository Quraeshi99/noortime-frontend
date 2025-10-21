import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GoToPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pageNumber, setPageNumber] = useState('');

  const handleGoToPage = () => {
    const page = parseInt(pageNumber);
    if (page >= 1 && page <= 604) {
      navigate(`/quran/page/${page}`);
    } else {
      toast({
        title: 'Invalid Page',
        description: 'Please enter a page number between 1 and 604',
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
            <h1 className="text-3xl font-bold">Go to Page</h1>
            <p className="text-lg text-right text-muted-foreground">صفحہ پر جائیں</p>
          </div>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Enter Page Number (1-604)
              </label>
              <Input
                type="number"
                placeholder="Enter page number"
                value={pageNumber}
                onChange={(e) => setPageNumber(e.target.value)}
                min="1"
                max="604"
                className="text-lg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleGoToPage();
                  }
                }}
              />
            </div>
            <Button onClick={handleGoToPage} className="w-full" size="lg">
              Go to Page
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GoToPage;
