import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { BookOpen, List, Hash, Search, Bookmark, RotateCcw } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            القرآن الکریم
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground">The Holy Quran</p>
        </div>

        {/* Navigation Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {navigationOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.title}
                onClick={option.onClick}
                className="p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary/50 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1 text-right">{option.titleUrdu}</h3>
                    <h4 className="text-lg font-medium mb-1">{option.title}</h4>
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
