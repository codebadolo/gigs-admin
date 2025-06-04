import {
    MdChevronLeft,
    MdDashboard,
    MdMenu,
    MdPayment,
    MdPeople,
    MdRateReview,
    MdShoppingCart,
    MdWork,
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ collapsed, onToggle }) {
  const { pathname } = useLocation();

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
        {collapsed ? <MdMenu /> : <MdChevronLeft />}
      </button>

      {!collapsed && (
        <div className="sidebar-header">
          <img
            src="https://ui-avatars.com/api/?name=MyProject&background=003366&color=fff"
            alt="MyProject"
            className="sidebar-avatar"
          />
          <div className="sidebar-title">MyProject</div>
        </div>
      )}

      <nav>
        <Link to="/" className={pathname === "/" ? "active" : ""}>
          <MdDashboard className="icon" /> {!collapsed && "Dashboard"}
        </Link>
        <Link to="/gigs" className={pathname === "/gigs" ? "active" : ""}>
          <MdWork className="icon" /> {!collapsed && "Gigs"}
        </Link>
        <Link to="/orders" className={pathname === "/orders" ? "active" : ""}>
          <MdShoppingCart className="icon" /> {!collapsed && "Orders"}
        </Link>
        <Link to="/payments" className={pathname === "/payments" ? "active" : ""}>
          <MdPayment className="icon" /> {!collapsed && "Payments"}
        </Link>
        <Link to="/reviews" className={pathname === "/reviews" ? "active" : ""}>
          <MdRateReview className="icon" /> {!collapsed && "Reviews"}
        </Link>
        <Link to="/users" className={pathname === "/users" ? "active" : ""}>
          <MdPeople className="icon" /> {!collapsed && "Users"}
        </Link>
      </nav>
    </aside>
  );
}
