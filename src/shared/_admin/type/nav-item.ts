export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  children?: NavItem[];
  disabled?: boolean;
  external?: boolean;
  allowedRoles?: number[]; // Role IDs that can access this menu
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export type NavItems = NavItem[];
