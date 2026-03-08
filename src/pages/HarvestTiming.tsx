import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Droplets, Sun, CloudRain, Thermometer, Gauge } from 'lucide-react';

const harvestSchedule = [
  { date: 'Aug 15-18', weather: 'Sunny', temp: '30°C', rain: '5%', icon: Sun, suitable: true },
  { date: 'Aug 19-20', weather: 'Cloudy', temp: '27°C', rain: '35%', icon: CloudRain, suitable: false },
  { date: 'Aug 21-24', weather: 'Sunny', temp: '31°C', rain: '10%', icon: Sun, suitable: true },
  { date: 'Aug 25-27', weather: 'Rain', temp: '25°C', rain: '80%', icon: CloudRain, suitable: false },
];

export default function HarvestTiming() {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">{t('harvest.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('harvest.subtitle')}</p>
      </div>

      {/* Readiness Gauge */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            {t('harvest.readiness')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                  strokeDasharray={`${72 * 2.64} ${264 - 72 * 2.64}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">72%</span>
                <span className="text-xs text-muted-foreground">Ready</span>
              </div>
            </div>
            <Badge className="bg-warning/10 text-warning border-warning/20" variant="outline">
              Approaching Harvest Window
            </Badge>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Grain moisture at 22%. Target: 14-18% for optimal harvest. Estimated 10-15 more days needed.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Optimal Window */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {t('harvest.optimalWindow')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground">Predicted Optimal Window</p>
              <p className="text-2xl font-bold text-primary mt-1">August 15 - 24, 2026</p>
              <p className="text-sm text-muted-foreground mt-1">Based on growth stage, moisture, and weather</p>
            </div>

            <div className="space-y-3">
              {harvestSchedule.map((day, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${day.suitable ? 'bg-success/5 border border-success/20' : 'bg-muted/30'}`}>
                  <div className="flex items-center gap-3">
                    <day.icon className={`h-5 w-5 ${day.suitable ? 'text-success' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="text-sm font-medium">{day.date}</p>
                      <p className="text-xs text-muted-foreground">{day.weather} • {day.temp} • Rain: {day.rain}</p>
                    </div>
                  </div>
                  {day.suitable && <Badge className="bg-success text-success-foreground text-xs">Go</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Moisture */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="h-5 w-5 text-info" />
              {t('harvest.moisture')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Thermometer className="h-8 w-8 text-info mx-auto mb-2" />
              <p className="text-3xl font-bold">22%</p>
              <p className="text-sm text-muted-foreground">Current Moisture Content</p>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Too Wet (>25%)', value: 25, color: 'bg-destructive' },
                { label: 'Current (22%)', value: 22, color: 'bg-warning' },
                { label: 'Optimal (14-18%)', value: 16, color: 'bg-success' },
                { label: 'Too Dry (<12%)', value: 12, color: 'bg-info' },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value * 3} className="h-1.5" />
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Moisture drops ~1% per day under current weather. Optimal harvest moisture for storage is 14-18%.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
