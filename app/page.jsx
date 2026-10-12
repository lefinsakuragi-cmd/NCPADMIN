import Navbar from './components/Navbar'
import HomeContent from './api/HomeContent';
import TaskManager from './components/TaskManager';

function Page() {
  return (
    <main className="app-layout">
      <Navbar />
      <div className="page-content">
        <HomeContent />
        <TaskManager />
      </div>
    </main>
  );
}

export default Page;
