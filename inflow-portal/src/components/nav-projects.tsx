
import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
  } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar"
import { HistoryMenu } from './history/history-menu';

const projects_mock = [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
];

const projects: any[] = [];

export async function NavProjects() {
    const { isMobile } = {isMobile: false};//useSidebar()

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                        <a href={item.url}>
                            <item.icon />
                            <span>{item.name}</span>
                        </a>
                        </SidebarMenuButton>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuAction showOnHover>
                            <MoreHorizontal />
                            <span className="sr-only">More</span>
                            </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-48"
                            side={isMobile ? "bottom" : "right"}
                            align={isMobile ? "end" : "start"}
                        >
                            <DropdownMenuItem>
                            <Folder className="text-muted-foreground" />
                            <span>View Project</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                            <Share className="text-muted-foreground" />
                            <span>Share Project</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                            <Trash2 className="text-muted-foreground" />
                            <span>Delete Project</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
                <HistoryMenu />
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <MoreHorizontal />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}
