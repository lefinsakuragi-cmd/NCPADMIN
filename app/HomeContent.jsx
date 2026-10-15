"use client";

import { useAuthStore } from "@/store/userStore";
import { useState } from "react";
import TaskOperator from "./components/TaskOperator";
import Auth from "./components/Auth";
import '@/app/styles/HomeContent.css'
import Link from "next/link";


function HomeContent() {
  const user = useAuthStore((state) => state.user);
  const [authModal, setAuthModal] = useState(null);

  if (!user) {
    return (
      <section className="homeContent">
        <div className="homeWrapper">
          <div className="homeContentBox">
            <img className="welcomeImage" src="/stopdong.jpeg" alt="Login Required" />
            <h1>Stop!!</h1>
            <p>Login dulu ya. baru boleh pake webnya</p>
            <button onClick={() => setAuthModal("login")} className="btn-login">Masuk Sekarang</button>
            {authModal && (
              <Auth
                mode={authModal}
                onClose={() => setAuthModal(null)}
              />
            )}
          </div>
        </div>
      </section>
    )
  }

  if (user.role === 'test') {
    return (
      <section className="homeContent">
        <div className="homeWrapper">
          <div className="homeHeadline">
            <h1>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>
            <p>NewCentral <span>Admin</span> — Login Sebagai <span>{user.username}</span>.</p>
          </div>
          <div className="homeContentBox">
            <img className="welcomeImage" src="/ncpLogo.jpeg" alt="Login Required" />
            <h1>selamat datang di newcentral admin - dashboard laporan</h1>
            <p>mau cek barang slow moving?? disini yah</p>
            <Link className="laporanBtn" href={'/laporan'}>ke halaman laporan</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="homeContent">
      <div className="homeWrapper">
        <div className="homeHeadline">
          <h1>Selamat Datang, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>
          <p>NewCentral <span>Admin</span> — Login Sebagai <span>{user.username}</span>.</p>
        </div>
        <div className="homeContentBox">
          <TaskOperator />
        </div>
      </div>
    </section>
  )
}

export default HomeContent