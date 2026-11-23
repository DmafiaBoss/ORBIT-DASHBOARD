import { useState } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  CalendarDays,
  Megaphone,
  MessageSquare,
  ShieldAlert,
  ArrowLeft,
  Search,
} from "lucide-react";
import { Link } from "react-router";
import "./Notifications.css";

const initialNotifications = [
  {
    id: 1,
    title: "New Announcement: School Fees Deadline",
    message: "Management has extended the payment deadline to November 30, 2026.",
    time: "10 mins ago",
    type: "announcement",
    read: false,
    link: "/announcements",
  },
  {
    id: 2,
    title: "Event Reminder: Tech Workshop",
    message: "Web Development hands-on session begins tomorrow at 10:00 AM in Main Hall.",
    time: "2 hours ago",
    type: "event",
    read: false,
    link: "/events",
  },
  {
    id: 3,
    title: "Community Mention",
    message: "Sarah Williams replied to your comment in Campus Life discussions.",
    time: "5 hours ago",
    type: "community",
    read: false,
    link: "/community",
  },
  {
    id: 4,
    title: "Campus WiFi Maintenance",
    message: "ICT department has completed router upgrades near the central library.",
    time: "1 day ago",
    type: "system",
    read: true,
    link: "/announcements",
  },
  {
    id: 5,
    title: "Upcoming Sports Day Registration",
    message: "Registration for inter-faculty games closes this Friday.",
    time: "2 days ago",
    type: "event",
    read: true,
    link: "/events",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case "event":
        return <CalendarDays size={20} color="#38bdf8" />;
      case "announcement":
        return <Megaphone size={20} color="#f87171" />;
      case "community":
        return <MessageSquare size={20} color="#c084fc" />;
      default:
        return <ShieldAlert size={20} color="#fbbf24" />;
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const filteredNotifications = notifications.filter((item) => {
    const matchesFilter =
      filter === "all" || (filter === "unread" && !item.read) || item.type === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="notifications-page">
      <header className="notifications-topbar">
        <div className="notifications-header-left">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="title-row">
            <div className="bell-badge-icon">
              <Bell size={24} color="#22D3EE" />
              {unreadCount > 0 && <span className="pulse-dot"></span>}
            </div>
            <div>
              <h1>Notifications</h1>
              <p>Stay informed about real-time campus events and notices</p>
            </div>
          </div>
        </div>

        <div className="notifications-actions">
          <button
            className="action-btn mark-read"
            onClick={markAllRead}
            disabled={unreadCount === 0}
          >
            <CheckCheck size={16} /> Mark all read
          </button>
          <button
            className="action-btn clear-btn"
            onClick={clearAll}
            disabled={notifications.length === 0}
          >
            <Trash2 size={16} /> Clear all
          </button>
        </div>
      </header>

      <div className="notifications-controls">
        <div className="notifications-tabs">
          {[
            { id: "all", label: "All" },
            { id: "unread", label: `Unread (${unreadCount})` },
            { id: "event", label: "Events" },
            { id: "announcement", label: "Announcements" },
            { id: "community", label: "Community" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`filter-tab ${filter === tab.id ? "active" : ""}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="notifications-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search alerts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`notification-card ${!n.read ? "unread" : ""}`}
            >
              <div className="notification-icon-wrapper">{getIcon(n.type)}</div>
              <div className="notification-details">
                <div className="notification-header">
                  <h3>{n.title}</h3>
                  <span className="notification-time">{n.time}</span>
                </div>
                <p className="notification-message">{n.message}</p>
                <div className="notification-card-actions">
                  <Link to={n.link} className="open-link">
                    View Details →
                  </Link>
                  <button
                    className="toggle-read-btn"
                    onClick={() => toggleRead(n.id)}
                  >
                    {n.read ? "Mark unread" : "Mark as read"}
                  </button>
                </div>
              </div>
              {!n.read && <span className="unread-dot"></span>}
            </div>
          ))
        ) : (
          <div className="notifications-empty">
            <Bell size={44} color="#64748b" />
            <h3>No notifications found</h3>
            <p>You're all caught up with your campus alerts!</p>
          </div>
        )}
      </div>
    </div>
  );
}
