import logo from './logo.svg'
import './App.css';
import LandingPage from './pages/LandingPage';
import AfterRegis from './pages/AfterRegis';
import AdminDashboard from './pages/AdminDashboard';
import GantiWebinar from './pages/GantiWebinar';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>} />
          <Route path="/after-regis/:webinarId" element={<AfterRegis />} />
          <Route path="/ganti-webinar" element={<GantiWebinar />} />
          <Route path="/admin-webinar456" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
