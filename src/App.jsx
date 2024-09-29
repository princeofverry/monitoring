import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Circular from './components/circular';
import Footer from './components/footer';
import Navbar from './components/navbar';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <>
      <div className="relative w-screen overflow-hidden">
        <div className="absolute inset-0 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_-50%,#c7d2fe_40%,transparent_100%)] dark:[background:radial-gradient(125%_125%_at_50%_-50%,#6366f136_40%,transparent_100%)]"></div>
        <Router> {/* Tambahkan Router di sini */}
          <Navbar />
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Circular />} />
              <Route path="/aterkia" element={<AdminPage />} /> {/* Route Admin */}
            </Routes>
          </div>
          <Footer />
        </Router> {/* Akhiri Router di sini */}
      </div>
    </>
  );
}

export default App;
