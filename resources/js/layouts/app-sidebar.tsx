"use client"

import {
  IconChevronsUpDown,
  IconDashboard,
  IconDotsHorizontal,
  IconHashtag,
  IconPackage,
  IconPeople,
  IconPercent,
  IconPlus,
  IconSettings,
  IconShoppingBag,
  IconTruck,
} from "justd-icons"
// import { usePathname } from "next/navigation"
import { usePage } from "@inertiajs/react"

import { useEffect } from "react"
import {
  Menu,
  SidebarItem as NavigationItem,
  Sidebar,
  SidebarContent,
  SidebarDisclosure,
  SidebarDisclosurePanel,
  SidebarDisclosureTrigger,
  SidebarHeader,
  SidebarLabel,
  SidebarSection,
  SidebarSectionGroup,
  useSidebar,
} from "ui"
import { PagePropsData } from '@/types';

export default function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { auth } = usePage<PagePropsData>().props;

  const { setIsOpenOnMobile } = useSidebar()
  const pathname = usePage().url
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsOpenOnMobile(false)
  }, [pathname])
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Menu>
          <Menu.Trigger
            className="group flex cursor-pointer items-center justify-between rounded-lg border bg-bg px-2.5 py-2 sm:text-sm"
            aria-label="Profile"
          >
            <span className="flex flex-col">
              <span>{auth.user.name}</span>
              <span className="text-muted-fg text-xs">Personal workspace</span>
            </span>
            <IconChevronsUpDown />
          </Menu.Trigger>
          <Menu.Content
            selectionMode="single"
            defaultSelectedKeys={["personal"]}
            placement="bottom"
            className="sm:min-w-(--trigger-width)"
          >
            <Menu.Item id="personal">
              <Menu.Label>{auth.user.name}</Menu.Label>
            </Menu.Item>
            <Menu.Item id="acme">
              <Menu.Label>Acme Inc.</Menu.Label>
            </Menu.Item>
            <Menu.Item id="globex">
              <Menu.Label>Globex Ltd.</Menu.Label>
            </Menu.Item>
            <Menu.Item id="stark">
              <Menu.Label>Stark Industries</Menu.Label>
            </Menu.Item>
            <Menu.Item id="wayne">
              <Menu.Label>Wayne Enterprises</Menu.Label>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item href="#">
              <IconPlus /> <Menu.Label>Add New</Menu.Label>
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSectionGroup>
          {mainNavigations.map((navigation) => (
            <SidebarSection key={navigation.title}>
              {navigation.children?.map((child) => (
                <SidebarItem key={child.name} tooltip={child.name} href={child.path}>
                  {child.icon && <child.icon />}
                  <SidebarLabel>{child.name}</SidebarLabel>
                </SidebarItem>
              ))}
            </SidebarSection>
          ))}
          <SidebarSectionGroup>
            {navigations.map((navigation) => (
              <SidebarDisclosure
                key={navigation.title}
                defaultExpanded={
                  pathname.includes(navigation.path) || navigation.path === "management"
                }
              >
                <SidebarDisclosureTrigger>
                  {navigation.icon && <navigation.icon />}
                  <SidebarLabel>{navigation.title}</SidebarLabel>
                </SidebarDisclosureTrigger>
                <SidebarDisclosurePanel>
                  {navigation.children?.map((child) => (
                    <SidebarItem key={child.name} tooltip={child.name} href={child.path}>
                      {child.icon && <child.icon />}
                      <SidebarLabel>{child.name}</SidebarLabel>
                    </SidebarItem>
                  ))}
                </SidebarDisclosurePanel>
              </SidebarDisclosure>
            ))}
          </SidebarSectionGroup>
        </SidebarSectionGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function SidebarItem(props: React.ComponentProps<typeof NavigationItem>) {
  const pathname = usePage().url
  return <NavigationItem {...props} isCurrent={props.href === pathname} />
}

type NavigationItemProps = {
  name: string
  path: string
  icon?: React.ElementType
}

type NavigationGroupProps = {
  title: string
  path: string
  icon?: React.ElementType
  children?: NavigationItemProps[]
}

export const mainNavigations: NavigationGroupProps[] = [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: IconDashboard,
    children: [
      { name: "Overview", path: "/", icon: IconDashboard },
      { name: "Dashboard", path: "/dashboard", icon: IconShoppingBag },
      { name: "Data Mahasiswa", path: "/mahasiswa", icon: IconShoppingBag },
      { name: "Data Dosen", path: "/dosen", icon: IconShoppingBag },
      { name: "Roster Perkuliahan", path: "/roster", icon: IconShoppingBag },
      { name: "Kerja Praktik / PKL", path: "/pkl", icon: IconShoppingBag },
      { name: "Data SKPI", path: "/skpi", icon: IconShoppingBag },
      { name: "Data SKPI", path: "/skpi", icon: IconShoppingBag },
    ],
  },
]

export const navigations: NavigationGroupProps[] = [
  {
    title: "Tugas Akhir / Skripsi",
    path: "tugas-akhir",
    icon: IconSettings,
    children: [
      { name: "Pengajuan Judul", path: "/tugas-akhir/pengajuan-judul", icon: IconPeople },
      { name: "Daftar Seminar Proposal", path: "/tugas-akhir/seminar-proposal" },
      { name: "Daftar Seminar Hasil", path: "/tugas-akhir/seminar-hasil" },
      { name: "Daftar Sidang", path: "/tugas-akhir/sidang" },
      { name: "Bimbingan Skripsi", path: "/tugas-akhir/bimbinganc" },
    ],
  },
  {
    title: "Management",
    path: "management",
    icon: IconSettings,
    children: [
      { name: "Categories", path: "/management/categories", icon: IconHashtag },
      { name: "Customers", path: "/management/customers", icon: IconPeople },
      { name: "Brands", path: "/management/brands" },
    ],
  },
  {
    title: "More",
    path: "more",
    icon: IconDotsHorizontal,
    children: [
      { name: "Discounts", path: "/more/discounts", icon: IconPercent },
      { name: "Shipping", path: "/more/shipping", icon: IconTruck },
      { name: "Affiliates", path: "/more/affiliates" },
      { name: "Taxes", path: "/more/taxes" },
      { name: "Orders", path: "/orders", icon: IconShoppingBag },
      { name: "Products", path: "/products", icon: IconPackage },
      { name: "Organizations", path: "/organizations", icon: IconPackage },
      { name: "Sales Analytics", path: "/analytics" },
      { name: "Recent Activities", path: "/activities" },
    ],
  },
]
