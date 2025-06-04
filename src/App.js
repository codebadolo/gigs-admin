import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DashboardPage from "./pages/DashboardPage";
import GigsDetailPage from "./pages/GigsDetailPage";
import GigsPage from "./pages/GigsPage";
import OrderPage from "./pages/OrderPage";
function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className={`main-content${collapsed ? " collapsed" : ""}`}>
     <TopBar collapsed={collapsed} />


        <div className="page-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/gigs" element={<GigsPage collapsed={collapsed} />} />
<Route path="/gigs/:id" element={<GigsDetailPage collapsed={collapsed} />} />
            <Route path="/orders" element={<OrderPage />} />
            {/* Autres routes */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
