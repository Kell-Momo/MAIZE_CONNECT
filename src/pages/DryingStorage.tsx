import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Warehouse, MapPin, Star, Clock, Thermometer, Calculator } from 'lucide-react';

const mockFacilities = [
  { id: 1, name: 'Bamenda Agri-Storage Hub', capacity: '500 tons', available: '120 tons', distance: 3.2, rate: '500 CFA/ton/day', rating: 4.7, type: 'Both', drying: true, storage: true },
  { id: 2, name: 'NW Cooperative Warehouse', capacity: '300 tons', available: '85 tons', distance: 5.8, rate: '400 CFA/ton/day', rating: 4.4, type: 'Storage Only', drying: false, storage: true },
  { id: 3, name: 'Mezam Drying Center', capacity: '200 tons', available: '60 tons', distance: 7.1, rate: '350 CFA/ton/day', rating: 4.6, type: 'Drying Only', drying: true, storage: false },
  { id: 4, name: 'National Cereals Board', capacity: '1000 tons', available: '300 tons', distance: 12.5, rate: '600 CFA/ton/day', rating: 4.8, type: 'Both', drying: true, storage: true },
];

const qualityTimeline = [
  { date: 'Day 1', moisture: '22%', status: 'Received', grade: 'B' },
  { date: 'Day 3', moisture: '18%', status: 'Drying', grade: 'B+' },
  { date: 'Day 5', moisture: '15%', status: 'Drying', grade: 'A-' },
  { date: 'Day 7', moisture: '13%', status: 'Ready for Storage', grade: 'A' },
];

export default function DryingStorage() {
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState('5');

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">{t('storage.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('storage.subtitle')}</p>
      </div>

      {/* Drying Calculator */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            {t('storage.dryingTime')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-1">
              <label className="text-sm text-muted-foreground">Quantity (tons)</label>
              <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-sm text-muted-foreground">Current Moisture</label>
              <Input value="22%" readOnly />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-sm text-muted-foreground">Target Moisture</label>
              <Input value="14%" readOnly />
            </div>
            <div className="p-3 rounded-lg bg-primary/10 text-center min-w-[120px]">
              <p className="text-xs text-muted-foreground">Est. Time</p>
              <p className="text-xl font-bold text-primary">5-7 days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          {t('storage.nearbyFacilities')}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {mockFacilities.map((f) => (
            <Card key={f.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold">{f.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {f.distance} {t('common.km')}
                      <Star className="h-3.5 w-3.5 fill-warning text-warning ml-2" /> {f.rating}
                    </div>
                  </div>
                  <Badge variant="outline">{f.type}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">{t('storage.capacity')}:</span> <span className="font-medium">{f.capacity}</span></div>
                  <div><span className="text-muted-foreground">Available:</span> <span className="font-medium">{f.available}</span></div>
                  <div className="col-span-2"><span className="text-muted-foreground">{t('storage.rates')}:</span> <span className="font-medium">{f.rate}</span></div>
                </div>

                <Button className="w-full" size="sm">{t('storage.book')}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quality Tracker */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-info" />
            {t('storage.qualityTracker')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {qualityTimeline.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 grid grid-cols-4 gap-2 text-sm">
                  <span className="font-medium">{item.date}</span>
                  <span>Moisture: {item.moisture}</span>
                  <span>{item.status}</span>
                  <Badge variant="outline" className="w-fit">Grade {item.grade}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
