import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Bell,
  GraduationCap,
  Megaphone,
  CalendarDays,
  UsersRound,
  Clock,
  BookOpen,
  X,
  Wifi,
  Bus,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useCampus } from "../context/CampusContext";
import "./Dashboard.css";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const { profile, enrolledCourses, rsvps, pinnedAnnouncements } = useCampus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!showCoursesModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowCoursesModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showCoursesModal]);

  const rsvpCount = Object.values(rsvps).filter(Boolean).length;
  const pinnedCount = Object.values(pinnedAnnouncements).filter(Boolean).length;

  const events = [
    {
      id: "1",
      dateMonth: "NOV",
      dateDay: "15",
      title: "Tech Workshop: Web Development",
      time: "10:00 AM - 12:00 PM",
      category: "Technical",
    },
    {
      id: "2",
      dateMonth: "NOV",
      dateDay: "18",
      title: "Campus Sports Day",
      time: "9:00 AM - 5:00 PM",
      category: "Sports",
    },
    {
      id: "3",
      dateMonth: "NOV",
      dateDay: "20",
      title: "Student Hangout",
      time: "4:00 PM - 7:00 PM",
      category: "Social",
    },
  ];

  const announcements = [
    {
      id: "1",
      box: "payment",
      title: "School Fees Deadline Extended",
      category: "Payment deadline is now Nov 30, 2026.",
      time: "2h ago",
    },
    {
      id: "2",
      box: "library",
      title: "New Library Hours",
      category: "The library is now open until 10PM daily.",
      time: "5h ago",
    },
    {
      id: "3",
      box: "wifi",
      title: "Campus WiFi Upgrade",
      category: "Enjoy faster and more stable internet across campus.",
      time: "1d ago",
    },
  ];

  const filteredEvents = events.filter((ev) =>
    ev.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAnnouncements = announcements.filter((ann) =>
    ann.title.toLowerCase().includes(search.toLowerCase()) ||
    ann.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="dashboard-topbar">
        <div className="orbit-search">
          <Search size={21} className="search-icon" />

          <input
            type="text"
            placeholder="Search events, buildings, classes, notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="location-button"
            type="button"
            onClick={() => navigate("/explore")}
            title="Open Campus Explorer"
            aria-label="Open Campus Explorer"
          >
            <MapPin size={18} />
          </button>
        </div>

        <Link to="/notifications" className="notification-button" title="View alerts" aria-label="View alerts">
          <Bell size={21} />
          <span className="notification-count">3</span>
        </Link>

        <Link
          to="/settings"
          className="dashboard-profile-link"
          title="Account Settings"
        >
          <div className="dashboard-avatar">
            {profile.avatarInitials || "OE"}
          </div>
          <p className="profile-name">{profile.fullName}</p>
        </Link>
      </div>

      <section className="welcome-section">
        <h1>
          Welcome back <span>{profile.fullName.split(" ")[0]}!</span> 🖐
        </h1>

        <span>Stay Productive. Make the most of your Campus Life with ORBIT.</span>

        {/* Live Campus Status Banner */}
        <div className="campus-status-pills">
          <span className="campus-pill campus-pill-library">
            <BookOpen size={13} /> Library: Open until 10:00 PM
          </span>
          <span className="campus-pill campus-pill-wifi">
            <Wifi size={13} /> Campus WiFi: Stable (eduroam)
          </span>
          <span className="campus-pill campus-pill-shuttle">
            <Bus size={13} /> Campus Shuttle: Operating
          </span>
        </div>

        <button
          className="button"
          style={{ "--clr": "#7808d0" }}
          type="button"
          onClick={() => navigate("/explore")}
        >
          <span className="button__icon-wrapper">
            <svg
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="button__icon-svg"
              width="10"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              />
            </svg>

            <svg
              viewBox="0 0 14 15"
              fill="none"
              width="10"
              xmlns="http://www.w3.org/2000/svg"
              className="button__icon-svg button__icon-svg--copy"
            >
              <path
                d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                fill="currentColor"
              />
            </svg>
          </span>
          Explore Campus Map
        </button>
      </section>

      <section className="Cards">
        {/* Courses: Interactive Modal */}
        <div
          className="courses-card"
          onClick={() => setShowCoursesModal(true)}
          style={{ cursor: "pointer" }}
          title="Click to view course schedule"
        >
          <div className="card-top">
            <GraduationCap size={40} color="#0099FF" />
            <span className="text">Schedule →</span>
          </div>
          <h1>{enrolledCourses.length}</h1>
          <p>Enrolled Courses (View)</p>
        </div>

        {/* Events */}
        <Link to="/events" className="events-card" style={{ textDecoration: "none" }}>
          <div className="card-top">
            <CalendarDays size={40} color="#A855F7" />
            <span className="text">{rsvpCount > 0 ? `${rsvpCount} Registered` : "+3 New"}</span>
          </div>
          <h1>{events.length}</h1>
          <p>Upcoming Events</p>
        </Link>

        {/* Announcements */}
        <Link to="/announcements" className="announcements-card" style={{ textDecoration: "none" }}>
          <div className="card-top">
            <Bell size={40} color="#00E6A8" />
            <span className="text">{pinnedCount > 0 ? `${pinnedCount} Pinned` : "+2 New"}</span>
          </div>
          <h1>5</h1>
          <p>New Announcements</p>
        </Link>

        {/* Community */}
        <Link to="/community" className="community-card" style={{ textDecoration: "none" }}>
          <div className="card-top">
            <UsersRound size={40} color="#A855F7" />
            <span className="text">Active Feed</span>
          </div>
          <h1>1.2k</h1>
          <p>Campus Community</p>
        </Link>
      </section>

      <section className="Footer">
        <div className="Events">
          <div className="Events-top">
            <CalendarDays size={40} color="#38bdf8" />
            <h1>Upcoming Events</h1>
            <Link to="/events" className="ViewAll">
              View All →
            </Link>
          </div>
          <div className="line"></div>
          <div className="Eventsid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((item) => (
                <div
                  className="dashboard-card"
                  key={item.id}
                  onClick={() => navigate("/events")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="date">
                    <span>{item.dateMonth}</span>
                    <h2>{item.dateDay}</h2>
                  </div>
                  <div className="title-time">
                    <h1>{item.title}</h1>
                    <span>
                      <Clock size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
                      {item.time}
                    </span>
                  </div>
                  <p className={`event-category ${item.category.toLowerCase()}`}>
                    {item.category}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ color: "#64748b", padding: "15px 0" }}>No matching events found</p>
            )}
          </div>
        </div>

        <div className="Announcement">
          <div className="Events-top">
            <Megaphone size={40} color="#f87171" />
            <h1>Announcements</h1>
            <Link to="/announcements" className="ViewAll">
              View All →
            </Link>
          </div>

          <div className="line"></div>

          <div className="Announcementsid">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement) => (
                <div
                  className="Announcements-card"
                  key={announcement.id}
                  onClick={() => navigate("/announcements")}
                  style={{ cursor: "pointer" }}
                >
                  <div className={`Announcement-box ${announcement.box.trim()}`}></div>

                  <div className="title-category">
                    <h1>{announcement.title}</h1>
                    <span className="Announcement-category">{announcement.category}</span>
                  </div>

                  <p>{announcement.time}</p>
                </div>
              ))
            ) : (
              <p style={{ color: "#64748b", padding: "15px 0" }}>No matching announcements</p>
            )}
          </div>
        </div>
      </section>

      {/* Enrolled Courses Modal */}
      {showCoursesModal && (
        <div
          className="courses-modal-overlay"
          onClick={() => setShowCoursesModal(false)}
        >
          <div
            className="courses-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="courses-modal-header">
              <div>
                <h2>
                  <GraduationCap color="#22D3EE" size={24} /> My Enrolled Courses
                </h2>
                <p>
                  Current Semester Schedule • {profile.department}
                </p>
              </div>
              <button
                type="button"
                className="courses-modal-close"
                aria-label="Close enrolled courses modal"
                onClick={() => setShowCoursesModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="courses-modal-list">
              {enrolledCourses.map((course) => (
                <div className="courses-modal-card" key={course.id}>
                  <div className="courses-modal-card-top">
                    <div>
                      <span className="courses-modal-code">
                        {course.code} • {course.credits} Credits
                      </span>
                      <h4>{course.name}</h4>
                    </div>
                    <span className="courses-modal-grade">
                      Grade: {course.grade}
                    </span>
                  </div>

                  <div className="courses-modal-meta">
                    <span>📍 {course.room}</span>
                    <span>🕒 {course.schedule}</span>
                    <span>👤 {course.instructor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
