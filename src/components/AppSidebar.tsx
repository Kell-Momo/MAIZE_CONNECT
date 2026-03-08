import {
  LayoutDashboard, Sprout, Leaf, TrendingUp, Bug, Calendar,
  Warehouse, ShoppingCart, Bell, User, Settings, Globe
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { t, language, setLanguage, languageNames } = useLanguage();

  const mainItems = [
    { title: t('nav.dashboard'), url: '/', icon: LayoutDashboard },
    { title: t('nav.seeds'), url: '/seeds', icon: Sprout },
    { title: t('nav.planting'), url: '/planting', icon: Leaf },
    { title: t('nav.growth'), url: '/growth', icon: TrendingUp },
    { title: t('nav.disease'), url: '/disease', icon: Bug },
    { title: t('nav.harvest'), url: '/harvest', icon: Calendar },
    { title: t('nav.storage'), url: '/storage', icon: Warehouse },
    { title: t('nav.marketplace'), url: '/marketplace', icon: ShoppingCart },
  ];

  const secondaryItems = [
    { title: t('nav.notifications'), url: '/notifications', icon: Bell },
    { title: t('nav.profile'), url: '/profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            M
          </div>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight">MaizeConnect</span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed ? 'Modules' : ''}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed ? 'Account' : ''}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={collapsed ? 'icon' : 'sm'} className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent">
              <Globe className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{languageNames[language]}</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start">
            {(Object.keys(languageNames) as Language[]).map((lang) => (
              <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)} className={language === lang ? 'bg-accent' : ''}>
                {languageNames[lang]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
