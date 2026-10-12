"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Auth from "./Auth";
import { useAuthStore } from "@/store/userStore";
import "../styles/Navbar.css";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    "Menu",
    ...(user?.role === "admin"
      ? ["Listing", "Laporan", "Pencapaian"]
      : user
        ? ["Laporan"]
        : []),
  ];

  const getPath = (item) => {
    return item === "Menu" ? "/" : `/${item.toLowerCase()}`;
  };

  const handleNavigation = (item) => {
    const targetPath = getPath(item);
    router.push(targetPath);
  };

  return (
    <>
      <nav className="sidebar">
        <div className="sidebarHead">
          <img src="/ncpLogo.jpeg" alt="logo" />
          <h1 className="navbar-brand">NcpAdmin</h1>
        </div>

        <div className="navlinks">
          <ul>
            {menuItems.map((item) => {
              const targetPath = getPath(item);
              const isActive =
                item === "Menu"
                  ? pathname === "/"
                  : pathname.startsWith(targetPath);

              return (
                <li key={item}>
                  <button
                    type="button"
                    className={`navBtn ${isActive ? "active" : ""}`}
                    onClick={() => handleNavigation(item)}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="authButtons">
          <ul>
            <li>
              {user ? (
                <button type="button" onClick={logout}>
                  Logout
                </button>
              ) : (
                <button type="button" onClick={() => setShowLogin(true)}>
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {!user && showLogin && (
        <Auth onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}

export default Navbar;
