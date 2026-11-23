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
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80",
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

const categories = ["All", "My RSVPs", "Technical", "Sports", "Social", "Academic"];

function Events() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("earliest");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { profile, rsvps, toggleRSVP } = useCampus();

  const handleRSVPToggle = (e, id) => {
    e.stopPropagation();
    toggleRSVP(id);
  };

  const filteredEvents = eventsData
    .filter((event) => {
      const isRsvpSelected = activeCategory === "My RSVPs";
      const matchesCategory =
        activeCategory === "All" ||
        (isRsvpSelected ? !!rsvps[event.id] : event.category === activeCategory);

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
          <Link to="/notifications" className="events-notification" title="Alerts">
            <Bell size={21} />
          </Link>
          <Link to="/settings" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", color: "inherit" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #22D3EE, #6366F1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#070b15",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
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
              {category === "My RSVPs" ? `My RSVPs (${Object.values(rsvps).filter(Boolean).length})` : category}
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
                          onClick={(e) => handleRSVPToggle(e, event.id)}
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
                              <CheckCircle size={14} /> RSVP'd
                            </>
                          ) : (
                            <>
                              <CalendarPlus size={14} /> RSVP
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
                  {activeCategory === "My RSVPs"
                    ? "You haven't RSVP'd to any events yet. Browse events above and click RSVP!"
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
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            style={{
              background: "#0f172a",
              border: "1px solid rgba(34, 211, 238, 0.3)",
              borderRadius: "18px",
              maxWidth: "540px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
              color: "#f8fafc",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                height: "180px",
                backgroundImage: `linear-gradient(180deg, transparent, #0f172a), url("${selectedEvent.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  background: "#22d3ee",
                  color: "#0f172a",
                  fontWeight: "bold",
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                }}
              >
                {selectedEvent.category}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: "24px" }}>
              <h2 style={{ margin: "0 0 12px", fontSize: "22px" }}>{selectedEvent.title}</h2>
              <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", margin: "0 0 20px" }}>
                {selectedEvent.description}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "12px", borderRadius: "10px" }}>
                  <small style={{ color: "#64748b", display: "block" }}>Date & Time</small>
                  <strong style={{ fontSize: "13px" }}>{selectedEvent.date} · {selectedEvent.time}</strong>
                </div>
                <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "12px", borderRadius: "10px" }}>
                  <small style={{ color: "#64748b", display: "block" }}>Venue</small>
                  <strong style={{ fontSize: "13px" }}>{selectedEvent.venue}</strong>
                </div>
              </div>

              {selectedEvent.speaker && (
                <div style={{ background: "rgba(34, 211, 238, 0.06)", border: "1px solid rgba(34, 211, 238, 0.2)", padding: "12px", borderRadius: "10px", marginBottom: "20px" }}>
                  <small style={{ color: "#22d3ee", display: "block", fontWeight: "600" }}>Host / Speaker</small>
                  <span style={{ fontSize: "13px" }}>{selectedEvent.speaker}</span>
                </div>
              )}

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={(e) => handleRSVPToggle(e, selectedEvent.id)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: rsvps[selectedEvent.id] ? "#10b981" : "#22d3ee",
                    color: rsvps[selectedEvent.id] ? "#fff" : "#0f172a",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {rsvps[selectedEvent.id] ? (
                    <>
                      <CheckCircle size={18} /> You're Attending
                    </>
                  ) : (
                    <>
                      <CalendarPlus size={18} /> Confirm Attendance (RSVP)
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
