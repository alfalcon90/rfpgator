import { AppSidebar } from "@/components/app-sidebar"
import { RfpListPage } from "@/components/rfp-list-page"
import { SidebarProvider } from "@workspace/ui/components/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <RfpListPage />
    </SidebarProvider>
  )
}
