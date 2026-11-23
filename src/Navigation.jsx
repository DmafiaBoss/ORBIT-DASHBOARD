import { useState } from "react";
import { NavLink, Link } from "react-router";
import {
  LayoutDashboard,
  CalendarDays,
  MapPin,
  Megaphone,
  UsersRound,
  Settings,
  LogOut,
  MoreHorizontal,
  X,
  Bell,
} from "lucide-react";

import "./Navigation.css";

function Navigation() {
  const [showMore, setShowMore] = useState(false);

  function handleLogout() {
    setShowMore(false);
    // Allow graceful fallback or redirect
    if (window.confirm("Are you sure you want to log out of ORBIT?")) {
      window.location.href = "https://orbit-mu-pink.vercel.app/";
    }
  }

  return (
    <aside className="sidebar">
      <Link to="/" className="Header" style={{ textDecoration: "none" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          color="#22D3EE"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="currentColor" d="M2 7v1l11 4l9-4V7L11 4z" />
          <path
            fill="currentColor"
            d="M4 11v4.267c0 1.621 4.001 3.893 9 3.734c4-.126 6.586-1.972 7-3.467q.037-.133.037-.268V11L13 14l-5-1.667v3.213l-1-.364V12z"
          />
        </svg>

        <h2>ORBIT</h2>
      </Link>

      <div className="line"></div>

      <p className="menu-title">MENU</p>

      <nav className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <CalendarDays size={20} />
          <span>Events</span>
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <MapPin size={20} />
          <span>Campus Map</span>
        </NavLink>

        {/* Desktop navigation */}
        <NavLink
          to="/announcements"
          className={({ isActive }) => `desktop-only-link ${isActive ? "active" : ""}`}
        >
          <Megaphone size={20} />
          <span>Announcements</span>
        </NavLink>

        <NavLink
          to="/community"
          className={({ isActive }) => `desktop-only-link ${isActive ? "active" : ""}`}
        >
          <UsersRound size={20} />
          <span>Community</span>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) => `desktop-only-link ${isActive ? "active" : ""}`}
        >
          <Bell size={20} />
          <span>Notifications</span>
        </NavLink>

        {/* Mobile More menu */}
        <div className="mobile-more-wrap">
          <button
            className="mobile-more-button"
            onClick={() => setShowMore(!showMore)}
            type="button"
          >
            {showMore ? <X size={20} /> : <MoreHorizontal size={20} />}
            <span>More</span>
          </button>

          {showMore && (
            <div className="mobile-more-menu">
              <NavLink to="/announcements" onClick={() => setShowMore(false)}>
                <Megaphone size={19} />
                <span>Announcements</span>
              </NavLink>

              <NavLink to="/community" onClick={() => setShowMore(false)}>
                <UsersRound size={19} />
                <span>Community</span>
              </NavLink>

              <NavLink to="/notifications" onClick={() => setShowMore(false)}>
                <Bell size={19} />
                <span>Notifications</span>
              </NavLink>

              <NavLink to="/settings" onClick={() => setShowMore(false)}>
                <Settings size={19} />
                <span>Settings</span>
              </NavLink>

              <button type="button" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Desktop Settings and Logout */}
      <div className="sidebar-bottom">
        <div className="line"></div>

        <NavLink
          to="/settings"
          className={({ isActive }) => `sidebar-action ${isActive ? "active" : ""}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

        <button
          type="button"
          className="sidebar-action logout-action"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Navigation;
