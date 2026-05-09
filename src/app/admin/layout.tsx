"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import AdminTopbar from "@/components/AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AdminGuard>
      <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* MAIN */}
      <div className={`admin-main ${collapsed ? "collapsed" : ""}`}>

        {/* HEADER */}
        <AdminTopbar />

        {/* CONTENT */}
        <div className="admin-content">
          {children}
        </div>

      </div>

    </div>
  </AdminGuard>
  );
}