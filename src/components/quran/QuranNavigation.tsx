import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, List, Hash, Search, Bookmark, RotateCcw, ArrowLeft } from 'lucide-react';

const QuranNavigation = () => {
  const navigate = useNavigate();

  const navigationOptions = [
    {
      title: 'Resume',
      titleUrdu: 'جاری رکھیں',
      description: 'Continue from where you left off',
      icon: RotateCcw,
      onClick: () => {
        const lastRead = localStorage.getItem('lastReadSurah');
        if (lastRead) {
          navigate(`/quran/surah/${lastRead}`);
        } else {
          navigate('/quran/surah/1');
        }
      }
    },
    {
      title: 'Juz Index',
      titleUrdu: 'پارہ انڈیکس',
      description: 'Browse by Juz (Para)',
      icon: List,
      onClick: () => navigate('/quran/juz')
    },
    {
      title: 'Surah Index',
      titleUrdu: 'سورہ انڈیکس',
      description: 'Browse all Surahs',
      icon: BookOpen,
      onClick: () => navigate('/quran/surahs')
    },
    {
      title: 'Go to Page',
      titleUrdu: 'صفحہ پر جائیں',
      description: 'Jump to specific page',
      icon: Hash,
      onClick: () => navigate('/quran/page')
    },
    {
      title: 'Go to Surah',
      titleUrdu: 'سورہ پر جائیں',
      description: 'Jump to specific Surah',
      icon: Search,
      onClick: () => navigate('/quran/goto-surah')
    },
    {
      title: 'Bookmarks',
      titleUrdu: 'بک مارکس',
      description: 'View saved bookmarks',
      icon: Bookmark,
      onClick: () => navigate('/quran/bookmarks')
    }
  ];

  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">
            القرآن الکریم
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">The Holy Quran</p>
        </div>

        {/* Navigation Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {navigationOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.title}
                onClick={option.onClick}
                className="p-5 cursor-pointer hover:shadow-md transition-all hover:border-primary/50 bg-card"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-0.5 text-right">{option.titleUrdu}</h3>
                    <h4 className="text-base font-medium mb-1">{option.title}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuranNavigation;
