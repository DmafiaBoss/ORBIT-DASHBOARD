import { useState } from "react";
import {
  Search,
  MapPin,
  Bell,
  GraduationCap,
  Megaphone,
  CalendarDays,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router";

import "./Dashboard.css";

function Dashboard() {
  const [search, setSearch] = useState("");

  const Events = [
    {
      id: "1",
      date: "Nov 15",
      title: "Tech Workshop: Web Development",
      time: "10:00 Am - 12:00PM",
      category: "Technical",
    },

    {
      id: "2",
      date: "Nov 18",
      title: "Campus Sports Day",
      time: "9:00 Am - 5:00PM",
      category: "Sports",
    },

    {
      id: "3",
      date: "Nov 20",
      title: "Student Hangout",
      time: "4:00 Am - 7:00PM",
      category: "Social",
    },
  ];

  const Announcements = [
    {
      id: "1",
      box: "payment ",
      title: "School Fees Deadline Extended",
      category: "Payment deadline is now Nov 30, 2026.",
      time: "2h ago",
    },

    {
      id: "2",
      box: " library",
      title: "New Library Hours",
      category: "The library is now til 10PM daily.",
      time: "5h ago",
    },

    {
      id: "3",
      box: "wifi ",
      title: "Campus WiFi Upgrade",
      category: "Enjoy faster and more stable internet ",
      time: "1d ago",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-topbar">
        <div className="orbit-search">
          <Search size={21} className="search-icon" />

          <input
            type="text"
            placeholder="Search events, places, announcements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="location-button" type="button">
            <MapPin size={18} />
          </button>
        </div>

        <Link to="/notifications" className="notification-button">
          <Bell size={21} />
          <span className="notification-count">3</span>
        </Link>
        <div className="Circle"></div>
        <p className="profile-name">Olivia Emma</p>
      </div>

      <section className="welcome-section">
        <h1>
          Welcome back <span> Olivia! </span>🖐
        </h1>

        <span>Stay Productive. Make the most of your Campus Life</span>

        <button className="button" style={{ "--clr": "#7808d0" }} type="button">
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
          Explore All
        </button>
      </section>

      <section className="Cards">
        {/* Courses */}
        <div className="courses-card">
          <div className="card-top">
            <GraduationCap size={40} color="#0099FF" />
            <span className="text">↑ +1</span>
          </div>

          <h1>12</h1>
          <p>Courses Enrolled</p>
        </div>

        {/* Events */}
        <div className="events-card">
          <div className="card-top">
            <CalendarDays size={40} color="#A855F7" />
            <span className="text">↑ +1</span>
          </div>

          <h1>3</h1>
          <p>Upcoming Events</p>
        </div>

        {/* Announcements */}
        <div className="announcements-card">
          <div className="card-top">
            <Bell size={40} color="#00E6A8" />
            <span className="text">↑ +2</span>
          </div>

          <h1>5</h1>
          <p>New Announcements</p>
        </div>

        {/* Community */}
        <div className="community-card">
          <div className="card-top">
            <UsersRound size={40} color="#A855F7" />
            <span className="text">↑ +12%</span>
          </div>

          <h1>1.2k</h1>
          <p>Campus Community</p>
        </div>
      </section>

      <section className="Footer">
        <div className="Events">
          <div className="Events-top">
            <CalendarDays size={40} color="blue" />
            <h1>Upcoming Events</h1>
            <Link to="/Events" className="ViewAll">
              View All →
            </Link>
          </div>
          <div className="line"></div>
          <div className="Eventsid">
            {Events.map((Events) => (
              <div className="dashboard-card" key={Events.id}>
                <div className="date">
                  <span>NOV</span>
                  <h2>12</h2>
                </div>
                <div className="title-time">
                  <h1>{Events.title}</h1>
                  <span>{Events.time}</span>
                </div>
                <p
                  className={`event-category ${Events.category.toLowerCase()}`}
                >
                  {Events.category}
                </p>
              </div>
            ))}
          </div>
          
        </div>

        <div className="Announcement">
          <div className="Events-top">
            <Megaphone size={40} color="red" />
            <h1>Announcement</h1>
            <Link to="/Announcements" className="ViewAll">
              View All →
            </Link>
          </div>

          <div className="line"></div>

        <div className="Announcementsid">
  {Announcements.map((announcement) => (
    <div className="Announcements-card" key={announcement.id}>

      <div className={`Announcement-box ${announcement.box.trim()}`}></div>

      <div className="title-category">
        <h1>{announcement.title}</h1>
        <span className="Announcement-category ">{announcement.category}</span>
      </div>

      <p>{announcement.time}</p>

    </div>
  ))}
</div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;