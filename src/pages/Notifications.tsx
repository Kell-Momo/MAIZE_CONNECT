import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Bug, Droplets, Calendar, ShoppingCart, Sprout } from 'lucide-react';

const mockNotifications = [
  { icon: Bug, title: 'Disease Alert', desc: 'Potential Maize Streak Virus detected in your area. Check your crops.', time: '1 hour ago', type: 'alert', read: false },
  { icon: Droplets, title: 'Irrigation Reminder', desc: 'Time to water Plot B. Recommended: 25L per plot.', time: '3 hours ago', type: 'reminder', read: false },
  { icon: Calendar, title: 'Fertilizer Due', desc: 'NPK 15-15-15 application scheduled for today on Plot A.', time: '5 hours ago', type: 'task', read: true },
  { icon: ShoppingCart, title: 'New Buyer Interest', desc: 'Nestlé Cameroon is interested in your yellow maize listing.', time: '1 day ago', type: 'market', read: true },
  { icon: Sprout, title: 'Growth Milestone', desc: 'Your Plot A maize has entered the vegetative growth stage!', time: '2 days ago', type: 'info', read: true },
  { icon: Bell, title: 'Weather Warning', desc: 'Heavy rain expected in 3 days. Consider adjusting irrigation.', time: '3 days ago', type: 'alert', read: true },
];

const typeColors: Record<string, string> = {
  alert: 'bg-destructive/10 text-destructive',
  reminder: 'bg-info/10 text-info',
  task: 'bg-warning/10 text-warning',
  market: 'bg-success/10 text-success',
  info: 'bg-primary/10 text-primary',
};

export default function Notifications() {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">{t('nav.notifications')}</h1>
        <p className="text-muted-foreground mt-1">Stay updated on your farm activities</p>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((n, i) => (
          <Card key={i} className={`transition-shadow hover:shadow-sm ${!n.read ? 'border-primary/30 bg-primary/5' : ''}`}>
            <CardContent className="p-4 flex gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${typeColors[n.type]}`}>
                <n.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{n.title}</p>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">{n.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
              </div>
              {!n.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
