import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, MapPin, Phone, Sprout, Shield } from 'lucide-react';

export default function Profile() {
  const { t } = useLanguage();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">{t('nav.profile')}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Jean Mbarga</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Bamenda, North-West Region</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Full Name</label>
              <Input defaultValue="Jean Mbarga" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Phone</label>
              <Input defaultValue="+237 677 123 456" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Region</label>
              <Select defaultValue="nw">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nw">North-West</SelectItem>
                  <SelectItem value="w">West</SelectItem>
                  <SelectItem value="c">Centre</SelectItem>
                  <SelectItem value="sw">South-West</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Farm Size</label>
              <Input defaultValue="4.5 hectares" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sprout className="h-5 w-5" /> Crop Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Primary Variety</label>
              <Select defaultValue="yellow">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yellow">Yellow Maize (CMS 8704)</SelectItem>
                  <SelectItem value="white">White Maize (Kassaï)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Number of Plots</label>
              <Input defaultValue="3" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Quality Certification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-success/5 border border-success/20">
            <div>
              <p className="font-medium">Quality Certification Progress</p>
              <p className="text-sm text-muted-foreground">Complete all steps to get certified for industrial buyers</p>
            </div>
            <Badge className="bg-success text-success-foreground">75% Complete</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>{t('common.save')}</Button>
      </div>
    </div>
  );
}
