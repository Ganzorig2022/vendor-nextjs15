import { BarChart2, Calendar, Inbox } from 'lucide-react'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import Image from 'next/image'

// Menu items.
const items = [
  {
    title: 'Дашбоард',
    url: '/dashboard',
    icon: BarChart2,
  },
  {
    title: 'Mерчант',
    url: 'merchant',
    icon: Inbox,
  },
  {
    title: 'Карт',
    url: '#',
    icon: Calendar,
    items: [
      {
        title: 'Картын гүйлгээ',
        url: 'card-transaction',
        isActive: false,
      },
      {
        title: 'Картын тайлан',
        url: 'card-report',
        isActive: false,
      },
    ],
  },
  {
    title: 'Данс',
    url: '#',
    icon: Calendar,
    items: [
      {
        title: 'Дансны гүйлгээ',
        url: 'p2p-transaction',
        isActive: false,
      },
      {
        title: 'Дансны тайлан',
        url: 'p2p-report',
        isActive: false,
      },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Image
            src={'/logo.svg'}
            width={150}
            height={100}
            quality={100}
            alt="Qpay logo"
            priority
            className="mx-auto my-3"
          />
          {/* <SidebarGroupLabel>
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="font-medium text-base!">
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={item.isActive}
                          >
                            <a href={item.url} className="text-base!">
                              {item.title}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
