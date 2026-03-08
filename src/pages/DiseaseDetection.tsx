import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Bug, Shield, AlertTriangle, Pill, Droplets, SprayCan } from 'lucide-react';

const mockDetection = {
  disease: 'Maize Streak Virus (MSV)',
  severity: 'medium' as const,
  confidence: 87,
  description: 'Characteristic yellow streaks along leaf veins. Transmitted by leafhoppers (Cicadulina spp.).',
  affectedArea: '~30% of inspected leaves',
};

const mockTreatments = [
  {
    product: 'Imidacloprid 200 SL',
    dosage: '5ml per 15L water',
    method: 'Foliar spray, targeting leaf undersides and stems',
    safety: 'Wear protective gloves and mask. Do not spray within 14 days of harvest.',
    type: 'Chemical',
  },
  {
    product: 'Neem Oil Extract',
    dosage: '30ml per 15L water',
    method: 'Foliar spray every 7 days for 3 weeks',
    safety: 'Organic-safe. Can be used closer to harvest.',
    type: 'Organic',
  },
  {
    product: 'Remove Infected Plants',
    dosage: 'N/A',
    method: 'Uproot severely infected plants to reduce vector population',
    safety: 'Burn or bury removed plants away from the field.',
    type: 'Cultural',
  },
];

const severityColors = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function DiseaseDetection() {
  const { t } = useLanguage();
  const [hasImage, setHasImage] = useState(false);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">{t('disease.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('disease.subtitle')}</p>
      </div>

      {/* Upload */}
      <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setHasImage(true)}>
        <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-3">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="font-semibold">{t('disease.upload')}</p>
            <p className="text-sm text-muted-foreground">{t('disease.multiAngle')}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Camera</Button>
            <Button>Upload Photos</Button>
          </div>
        </CardContent>
      </Card>

      {hasImage && (
        <>
          {/* Detection Results */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bug className="h-5 w-5 text-destructive" />
                {t('disease.results')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-muted/30">
                <div>
                  <h3 className="font-bold text-lg">{mockDetection.disease}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{mockDetection.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Badge variant="outline" className={severityColors[mockDetection.severity]}>
                    {t(`common.${mockDetection.severity}`)} {t('disease.severity')}
                  </Badge>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('disease.confidence')}</span>
                    <span className="font-semibold">{mockDetection.confidence}%</span>
                  </div>
                  <Progress value={mockDetection.confidence} className="h-2" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span>Affected: {mockDetection.affectedArea}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Plans */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                {t('disease.treatment')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTreatments.map((tr, i) => (
                <div key={i} className="p-4 rounded-lg border bg-card space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Pill className="h-4 w-4 text-primary" />
                      {tr.product}
                    </h4>
                    <Badge variant="outline">{tr.type}</Badge>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Droplets className="h-4 w-4 text-info shrink-0 mt-0.5" />
                      <div><p className="text-muted-foreground">{t('disease.dosage')}</p><p className="font-medium">{tr.dosage}</p></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <SprayCan className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div><p className="text-muted-foreground">{t('disease.method')}</p><p className="font-medium">{tr.method}</p></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                      <div><p className="text-muted-foreground">{t('disease.safety')}</p><p className="font-medium">{tr.safety}</p></div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
