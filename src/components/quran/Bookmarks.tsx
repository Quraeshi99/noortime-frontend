import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

interface Bookmark {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
}

const Bookmarks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('quranBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const handleDeleteBookmark = (timestamp: number) => {
    const updatedBookmarks = bookmarks.filter(b => b.timestamp !== timestamp);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('quranBookmarks', JSON.stringify(updatedBookmarks));
    toast({
      title: 'Bookmark Deleted',
      description: 'Bookmark has been removed'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/quran')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Bookmarks</h1>
            <p className="text-lg text-right text-muted-foreground">بک مارکس</p>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-lg text-muted-foreground">No bookmarks saved yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Start reading and save your favorite verses
            </p>
          </Card>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid gap-4">
              {bookmarks.map((bookmark) => (
                <Card
                  key={bookmark.timestamp}
                  className="p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => navigate(`/quran/surah/${bookmark.surahNumber}`)}
                      className="cursor-pointer flex-1"
                    >
                      <h3 className="text-xl font-semibold">{bookmark.surahName}</h3>
                      <p className="text-sm text-muted-foreground">
                        Ayah {bookmark.ayahNumber}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(bookmark.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteBookmark(bookmark.timestamp)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
