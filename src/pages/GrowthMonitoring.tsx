import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, Sprout, Sun, Droplets, CalendarDays, CheckCircle2, Clock } from 'lucide-react';

const stages = [
  { key: 'germination', progress: 100, days: 'Days 1-10', status: 'completed' },
  { key: 'vegetative', progress: 60, days: 'Days 11-50', status: 'active' },
  { key: 'reproductive', progress: 0, days: 'Days 51-80', status: 'upcoming' },
  { key: 'maturation', progress: 0, days: 'Days 81-120', status: 'upcoming' },
];

const irrigationSchedule = [
  { day: 'Mon', time: '6:00 AM', amount: '25L/plot', done: true },
  { day: 'Wed', time: '6:00 AM', amount: '25L/plot', done: true },
  { day: 'Fri', time: '6:00 AM', amount: '30L/plot', done: false },
  { day: 'Sun', time: '6:00 AM', amount: '25L/plot', done: false },
];

const tasks = [
  { task: 'Apply NPK fertilizer (15-15-15)', due: 'Today', done: false },
  { task: 'First weeding session', due: 'In 2 days', done: false },
  { task: 'Check for stem borers', due: 'In 5 days', done: false },
  { task: 'Second fertilizer application', due: 'In 14 days', done: false },
];

export default function GrowthMonitoring() {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">{t('growth.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('growth.subtitle')}</p>
      </div>

      {/* Growth Stage Timeline */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sprout className="h-5 w-5 text-primary" />
            {t('growth.stage')}: {t('growth.vegetative')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stages.map((stage, i) => (
              <div key={stage.key} className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                  stage.status === 'completed' ? 'bg-success text-success-foreground' :
                  stage.status === 'active' ? 'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {stage.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{t(`growth.${stage.key}`)}</span>
                    <span className="text-xs text-muted-foreground">{stage.days}</span>
                  </div>
                  <Progress value={stage.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">Day 35 of 120 • Overall progress: 29%</p>
        </CardContent>
      </Card>

      {/* Upload */}
      <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">{t('growth.upload')}</p>
            <p className="text-sm text-muted-foreground">Get AI-powered growth stage identification</p>
          </div>
          <Button>Upload</Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Irrigation */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="h-5 w-5 text-info" />
              {t('growth.irrigation')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {irrigationSchedule.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  {item.done ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{item.day} • {item.time}</p>
                    <p className="text-xs text-muted-foreground">{item.amount}</p>
                  </div>
                </div>
                {item.done && <Badge variant="outline" className="bg-success/10 text-success text-xs">Done</Badge>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              {t('growth.tasks')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium">{item.task}</p>
                  <p className="text-xs text-muted-foreground">{item.due}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
