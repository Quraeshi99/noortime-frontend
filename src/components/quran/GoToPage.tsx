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
          <h1 className="text-3xl font-bold mb-1">Go to Page</h1>
          <p className="text-lg text-right text-muted-foreground">صفحہ پر جائیں</p>
        </div>

        <Card className="p-6 bg-card">
          <div className="space-y-4">
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
            <Button onClick={handleGoToPage} className="w-full">
              Go to Page
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GoToPage;
