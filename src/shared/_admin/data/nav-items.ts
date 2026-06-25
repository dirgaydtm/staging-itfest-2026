import { NavItem } from "../type/nav-item";

export const navItems: NavItem[] = [
  {
    title: "Information",
    path: "/mangujo/admin/dashboard",
    icon: "dashboard",
    allowedRoles: [1], // Only main Admin
  },
  {
    title: "Team List",
    path: "/mangujo/admin/team-list",
    icon: "people",
    allowedRoles: [1, 3, 4, 5], // All admin roles
  },
  {
    title: "Announcement",
    path: "/mangujo/admin/announcement",
    icon: "event",
    allowedRoles: [1], // Only main Admin
  },
];
