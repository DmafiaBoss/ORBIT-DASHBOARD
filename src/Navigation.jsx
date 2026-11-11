
import { useState } from "react";
import { Link } from "react-router";

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
} from "lucide-react";

import "./Navigation.css";

function Navigation() {
  const [showMore, setShowMore] = useState(false);

  function handleLogout() {
    setShowMore(false);
    window.location.href = "https://orbit-mu-pink.vercel.app/";
  }

  return (
    <aside className="sidebar">
      <div className="Header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
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
      </div>

      <div className="line"></div>

      <p className="menu-title">MENU</p>

      <nav className="nav-links">
        <Link to="/">
          <LayoutDashboard size={22} />
          <span>Home</span>
        </Link>

        <Link to="/events">
          <CalendarDays size={22} />
          <span>Events</span>
        </Link>

        <Link to="/explore">
          <MapPin size={22} />
          <span>Explore</span>
        </Link>

        {/* Desktop navigation */}
        <Link to="/Announcements" className="desktop-only-link">
          <Megaphone size={22} />
          <span>Announcements</span>
        </Link>

        <Link to="/Community" className="desktop-only-link">
          <UsersRound size={22} />
          <span>Community</span>
        </Link>

        {/* Mobile More menu */}
        <div className="mobile-more-wrap">
          <button
            className="mobile-more-button"
            onClick={() => setShowMore(!showMore)}
            type="button"
          >
            {showMore ? <X size={22} /> : <MoreHorizontal size={22} />}
            <span>More</span>
          </button>

          {showMore && (
            <div className="mobile-more-menu">
              <Link to="/Announcements" onClick={() => setShowMore(false)}>
                <Megaphone size={19} />
                <span>Announcements</span>
              </Link>

              <Link to="/Community" onClick={() => setShowMore(false)}>
                <UsersRound size={19} />
                <span>Community</span>
              </Link>

              <Link to="/Settings" onClick={() => setShowMore(false)}>
                <Settings size={19} />
                <span>Settings</span>
              </Link>

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

        <Link to="/Settings" className="sidebar-action">
          <Settings size={20} />
          <span>Settings</span>
        </Link>

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

