import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, Phone } from 'lucide-react';

const regions = ['Centre', 'North-West', 'West', 'Littoral', 'South-West', 'North', 'Far North', 'Adamawa', 'East', 'South'];

const mockSeeds = [
  { id: 1, name: 'CMS 8704', type: 'Yellow', price: 1200, supplier: 'AgriCam Seeds', region: 'Centre', rating: 4.8, maturity: '90 days', yield: '6-8 t/ha', certified: true },
  { id: 2, name: 'ATP SR-Y', type: 'Yellow', price: 1500, supplier: 'IRAD Cameroon', region: 'North-West', rating: 4.9, maturity: '110 days', yield: '7-9 t/ha', certified: true },
  { id: 3, name: 'Kassaï', type: 'White', price: 950, supplier: 'SemAgri SARL', region: 'North', rating: 4.3, maturity: '85 days', yield: '5-7 t/ha', certified: true },
  { id: 4, name: 'CMS 9015', type: 'White', price: 1100, supplier: 'FarmPro Cameroon', region: 'West', rating: 4.6, maturity: '95 days', yield: '6-8 t/ha', certified: true },
  { id: 5, name: 'EVDT-W', type: 'White', price: 1350, supplier: 'Maize Master Ltd', region: 'Littoral', rating: 4.5, maturity: '100 days', yield: '7-9 t/ha', certified: true },
  { id: 6, name: 'Obatanpa', type: 'White', price: 1000, supplier: 'AgriCam Seeds', region: 'Centre', rating: 4.7, maturity: '105 days', yield: '5-7 t/ha', certified: true },
];

export default function SeedMarketplace() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('all');

  const filtered = mockSeeds.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.supplier.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === 'all' || s.region === region;
    return matchSearch && matchRegion;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">{t('seeds.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('seeds.subtitle')}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t('seeds.search')} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t('seeds.filterRegion')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('seeds.allRegions')}</SelectItem>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((seed) => (
          <Card key={seed.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">{seed.name}</h3>
                  <p className="text-sm text-muted-foreground">{seed.supplier}</p>
                </div>
                <Badge variant={seed.type === 'Yellow' ? 'default' : 'secondary'} className={seed.type === 'Yellow' ? 'bg-secondary text-secondary-foreground' : ''}>
                  {seed.type}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Maturity:</span> <span className="font-medium">{seed.maturity}</span></div>
                <div><span className="text-muted-foreground">Yield:</span> <span className="font-medium">{seed.yield}</span></div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{seed.region}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                  <span className="font-medium">{seed.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <p className="text-lg font-bold text-primary">{seed.price.toLocaleString()} {t('common.cfa')}{t('seeds.perKg')}</p>
                <Button size="sm" className="gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {t('seeds.contact')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
