"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Auth from "./Auth";
import { useAuthStore } from "@/store/userStore";
import "../styles/Navbar.css";
import Link from "next/link";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    "Menu",
    ...(user?.role === "admin"
      ? ["Listing", "Laporan", "Pencapaian", "JBP"]
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
      {!isOpen && (
        <button
          type="button"
          className="sidebarOpenBtn"
          onClick={() => setIsOpen(true)}
          title="Tampilkan Navbar"
          aria-label="Tampilkan Navbar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      )}

      <nav className={`sidebar ${!isOpen ? "hidden" : ""}`}>
        <button
          type="button"
          className="sidebarCloseBtn"
          onClick={() => setIsOpen(false)}
          title="Sembunyikan Navbar"
          aria-label="Sembunyikan Navbar"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="sidebarHead">
          <img src="/ncpLogo.png" alt="logo" />
          <h1 className="navbar-brand">
            {user?.username.toUpperCase() || "NcpAdmin"}
          </h1>
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
                  <Link className="linkReset" href={"/"}>
                    Logout
                  </Link>
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

      {!user && showLogin && <Auth onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default Navbar;
