"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export default function AdminTopbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Use window.location.href to clear all client-side state on logout
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
<header className="admin-header">
  <div className="header-left">
    <h2>Admin Panel</h2>
    <span className="breadcrumb">Dashboard</span>
  </div>
  <div className="header-right">
    {/* SEARCH (optional) */}
    <input className="header-search" placeholder="Search..." />
    {/* USER */}
    {/* <div className="user-box">
      <div className="avatar">A</div>
      <span>Admin</span>
    </div> */}
    {/* LOGOUT */}
    <button className="btn btn-grad logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </div>
</header>
  );
}