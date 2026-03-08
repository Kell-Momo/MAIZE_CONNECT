import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Leaf, Ruler, Grid3x3, AlignVerticalSpaceAround, CheckCircle2, AlertTriangle } from 'lucide-react';

const mockResults = {
  spacing: { score: 78, label: 'Good', feedback: 'Plant spacing averages 25cm. Optimal is 25-30cm for this variety.' },
  density: { score: 85, label: 'Excellent', feedback: 'Plant density of 65,000 plants/ha is within optimal range.' },
  alignment: { score: 62, label: 'Needs Improvement', feedback: 'Row alignment shows 15° deviation. Consider using a planting guide.' },
};

const mockRecommendations = [
  { type: 'success', title: 'Plant Density', desc: 'Your planting density is optimal. Maintain current spacing for maximum yield.' },
  { type: 'warning', title: 'Row Alignment', desc: 'Use string lines or a mechanical planter to improve row straightness by 20%.' },
  { type: 'success', title: 'Spacing', desc: 'Inter-row spacing is good. Monitor for volunteer plants that may increase competition.' },
  { type: 'warning', title: 'Seed Depth', desc: 'Ensure seeds are planted at 5-7cm depth for optimal germination in your soil type.' },
];

export default function PlantingAdvisor() {
  const { t } = useLanguage();
  const [hasImage, setHasImage] = useState(false);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">{t('planting.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('planting.subtitle')}</p>
      </div>

      {/* Upload Area */}
      <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setHasImage(true)}>
        <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-3">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="font-semibold">{t('planting.upload')}</p>
            <p className="text-sm text-muted-foreground">{t('planting.dragDrop')}</p>
          </div>
          <Button variant="outline">{t('planting.analyze')}</Button>
        </CardContent>
      </Card>

      {hasImage && (
        <>
          {/* Analysis Results */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { key: 'spacing', icon: Ruler, data: mockResults.spacing },
              { key: 'density', icon: Grid3x3, data: mockResults.density },
              { key: 'alignment', icon: AlignVerticalSpaceAround, data: mockResults.alignment },
            ].map(({ key, icon: Icon, data }) => (
              <Card key={key}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{t(`planting.${key}`)}</h3>
                    </div>
                    <Badge variant={data.score >= 80 ? 'default' : 'secondary'} className={data.score >= 80 ? 'bg-success text-success-foreground' : 'bg-warning/10 text-warning'}>
                      {data.label}
                    </Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Score</span>
                      <span className="font-semibold">{data.score}%</span>
                    </div>
                    <Progress value={data.score} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">{data.feedback}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                {t('planting.recommendations')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockRecommendations.map((rec, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/30">
                  {rec.type === 'success' ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{rec.title}</p>
                    <p className="text-sm text-muted-foreground">{rec.desc}</p>
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
