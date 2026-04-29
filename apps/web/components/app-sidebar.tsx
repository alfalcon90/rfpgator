"use client"

import * as React from "react"

import { NavUser } from "@workspace/ui/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { HomeIcon, InboxIcon, StarIcon, SquareX } from "lucide-react"

const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: <HomeIcon />,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: <InboxIcon />,
      isActive: false,
    },
    {
      title: "Saved",
      url: "#",
      icon: <StarIcon />,
      isActive: false,
    },
    {
      title: "Ignored",
      url: "#",
      icon: <SquareX />,
      isActive: false,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 h-svh w-[68px] shrink-0 border-r-0 bg-brand shadow-[1px_4px_16px_0_rgba(255,161,38,0.65)]"
      {...props}
    >
      <SidebarHeader className="flex h-16 items-center justify-center p-0">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            <SidebarMenuButton
              size="lg"
              className="justify-center hover:bg-white/10 active:bg-gray-900/20 md:h-8 md:p-0"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-brand">
                <div className="size-4 rounded-sm bg-brand" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu className="gap-2">
              {data.navMain.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="flex items-center justify-center"
                >
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    onClick={() => setActiveItem(item)}
                    isActive={activeItem?.title === item.title}
                    className="h-10 w-10 justify-center rounded-md px-0 text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 data-active:bg-black data-active:text-brand"
                  >
                    {item.icon}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-center p-2">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
