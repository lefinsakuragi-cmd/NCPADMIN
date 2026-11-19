import Navbar from './components/Navbar'
import HomeContent from './HomeContent';

function Page() {
  return (
    <main className="app-layout">
      <Navbar />
      <div className="page-content">
        <HomeContent />
      </div>
    </main>
  );
}

export default Page;
