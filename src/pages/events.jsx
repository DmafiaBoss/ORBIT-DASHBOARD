import { useState, useEffect } from "react";
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
  CheckCircle,
  CalendarPlus,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { useCampus } from "../context/CampusContext";
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
    description: "Learn modern full-stack web development with practical hands-on sessions led by industry engineers.",
    speaker: "Alex Rivera (Senior Dev, Google)",
    attendees: 142,
    icon: Laptop,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "AI & Innovation Summit 2026",
    date: "Nov 16",
    day: 16,
    time: "11:00 AM - 2:00 PM",
    venue: "Innovation Centre",
    category: "Technical",
    description: "Explore generative AI, autonomous systems, and student startups shaping the future of campus tech.",
    speaker: "Dr. Elena Vance (AI Lab Director)",
    attendees: 210,
    icon: Laptop,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Campus Sports Day & Track Meet",
    date: "Nov 18",
    day: 18,
    time: "9:00 AM - 5:00 PM",
    venue: "Sports Complex",
    category: "Sports",
    description: "A full day of athletics, relay races, games, teamwork, and friendly inter-department rivalry.",
    speaker: "Coach Marcus Brody",
    attendees: 380,
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Inter-Faculty Football Championship",
    date: "Nov 20",
    day: 20,
    time: "2:00 PM - 6:00 PM",
    venue: "University Stadium",
    category: "Sports",
    description: "Come support your faculty team in the quarter-finals of the annual campus cup.",
    speaker: "Athletics Union",
    attendees: 520,
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Student Community Social Mixer",
    date: "Nov 22",
    day: 22,
    time: "4:00 PM - 7:00 PM",
    venue: "Student Centre Lounge",
    category: "Social",
    description: "Meet new people across faculties, enjoy refreshments, live board games, and great music.",
    speaker: "Student Union Leaders",
    attendees: 195,
    icon: Users,
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Freshers Welcome & Campus Glow Party",
    date: "Nov 24",
    day: 24,
    time: "5:00 PM - 9:00 PM",
    venue: "Campus Arena",
    category: "Social",
    description: "An unforgettable evening of lights, music, guest DJs, and celebrating our incoming freshmen.",
    speaker: "Orbit Entertainment Guild",
    attendees: 640,
    icon: Users,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    title: "Career & Internship Masterclass",
    date: "Nov 26",
    day: 26,
    time: "1:00 PM - 3:00 PM",
    venue: "Lecture Theatre A",
    category: "Academic",
    description: "Master resume building, portfolio reviews, and mock interviews with top tech and finance recruiters.",
    speaker: "Career Services & Alumni Mentors",
    attendees: 290,
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    title: "Examination Strategy & Study Jam",
    date: "Nov 27",
    day: 27,
    time: "10:00 AM - 12:00 PM",
    venue: "Central Library Wing B",
    category: "Academic",
    description: "Effective retention tactics, stress management, past-paper analysis, and collaborative study circles.",
    speaker: "Academic Excellence Council",
    attendees: 160,
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
  },
];

const categories = ["All", "My Events", "Technical", "Sports", "Social", "Academic"];

function Events() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("earliest");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { profile, rsvps, toggleRSVP } = useCampus();

  useEffect(() => {
    if (!selectedEvent) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent]);

  const handleRegisterToggle = (e, id) => {
    e.stopPropagation();
    toggleRSVP(id);
  };

  const filteredEvents = eventsData
    .filter((event) => {
      const isMyEventsSelected = activeCategory === "My Events";
      const matchesCategory =
        activeCategory === "All" ||
        (isMyEventsSelected ? !!rsvps[event.id] : event.category === activeCategory);

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.venue.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase());

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
            placeholder="Search events, topics, or venues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="events-user">
          <Link to="/notifications" className="events-notification" title="Alerts" aria-label="View notifications">
            <Bell size={21} />
          </Link>
          <Link to="/settings" className="events-profile-link">
            <div className="events-avatar-initials">
              {profile.avatarInitials || "OE"}
            </div>
            <span>{profile.fullName}</span>
          </Link>
        </div>
      </header>

      {/* Page heading */}
      <section className="events-hero">
        <div className="events-heading">
          <CalendarDays size={45} color="#22D3EE" />
          <div>
            <h1>Campus Events</h1>
            <p>Discover workshops, sports, hackathons, and gatherings across ORBIT campus.</p>
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
              {category === "My Events" ? `My Events (${Object.values(rsvps).filter(Boolean).length})` : category}
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
              <p>{filteredEvents.length} events scheduled this month</p>
            </div>
          </div>

          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => {
                const EventIcon = event.icon;
                const isRsvp = !!rsvps[event.id];

                return (
                  <article
                    className={`event-card event-${event.id}`}
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className={`event-image ${event.category.toLowerCase()}`}
                      style={{
                        backgroundImage: `linear-gradient(
                          180deg,
                          rgba(3, 12, 28, 0.25),
                          rgba(3, 12, 28, 0.85)
                        ), url("${event.image}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
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

                      <div style={{
                        marginTop: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        borderTop: "1px solid rgba(148, 163, 184, 0.12)"
                      }}>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                          {event.attendees + (isRsvp ? 1 : 0)} attending
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleRegisterToggle(e, event.id)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "600",
                            cursor: "pointer",
                            border: "none",
                            background: isRsvp ? "#10b981" : "rgba(34, 211, 238, 0.15)",
                            color: isRsvp ? "#ffffff" : "#22d3ee",
                            transition: "all 0.2s ease"
                          }}
                        >
                          {isRsvp ? (
                            <>
                              <CheckCircle size={14} /> Registered
                            </>
                          ) : (
                            <>
                              <CalendarPlus size={14} /> Register
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="events-empty">
                <CalendarDays size={35} />
                <h3>No events found</h3>
                <p>
                  {activeCategory === "My Events"
                    ? "You haven't registered for any events yet. Browse events above and click Register!"
                    : "Try another search or category."}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="event-modal-overlay"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="event-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="event-modal-hero"
              style={{
                backgroundImage: `linear-gradient(180deg, transparent, #0f172a), url("${selectedEvent.image}")`,
              }}
            >
              <span className="event-modal-badge">
                {selectedEvent.category}
              </span>
              <button
                type="button"
                className="event-modal-close"
                aria-label="Close event details"
                onClick={() => setSelectedEvent(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="event-modal-body">
              <h2>{selectedEvent.title}</h2>
              <p>{selectedEvent.description}</p>

              <div className="event-modal-grid">
                <div className="event-modal-info-box">
                  <small>Date & Time</small>
                  <strong>{selectedEvent.date} · {selectedEvent.time}</strong>
                </div>
                <div className="event-modal-info-box">
                  <small>Venue</small>
                  <strong>{selectedEvent.venue}</strong>
                </div>
              </div>

              {selectedEvent.speaker && (
                <div className="event-modal-speaker">
                  <small>Host / Speaker</small>
                  <span>{selectedEvent.speaker}</span>
                </div>
              )}

              <div className="event-modal-actions">
                <button
                  type="button"
                  className={`event-modal-rsvp-btn ${rsvps[selectedEvent.id] ? "registered" : ""}`}
                  onClick={(e) => handleRegisterToggle(e, selectedEvent.id)}
                >
                  {rsvps[selectedEvent.id] ? (
                    <>
                      <CheckCircle size={18} /> You're Registered
                    </>
                  ) : (
                    <>
                      <CalendarPlus size={18} /> Register for Event
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
