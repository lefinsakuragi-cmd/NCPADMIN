'use client'
import Navbar from './components/Navbar'
import HomeContent from './HomeContent';
import TaskManager from './components/TaskManager';
import { useAuthStore } from '@/store/userStore'

function Page() {
  const user = useAuthStore((state) => state.user);
  return (
    <main className="app-layout">
      <Navbar />
      <div className="page-content">
        <HomeContent />
        {user?.role === "admin" || user?.role === "user" || !user ? <TaskManager /> : null}
      </div>
    </main>
  );
}

export default Page;
