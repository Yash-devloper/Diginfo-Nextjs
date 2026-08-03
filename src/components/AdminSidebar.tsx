"use client";

import { type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  LayoutDashboard,
  FileText,
  List,
  Users,
  IndianRupee,
  Search,
  Menu,
  BriefcaseBusiness,
  BarChart3,
} from "lucide-react";

type AdminSidebarProps = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

export default function AdminSidebar({ collapsed, setCollapsed }: AdminSidebarProps) {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    // { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Create Blog", href: "/admin/blogs", icon: FileText },
    { name: "All Blogs", href: "/admin/blogs/list", icon: List },
    { name: "Careers", href: "/admin/careers", icon: BriefcaseBusiness },
    { name: "Leads", href: "/admin/leads", icon: Users },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Pricing", href: "/admin/pricing", icon: IndianRupee },
    { name: "Testimonials", href: "/admin/testimonials", icon: Search },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* TOP */}
      <div className="sidebar-top">

        {/* LOGO */}
        <div className="sidebar-logo">
          {!collapsed && (
            <Image src="/logo.png" alt="logo" width={120} height={40} />
          )}
        </div>

        {/* TOGGLE */}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={18} />
        </button>

      </div>

      {/* MENU */}
      <nav className="sidebar-nav">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />

              {!collapsed && <span>{item.name}</span>}

              {/* TOOLTIP */}
              {collapsed && (
                <span className="tooltip">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
