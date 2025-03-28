import { Home, BarChart, Settings, HelpCircle, MessageCircleQuestion, ScrollText } from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

interface SidebarProps {
  setOpenDialog: (open: boolean) => void;
}

export function AppSidebar({ setOpenDialog }: SidebarProps) {  
  return (
    <Sidebar collapsible="icon" className="border-r mt-[65px] font-montserrat">
      <SidebarContent className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="mt-2" asChild>
              <Link href="/">
                <Home className="ml-2"/>
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <BarChart className="ml-2"/>
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard?page=question">
                <ScrollText className="ml-2"/>
                <span>Question log</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard?page=help">
                <HelpCircle className="ml-2"/>
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard?page=settings">
                <Settings className="ml-2"/>
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild >
              <div onClick={() => setOpenDialog(true)} className="cursor-pointer">
                <MessageCircleQuestion className="ml-2 "/>
                <span>Start Interview</span>
                </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

