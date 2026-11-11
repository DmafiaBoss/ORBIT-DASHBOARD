
import { useState } from "react";
import {
  Search,
  CalendarDays,
  Clock,
  MapPin,
  Laptop,
  Trophy,
  Users,
  BookOpen,
  Bell,
  ChevronDown,
} from "lucide-react";

import "./Events.css";

const eventsData = [
  {
    id: 1,
    title: "Tech Workshop: Web Development",
    date: "Nov 15",
    day: 15,
    time: "10:00 AM - 12:00 PM",
    venue: "Main Hall",
    category: "Technical",
    description: "Learn modern web development with practical sessions and industry experts.",
    icon: Laptop,
   image: "/events/tech-workshop.jfif",
  },
  {
    id: 2,
    title: "AI & Innovation Summit",
    date: "Nov 16",
    day: 16,
    time: "11:00 AM - 2:00 PM",
    venue: "Innovation Centre",
    category: "Technical",
    description: "Explore emerging technology and exciting ideas shaping the future.",
    icon: Laptop,
    image: "/events/ai-summit.jpg",
  },
  {
    id: 3,
    title: "Campus Sports Day",
    date: "Nov 18",
    day: 18,
    time: "9:00 AM - 5:00 PM",
    venue: "Sports Complex",
    category: "Sports",
    description: "A day of games, teamwork and friendly campus competition.",
    icon: Trophy,
    image: "/events/sports-day.jpg",
  },
  {
    id: 4,
    title: "Football Tournament",
    date: "Nov 20",
    day: 20,
    time: "2:00 PM - 6:00 PM",
    venue: "University Field",
    category: "Sports",
    description: "Come support your department in the interfaculty football tournament.",
    icon: Trophy,
    image: "/events/football.jpg",
  },
  {
    id: 5,
    title: "Student Hangout",
    date: "Nov 22",
    day: 22,
    time: "4:00 PM - 7:00 PM",
    venue: "Student Centre",
    category: "Social",
    description: "Meet new people, enjoy games and connect with fellow students.",
    icon: Users,
    image: "/events/student-hangout.jpg",
  },
  {
    id: 6,
    title: "Freshers Welcome Party",
    date: "Nov 24",
    day: 24,
    time: "5:00 PM - 9:00 PM",
    venue: "Campus Arena",
    category: "Social",
    description: "An evening of music, entertainment and new friendships.",
    icon: Users,
    image: "/events/freshers-party.jpg",
  },
  {
    id: 7,
    title: "Career Guidance Seminar",
    date: "Nov 26",
    day: 26,
    time: "1:00 PM - 3:00 PM",
    venue: "Lecture Theatre A",
    category: "Academic",
    description: "Get career advice and practical insights from professionals.",
    icon: BookOpen,
    image: "/events/career-seminar.jpg",
  },
  {
    id: 8,
    title: "Examination Preparation Workshop",
    date: "Nov 27",
    day: 27,
    time: "10:00 AM - 12:00 PM",
    venue: "University Library",
    category: "Academic",
    description: "Discover useful study strategies and prepare confidently for exams.",
    icon: BookOpen,
    image: "/events/exam-workshop.jpg",
  },
];

const categories = ["All", "Technical", "Sports", "Social", "Academic"];

function Events() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("earliest");

  const filteredEvents = eventsData
    .filter((event) => {
      const matchesCategory =
        activeCategory === "All" || event.category === activeCategory;

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.venue.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) =>
      sortOrder === "earliest" ? a.day - b.day : b.day - a.day
    );

  return (
    <div className="events-page">
      {/* Top bar */}
      <header className="events-topbar">
        <div className="events-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="events-user">
          <button className="events-notification">
            <Bell size={21} />
          </button>
          <div className="events-avatar"></div>
          <span>Olivia Emma</span>
        </div>
      </header>

      {/* Page heading */}
      <section className="events-hero">
        <div className="events-heading">
          <CalendarDays size={45} />
          <div>
            <h1>Campus Events</h1>
            <p>Discover what's happening around your campus.</p>
          </div>
        </div>
      </section>

      {/* Filters and sorting */}
      <section className="events-controls">
        <div className="event-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`event-filter ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <label className="event-sort">
          <span>Sort:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="earliest">Earliest first</option>
            <option value="latest">Latest first</option>
          </select>
          <ChevronDown size={16} />
        </label>
      </section>

      {/* Main content */}
      <div className="events-content">
        <section className="events-list-section">
          <div className="events-section-heading">
            <div>
              <h2>Explore Events</h2>
              <p>{filteredEvents.length} events available</p>
            </div>
          </div>

          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const EventIcon = event.icon;

                return (
                  <article
                    className={`event-card event-${event.id}`}
                    key={event.id}
                  >
                    <div
                      className={`event-image ${event.category.toLowerCase()}`}
                      style={{
                        backgroundImage: `linear-gradient(
                          180deg,
                          rgba(3, 12, 28, 0.15),
                          rgba(3, 12, 28, 0.75)
                        ), url("${event.image}")`,
                      }}
                    >
                      <div className="event-date">
                        <span>NOV</span>
                        <strong>{event.day}</strong>
                      </div>

                      <div className="event-category">
                        <EventIcon size={16} />
                        <span>{event.category}</span>
                      </div>
                    </div>

                    <div className="event-card-content">
                      <h3>{event.title}</h3>

                      <p className="event-info">
                        <Clock size={16} />
                        {event.time}
                      </p>

                      <p className="event-info">
                        <MapPin size={16} />
                        {event.venue}
                      </p>

                      <p className="event-description">
                        {event.description}
                      </p>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="events-empty">
                <CalendarDays size={35} />
                <h3>No events found</h3>
                <p>Try another search or category.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Events;
