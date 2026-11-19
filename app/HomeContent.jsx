"use client";

import { useAuthStore } from "@/store/userStore";
import '@/app/styles/HomeContent.css'
import NotLogin from "./NotLogin";


function HomeContent() {
  const user = useAuthStore((state) => state.user);


  if (!user) {
    return <NotLogin />
  }

  return (
    <section className="homeContent">
      <div className="homeWrapper">
        <div className="homeHeadline">
          <h1>Selamat Datang, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>
          <p>NewCentral <span>Admin</span> — Login Sebagai <span>{user.username}</span>.</p>
        </div>
        <div className="homeContentBox">
        </div>
      </div>
    </section>
  )
}

export default HomeContent