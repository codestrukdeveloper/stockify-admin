import {
  IconHome,
  IconPoint,
  IconApps,
  IconClipboard,
  IconFileDescription,
  IconBorderAll,
  IconZoomCode,
  IconRotate,
  IconUserPlus,
  IconLogin,
  IconAlertCircle,
  IconSettings,
  IconAppWindow,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/dashboards/",
    children: [
      {
        id: uniqueId(),
        title: "Modern",
        icon: IconPoint,
        href: "/",
        chip: "New",
        chipColor: "secondary",
      },
      {
        id: uniqueId(),
        title: "eCommerce",
        icon: IconPoint,
        href: "/dashboards/ecommerce",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Frontend pages",
    icon: IconAppWindow,
    href: "/frontend-pages/",
    children: [
      {
        id: uniqueId(),
        title: "Homepage",
        icon: IconPoint,
        href: "/frontend-pages/homepage",
      },
      {
        id: uniqueId(),
        title: "About Us",
        icon: IconPoint,
        href: "/frontend-pages/about",
      },
      {
        id: uniqueId(),
        title: "Blog",
        icon: IconPoint,
        href: "/frontend-pages/blog",
      },
      {
        id: uniqueId(),
        title: "Blog Details",
        icon: IconPoint,
        href: "/frontend-pages/blog/Blog_1",
      },
      {
        id: uniqueId(),
        title: "Portfolio",
        icon: IconPoint,
        href: "/frontend-pages/portfolio",
      },
      {
        id: uniqueId(),
        title: "Pricing",
        icon: IconPoint,
        href: "/frontend-pages/pricing",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Apps",
    icon: IconApps,
    href: "/apps/",
    children: [
      {
        id: uniqueId(),
        title: "User Profile",
        icon: IconPoint,
        href: "/user-profile",
        children: [
          {
            id: uniqueId(),
            title: "Profile",
            icon: IconPoint,
            href: "/apps/user-profile/profile",
          },
          {
            id: uniqueId(),
            title: "Followers",
            icon: IconPoint,
            href: "/apps/user-profile/followers",
          },
          {
            id: uniqueId(),
            title: "Friends",
            icon: IconPoint,
            href: "/apps/user-profile/friends",
          },
          {
            id: uniqueId(),
            title: "Gallery",
            icon: IconPoint,
            href: "/apps/user-profile/gallery",
          },
        ],
      },
    ]
  },
  {
    id: uniqueId(),
    title: "Pages",
    icon: IconClipboard,
    href: "/ui-components/",
    children: [
      {
        id: uniqueId(),
        title: "Auth",
        icon: IconPoint,
        href: "/400",
        children: [
          {
            id: uniqueId(),
            title: "Error",
            icon: IconAlertCircle,
            href: "/400",
          },
          {
            id: uniqueId(),
            title: "Maintenance",
            icon: IconSettings,
            href: "/auth/maintenance",
          },
          {
            id: uniqueId(),
            title: "Login",
            icon: IconLogin,
            href: "/auth/auth1/login",
            children: [
              {
                id: uniqueId(),
                title: "Side Login",
                icon: IconPoint,
                href: "/auth/auth1/login",
              },
              {
                id: uniqueId(),
                title: "Boxed Login",
                icon: IconPoint,
                href: "/auth/auth2/login",
              },
            ],
          },
          {
            id: uniqueId(),
            title: "Register",
            icon: IconUserPlus,
            href: "/auth/auth1/register",
            children: [
              {
                id: uniqueId(),
                title: "Side Register",
                icon: IconPoint,
                href: "/auth/auth1/register",
              },
              {
                id: uniqueId(),
                title: "Boxed Register",
                icon: IconPoint,
                href: "/auth/auth2/register",
              },
            ],
          },
          {
            id: uniqueId(),
            title: "Forgot Password",
            icon: IconRotate,
            href: "/auth/auth1/forgot-password",
            children: [
              {
                id: uniqueId(),
                title: "Side Forgot Password",
                icon: IconPoint,
                href: "/auth/auth1/forgot-password",
              },
              {
                id: uniqueId(),
                title: "Boxed Forgot Password",
                icon: IconPoint,
                href: "/auth/auth2/forgot-password",
              },
            ],
          },
          {
            id: uniqueId(),
            title: "Two Steps",
            icon: IconZoomCode,
            href: "/auth/auth1/two-steps",
            children: [
              {
                id: uniqueId(),
                title: "Side Two Steps",
                icon: IconPoint,
                href: "/auth/auth1/two-steps",
              },
              {
                id: uniqueId(),
                title: "Boxed Two Steps",
                icon: IconPoint,
                href: "/auth/auth2/two-steps",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Forms",
    icon: IconFileDescription,
    href: "/forms/form-elements/autocomplete",
    children: [
      {
        id: uniqueId(),
        title: "Form Elements",
        icon: IconPoint,
        href: "/forms/form-elements/autocomplete",
        children: [
          {
            id: uniqueId(),
            title: "Autocomplete",
            icon: IconPoint,
            href: "/forms/form-elements/autocomplete",
          },
          {
            id: uniqueId(),
            title: "Button",
            icon: IconPoint,
            href: "/forms/form-elements/button",
          },
          {
            id: uniqueId(),
            title: "Radio",
            icon: IconPoint,
            href: "/forms/form-elements/radio",
          },
          {
            id: uniqueId(),
            title: "Date Time",
            icon: IconPoint,
            href: "/forms/form-elements/date-time",
          },
          {
            id: uniqueId(),
            title: "Slider",
            icon: IconPoint,
            href: "/forms/form-elements/slider",
          },
          {
            id: uniqueId(),
            title: "Switch",
            icon: IconPoint,
            href: "/forms/form-elements/switch",
          },
        ],
      },
      {
        id: uniqueId(),
        title: "Form Layout",
        icon: IconPoint,
        href: "/forms/form-layout",
      },
      {
        id: uniqueId(),
        title: "Form Horizontal",
        icon: IconPoint,
        href: "/forms/form-horizontal",
      },
      {
        id: uniqueId(),
        title: "Form Vertical",
        icon: IconPoint,
        href: "/forms/form-vertical",
      },
      {
        id: uniqueId(),
        title: "Form Custom",
        icon: IconPoint,
        href: "/forms/form-custom",
      },
      {
        id: uniqueId(),
        title: "Form Wizard",
        icon: IconPoint,
        href: "/forms/form-wizard",
      },
      {
        id: uniqueId(),
        title: "Form Validation",
        icon: IconPoint,
        href: "/forms/form-validation",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Tables",
    icon: IconBorderAll,
    href: "/tables/",
    children: [
    ],
  },
];
export default Menuitems;
