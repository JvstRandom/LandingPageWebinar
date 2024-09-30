import logo from './logo.svg'
import './App.css';
import LandingPage from './pages/LandingPage';
import AfterRegis from './pages/AfterRegis';
import AdminDashboard from './pages/AdminDashboard';
import GantiWebinar from './pages/GantiWebinar';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //       ok
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage/>} />
          <Route path="/after-regis" element={<AfterRegis />} />
          <Route path="/ganti-webinar" element={<GantiWebinar />} />
          <Route path="/admin-webinar456" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
