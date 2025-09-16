import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react"

export const routes = {
  dashboard: {
    dashboard: "/dashboard",
  },
  signIn: "/",
  profile: "/dashboard/profile",
  category: {
    categories: "/categories",
    singleCategory: (slug: string) => `/categories/${slug}`,
  },
  company: {
    companies: "/companies",
    singleCompany: (slug: string) => `/companies/${slug}`,
  },
}

export const menuItems = {
  user: {
    name: "სახელი გვარი",
    email: "info@telecomm1.com",
    avatar: "https://ui.shadcn.com/avatars/02.png",
  },

  dashboard: {
    title: "მთავარი გვერდი",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
  },
  teams: [
    {
      name: "კომპანია 1",
      logo: GalleryVerticalEnd,
      plan: "404 404 404",
    },
    {
      name: "კომპანია 2",
      logo: AudioWaveform,
      plan: "404 404 404",
    },
    {
      name: "კომპანია 3",
      logo: Command,
      plan: "404 404 404",
    },
  ],

  navMain: [
    {
      title: "პარამეტრები",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: 'Design Engineering',
  //     url: '#',
  //     icon: Frame,
  //   },
  //   {
  //     name: 'Sales & Marketing',
  //     url: '#',
  //     icon: PieChart,
  //   },
  //   {
  //     name: 'Travel',
  //     url: '#',
  //     icon: Map,
  //   },
  // ],
}
