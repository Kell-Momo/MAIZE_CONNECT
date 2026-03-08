import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ShoppingCart, Search, MapPin, Star, MessageSquare, FileText, Clock, Plus, Shield
} from 'lucide-react';

const mockListings = [
  { id: 1, seller: 'Farmer Jean', variety: 'Yellow (CMS 8704)', quantity: '5 tons', price: '180,000 CFA/ton', location: 'Bamenda', grade: 'A', certified: true, rating: 4.8 },
  { id: 2, seller: 'Coop Bafut', variety: 'White (Kassaï)', quantity: '12 tons', price: '165,000 CFA/ton', location: 'Bafut', grade: 'A-', certified: true, rating: 4.6 },
  { id: 3, seller: 'Farmer Marie', variety: 'Yellow (ATP SR-Y)', quantity: '3 tons', price: '195,000 CFA/ton', location: 'Fundong', grade: 'A+', certified: true, rating: 4.9 },
  { id: 4, seller: 'Menchum Farms', variety: 'White (Obatanpa)', quantity: '8 tons', price: '170,000 CFA/ton', location: 'Wum', grade: 'B+', certified: false, rating: 4.3 },
];

const mockContracts = [
  { id: 1, buyer: 'Nestlé Cameroon', quantity: '10 tons', price: '190,000 CFA/ton', status: 'Active', date: 'Mar 1, 2026' },
  { id: 2, buyer: 'SABC Brewery', quantity: '5 tons', price: '185,000 CFA/ton', status: 'Completed', date: 'Feb 15, 2026' },
];

const mockMessages = [
  { from: 'Nestlé Cameroon', message: 'Can you deliver by end of August?', time: '2 hours ago', unread: true },
  { from: 'SABC Brewery', message: 'Payment has been processed.', time: '1 day ago', unread: false },
  { from: 'Local Mill Co.', message: 'Interested in your yellow maize listing.', time: '3 days ago', unread: false },
];

export default function IndustrialMarketplace() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">{t('marketplace.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('marketplace.subtitle')}</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t('marketplace.createListing')}
        </Button>
      </div>

      <Tabs defaultValue="browse">
        <TabsList>
          <TabsTrigger value="browse">{t('marketplace.browse')}</TabsTrigger>
          <TabsTrigger value="my">{t('marketplace.myListings')}</TabsTrigger>
          <TabsTrigger value="messages">{t('marketplace.messages')} <Badge className="ml-1 h-5 w-5 p-0 text-xs bg-destructive">1</Badge></TabsTrigger>
          <TabsTrigger value="contracts">{t('marketplace.contracts')}</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search listings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="a">Grade A+/A</SelectItem>
                <SelectItem value="b">Grade B+/B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {mockListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold">{listing.variety}</h3>
                      <p className="text-sm text-muted-foreground">{listing.seller}</p>
                    </div>
                    <div className="flex gap-1">
                      {listing.certified && (
                        <Badge className="bg-success/10 text-success border-success/20 gap-1" variant="outline">
                          <Shield className="h-3 w-3" /> Certified
                        </Badge>
                      )}
                      <Badge variant="outline">Grade {listing.grade}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">{t('marketplace.quantity')}:</span> <span className="font-medium">{listing.quantity}</span></div>
                    <div><span className="text-muted-foreground">{t('marketplace.location')}:</span> <span className="font-medium">{listing.location}</span></div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <p className="text-lg font-bold text-primary">{listing.price}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1"><MessageSquare className="h-3.5 w-3.5" /> Message</Button>
                      <Button size="sm">Buy</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my" className="mt-4">
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium">Your maize will appear here after harvest</p>
              <p className="text-sm text-muted-foreground mt-1">Create a listing to start selling</p>
              <Button className="mt-4 gap-2"><Plus className="h-4 w-4" /> {t('marketplace.createListing')}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-4 space-y-3">
          {mockMessages.map((msg, i) => (
            <Card key={i} className={`hover:shadow-sm transition-shadow ${msg.unread ? 'border-primary/30 bg-primary/5' : ''}`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{msg.from}</p>
                    <p className="text-sm text-muted-foreground">{msg.message}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{msg.time}</span>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="contracts" className="mt-4 space-y-3">
          {mockContracts.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{c.buyer}</p>
                    <p className="text-xs text-muted-foreground">{c.quantity} • {c.price} • {c.date}</p>
                  </div>
                </div>
                <Badge variant={c.status === 'Active' ? 'default' : 'secondary'}
                  className={c.status === 'Active' ? 'bg-success text-success-foreground' : ''}>
                  {c.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
