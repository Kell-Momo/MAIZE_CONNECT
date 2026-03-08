import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Sprout, Cloud, CalendarDays, TrendingUp, Droplets, Sun, CloudRain, Wind
} from 'lucide-react';

const mockWeather = [
  { day: 'Today', icon: Sun, temp: '32°C', rain: '10%' },
  { day: 'Tue', icon: Cloud, temp: '29°C', rain: '40%' },
  { day: 'Wed', icon: CloudRain, temp: '26°C', rain: '75%' },
  { day: 'Thu', icon: Sun, temp: '31°C', rain: '15%' },
  { day: 'Fri', icon: Wind, temp: '30°C', rain: '20%' },
];

const mockTasks = [
  { task: 'Apply fertilizer to Plot A', due: 'Today', priority: 'high' as const },
  { task: 'Check irrigation on Plot B', due: 'Tomorrow', priority: 'medium' as const },
  { task: 'Scout for pests in Plot C', due: 'In 3 days', priority: 'low' as const },
  { task: 'Harvest readiness check', due: 'In 5 days', priority: 'medium' as const },
];

const mockCalendar = [
  { month: 'Mar', activity: 'Land preparation & planting', status: 'active' },
  { month: 'Apr', activity: 'Germination monitoring', status: 'upcoming' },
  { month: 'May', activity: 'Vegetative growth & fertilizer', status: 'upcoming' },
  { month: 'Jun', activity: 'Pest/disease monitoring', status: 'upcoming' },
  { month: 'Jul', activity: 'Reproductive stage care', status: 'upcoming' },
  { month: 'Aug', activity: 'Harvest preparation', status: 'upcoming' },
];

const priorityColors = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  low: 'bg-success/10 text-success border-success/20',
};

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">{t('dashboard.welcome')}, Farmer Jean 🌽</h1>
        <p className="text-muted-foreground mt-1">Bamenda, North-West Region • Season 2026</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('dashboard.totalArea'), value: '4.5', unit: t('dashboard.hectares'), icon: Sprout, color: 'text-primary' },
          { label: t('dashboard.activeCrops'), value: '3', unit: 'plots', icon: TrendingUp, color: 'text-success' },
          { label: t('dashboard.nextHarvest'), value: '45', unit: 'days', icon: CalendarDays, color: 'text-warning' },
          { label: t('dashboard.qualityScore'), value: '87%', unit: '', icon: Droplets, color: 'text-info' },
        ].map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">
                    {stat.value}
                    {stat.unit && <span className="text-sm font-normal text-muted-foreground ml-1">{stat.unit}</span>}
                  </p>
                </div>
                <stat.icon className={`h-5 w-5 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Weather */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sun className="h-5 w-5 text-warning" />
              {t('dashboard.weather')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {mockWeather.map((w) => (
                <div key={w.day} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50">
                  <span className="text-xs font-medium">{w.day}</span>
                  <w.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-semibold">{w.temp}</span>
                  <span className="text-xs text-info">{w.rain}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              {t('dashboard.upcomingTasks')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTasks.map((task, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-2 rounded-lg bg-muted/30">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{task.task}</p>
                    <p className="text-xs text-muted-foreground">{task.due}</p>
                  </div>
                  <Badge variant="outline" className={`shrink-0 text-xs ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cultivation Calendar */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            {t('dashboard.calendar')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {mockCalendar.map((item) => (
              <div
                key={item.month}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  item.status === 'active'
                    ? 'bg-primary/10 border-primary/30 ring-2 ring-primary/20'
                    : 'bg-muted/30 border-border'
                }`}
              >
                <p className="text-sm font-bold">{item.month}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.activity}</p>
                {item.status === 'active' && (
                  <Badge className="mt-2 text-xs bg-primary text-primary-foreground">Active</Badge>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Season Progress</span>
              <span className="font-medium">25%</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
