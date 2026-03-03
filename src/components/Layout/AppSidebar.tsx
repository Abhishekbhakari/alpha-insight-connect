import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Briefcase,
  BarChart3,
  Settings,
  ScrollText,
  FileSignature,
  ChevronDown,
  Send,
  FileSpreadsheet,
  Workflow,
  FileText,
  Settings2,
  PieChart,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainNav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Recommendations", url: "/recommendations", icon: TrendingUp },
  { title: "Shadow Portfolios", url: "/portfolio", icon: Briefcase },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Logs", url: "/logs", icon: ScrollText },
  { title: "Settings", url: "/settings", icon: Settings },
];

const esignSubNav = [
  { title: "Dashboard", url: "/esign", icon: LayoutDashboard },
  { title: "Send Document", url: "/esign/send", icon: Send },
  { title: "Bulk Upload", url: "/esign/bulk", icon: FileSpreadsheet },
  { title: "Workflows", url: "/esign/workflows", icon: Workflow },
  { title: "Reports", url: "/esign/reports", icon: PieChart },
  { title: "Settings", url: "/esign/settings", icon: Settings2 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isEsignActive = location.pathname.startsWith("/esign");
  const [esignOpen, setEsignOpen] = useState(isEsignActive);

  return (
    <Sidebar collapsible="icon">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
          <TrendingUp className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-sidebar-foreground tracking-tight">
            Smart-Nudge
          </span>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* eSign Dropdown */}
              <SidebarMenuItem>
                {collapsed ? (
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/esign"
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                        isEsignActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                      )}
                    >
                      <FileSignature className="h-5 w-5 shrink-0" />
                    </NavLink>
                  </SidebarMenuButton>
                ) : (
                  <Collapsible open={esignOpen} onOpenChange={setEsignOpen}>
                    <CollapsibleTrigger className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                      <FileSignature className="h-5 w-5 shrink-0" />
                      <span className="flex-1 text-left">eSign</span>
                      <ChevronDown className={cn("h-4 w-4 transition-transform", esignOpen && "rotate-180")} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-5 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
                        {esignSubNav.map((sub) => (
                          <NavLink
                            key={sub.url}
                            to={sub.url}
                            end={sub.url === "/esign"}
                            className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                          >
                            <sub.icon className="h-3.5 w-3.5 shrink-0" />
                            <span>{sub.title}</span>
                          </NavLink>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">
            A
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Analyst</p>
              <p className="text-xs text-sidebar-foreground/60">SEBI Registered</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}