
import { useState } from "react";
import {
  Search,
  Bell,
  Megaphone,
  CreditCard,
  BookOpen,
  Wifi,
  ShieldAlert,
  CalendarDays,
  Clock3,
  Pin,
  CheckCheck,
  ChevronRight,
  X,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router";
import "./Announcements.css";

const initialAnnouncements = [
  {
    id: 1,
    title: "School Fees Deadline Extended",
    description:
      "The management has officially extended the deadline for payment of school fees. All students are advised to complete their payments before the new deadline.",
    category: "Payment",
    date: "November 11, 2026",
    time: "2 hours ago",
    icon: CreditCard,
    important: true,
    read: false,
    author: "Finance Department",
  },
  {
    id: 2,
    title: "New Library Operating Hours",
    description:
      "The university library will now remain open until 10:00 PM daily to give students more time to study and complete their academic work.",
    category: "Academic",
    date: "November 11, 2026",
    time: "5 hours ago",
    icon: BookOpen,
    important: false,
    read: false,
    author: "Library Management",
  },
  {
    id: 3,
    title: "Campus WiFi Upgrade",
    description:
      "The campus network infrastructure is being upgraded to provide faster and more reliable internet access across selected areas of the university.",
    category: "Technology",
    date: "November 10, 2026",
    time: "Yesterday",
    icon: Wifi,
    important: false,
    read: false,
    author: "ICT Department",
  },
  {
    id: 4,
    title: "Important: Student ID Renewal",
    description:
      "Students with expired or damaged identification cards should visit the student affairs office to begin their renewal process.",
    category: "General",
    date: "November 9, 2026",
    time: "2 days ago",
    icon: ShieldAlert,
    important: true,
    read: true,
    author: "Student Affairs",
  },
  {
    id: 5,
    title: "Upcoming Examination Schedule",
    description:
      "The provisional examination timetable for the current semester will be published soon. Students should check the academic portal for updates.",
    category: "Academic",
    date: "November 8, 2026",
    time: "3 days ago",
    icon: CalendarDays,
    important: false,
    read: true,
    author: "Academic Office",
  },
  {
    id: 6,
    title: "Campus Maintenance Notice",
    description:
      "Maintenance work will take place around the central campus facilities. Some areas may experience temporary interruptions.",
    category: "General",
    date: "November 7, 2026",
    time: "4 days ago",
    icon: ShieldAlert,
    important: false,
    read: true,
    author: "Campus Administration",
  },
];

const categories = [
  "All",
  "Academic",
  "Payment",
  "Technology",
  "General",
];

function Announcements() {
  const [announcements, setAnnouncements] = useState(
    initialAnnouncements
  );
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(null);

  const unreadCount = announcements.filter(
    (item) => !item.read
  ).length;

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" ||
      item.category === activeCategory;

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Unread" && !item.read) ||
      (activeFilter === "Important" && item.important);

    return matchesSearch && matchesCategory && matchesFilter;
  });

  const toggleRead = (id) => {
    setAnnouncements((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, read: !item.read } : item
      )
    );
  };

  const markAllRead = () => {
    setAnnouncements((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
  };

  const openAnnouncement = (item) => {
    setSelectedAnnouncement(item);

    setAnnouncements((previous) =>
      previous.map((announcement) =>
        announcement.id === item.id
          ? { ...announcement, read: true }
          : announcement
      )
    );
  };

  return (
    <div className="announcements-page">
      {/* TOPBAR */}
      <header className="announcement-topbar">
        <div className="announcement-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Link
          to="/notifications"
          className="announcement-notification"
        >
          <Bell size={21} />
          {unreadCount > 0 && (
            <span>{unreadCount}</span>
          )}
        </Link>

        <div className="announcement-avatar">OE</div>
        <p className="announcement-profile-name">Olivia Emma</p>
      </header>

      {/* PAGE INTRO */}
      <section className="announcement-heading">
        <div>
          <Link to="/" className="announcement-back">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>

          <div className="announcement-title-row">
            <div className="announcement-title-icon">
              <Megaphone size={27} />
            </div>

            <div>
              <h1>Announcements</h1>
              <p>
                Stay updated with everything happening around your campus.
              </p>
            </div>
          </div>
        </div>

        <button
          className="mark-all-button"
          onClick={markAllRead}
          disabled={unreadCount === 0}
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </section>

      {/* STATS */}
      <section className="announcement-stats">
        <div className="announcement-stat-card">
          <div className="stat-icon total-icon">
            <Megaphone size={22} />
          </div>
          <div>
            <h2>{announcements.length}</h2>
            <p>Total Announcements</p>
          </div>
        </div>

        <div className="announcement-stat-card">
          <div className="stat-icon unread-icon">
            <Bell size={22} />
          </div>
          <div>
            <h2>{unreadCount}</h2>
            <p>Unread Updates</p>
          </div>
        </div>

        <div className="announcement-stat-card">
          <div className="stat-icon important-icon">
            <Pin size={22} />
          </div>
          <div>
            <h2>
              {announcements.filter((item) => item.important).length}
            </h2>
            <p>Important Notices</p>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="announcement-controls">
        <div className="announcement-filter-tabs">
          {["All", "Unread", "Important"].map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter ? "active-filter" : ""
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="announcement-category-filter">
          <span>Category:</span>

          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ANNOUNCEMENT LIST */}
      <section className="announcement-list-section">
        <div className="announcement-list-heading">
          <div>
            <h2>Latest Updates</h2>
            <p>
              {filteredAnnouncements.length} announcements found
            </p>
          </div>
        </div>

        <div className="announcement-list">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className={`announcement-item ${
                    !item.read ? "unread-announcement" : ""
                  }`}
                  key={item.id}
                >
                  <div className={`announcement-item-icon ${item.category.toLowerCase()}`}>
                    <Icon size={23} />
                  </div>

                  <div className="announcement-item-content">
                    <div className="announcement-item-meta">
                      <span className={`announcement-tag ${item.category.toLowerCase()}`}>
                        {item.category}
                      </span>

                      {item.important && (
                        <span className="important-tag">
                          <Pin size={12} />
                          Important
                        </span>
                      )}

                      {!item.read && (
                        <span className="new-tag">NEW</span>
                      )}
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <div className="announcement-item-footer">
                      <span>{item.author}</span>
                      <span className="announcement-time">
                        <Clock3 size={13} />
                        {item.time}
                      </span>
                    </div>
                  </div>

                  <div className="announcement-item-actions">
                    <button
                      className="read-toggle"
                      onClick={() => toggleRead(item.id)}
                    >
                      {item.read ? "Mark unread" : "Mark read"}
                    </button>

                    <button
                      className="announcement-open"
                      onClick={() => openAnnouncement(item)}
                      aria-label={`Read ${item.title}`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="announcement-empty">
              <Megaphone size={38} />
              <h3>No announcements found</h3>
              <p>
                Try changing your search or selected filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                  setActiveFilter("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ANNOUNCEMENT DETAILS */}
      {selectedAnnouncement && (
        <div
          className="announcement-modal-overlay"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            className="announcement-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="announcement-modal-close"
              onClick={() => setSelectedAnnouncement(null)}
            >
              <X size={21} />
            </button>

            <span className="modal-category">
              {selectedAnnouncement.category}
            </span>

            {selectedAnnouncement.important && (
              <span className="modal-important">
                <Pin size={13} /> Important Notice
              </span>
            )}

            <h2>{selectedAnnouncement.title}</h2>

            <div className="modal-meta">
              <span>{selectedAnnouncement.author}</span>
              <span>{selectedAnnouncement.date}</span>
            </div>

            <div className="modal-divider" />

            <p className="modal-description">
              {selectedAnnouncement.description}
            </p>

            <div className="modal-footer">
              <Clock3 size={15} />
              {selectedAnnouncement.time}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Announcements;
