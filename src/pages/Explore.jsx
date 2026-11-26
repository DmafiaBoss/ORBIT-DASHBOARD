import { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";

import {
  Search,
  MapPin,
  Navigation,
  Coffee,
  BookOpen,
  Dumbbell,
  Building2,
  X,
  HeartPulse,
  GraduationCap,
  Clock,
  Footprints,
  Compass,
} from "lucide-react";

import "leaflet/dist/leaflet.css";
import "./Explore.css";

const locations = [
  {
    id: 1,
    name: "ORBIT Main Library",
    category: "Academic",
    description: "Multi-floor study haven with private research cubicles, high-speed WiFi, and 24/7 exam access.",
    position: [6.515, 3.389],
    icon: BookOpen,
    hours: "Open · Closes 10:00 PM",
    distance: "3 min walk (240m)",
  },
  {
    id: 2,
    name: "Student Centre",
    category: "Social",
    description: "The heart of student life: gaming lounges, student union offices, café, and meeting rooms.",
    position: [6.517, 3.392],
    icon: Building2,
    hours: "Open · Closes 11:00 PM",
    distance: "5 min walk (380m)",
  },
  {
    id: 3,
    name: "Campus Artisanal Café",
    category: "Food",
    description: "Specialty espresso, fresh pastries, smoothies, and comfortable seating with power outlets.",
    position: [6.513, 3.393],
    icon: Coffee,
    hours: "Open · Closes 8:00 PM",
    distance: "2 min walk (150m)",
  },
  {
    id: 4,
    name: "Sports Complex & Gym",
    category: "Sports",
    description: "Olympic swimming pool, basketball courts, fitness gym, and indoor running track.",
    position: [6.519, 3.387],
    icon: Dumbbell,
    hours: "Open · Closes 9:00 PM",
    distance: "8 min walk (620m)",
  },
  {
    id: 5,
    name: "Innovation Hub & Makerspace",
    category: "Academic",
    description: "3D printers, hardware prototyping benches, VR headsets, and startup incubation workspaces.",
    position: [6.512, 3.386],
    icon: Building2,
    hours: "Open · Closes 9:00 PM",
    distance: "6 min walk (450m)",
  },
  {
    id: 6,
    name: "Student Affairs Office",
    category: "Administration",
    description: "Guidance counseling, scholarship administration, ID card issuance, and welfare inquiries.",
    position: [6.516, 3.390],
    icon: Building2,
    hours: "Open · Closes 4:30 PM",
    distance: "4 min walk (310m)",
  },
  {
    id: 7,
    name: "University Health Centre",
    category: "Healthcare",
    description: "24/7 emergency clinic, outpatient consultations, pharmacy, and wellness checks.",
    position: [6.514, 3.391],
    icon: HeartPulse,
    hours: "Open 24/7",
    distance: "4 min walk (290m)",
  },
  {
    id: 8,
    name: "Outdoor Amphitheatre",
    category: "Social",
    description: "Open-air theatre for drama productions, acoustic music nights, and campus rallies.",
    position: [6.520, 3.390],
    icon: Compass,
    hours: "Open Daily",
    distance: "10 min walk (750m)",
  },
  {
    id: 9,
    name: "Science & Engineering Complex",
    category: "Academic",
    description: "Cutting-edge computer labs, robotics workshop, chemistry research suites, and lecture halls.",
    position: [6.511, 3.388],
    icon: GraduationCap,
    hours: "Open · Closes 8:00 PM",
    distance: "7 min walk (500m)",
  },
  {
    id: 10,
    name: "Central Dining Commons",
    category: "Food",
    description: "Diverse meal plans, hot buffet, vegan options, fresh juice bar, and grab-and-go counters.",
    position: [6.513, 3.395],
    icon: Coffee,
    hours: "Open · Closes 9:30 PM",
    distance: "3 min walk (220m)",
  },
];

const categories = [
  "All",
  "Academic",
  "Social",
  "Food",
  "Sports",
  "Administration",
  "Healthcare",
];

function MapController({ selectedLocation }) {
  const map = useMap();

  if (selectedLocation?.position) {
    map.flyTo(selectedLocation.position, 17, {
      animate: true,
      duration: 0.8,
    });
  }

  return null;
}

function Explore() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [navigating, setNavigating] = useState(false);
  const mapAreaRef = useRef(null);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setTimeout(() => {
        mapAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 60);
    }
  };

  const locationsPerPage = 5;

  const filteredLocations = locations.filter((location) => {
    const matchesCategory =
      activeCategory === "All" || location.category === activeCategory;

    const matchesSearch =
      location.name.toLowerCase().includes(search.toLowerCase()) ||
      location.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const startIndex = currentPage * locationsPerPage;
  const visibleLocations = filteredLocations.slice(
    startIndex,
    startIndex + locationsPerPage
  );

  const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);

  const changePage = (page) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
    setSelectedLocation(null);
  };

  const handleStartNavigation = () => {
    setNavigating(true);
    setTimeout(() => setNavigating(false), 3000);
  };

  return (
    <div className="explore-page">
      <header className="explore-header">
        <div>
          <h1>Campus Explorer</h1>
          <p>Navigate halls, research centers, dining spots, and sports arenas across ORBIT.</p>
        </div>

        <div className="explore-location-count">
          <MapPin size={17} />
          <span>{filteredLocations.length} locations active</span>
        </div>
      </header>

      <div className="explore-layout">
        <aside className="explore-sidebar">
          <div className="explore-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search buildings, food, labs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(0);
                setSelectedLocation(null);
              }}
            />
          </div>

          <div className="explore-categories">
            <h3>Categories</h3>
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(0);
                  setSelectedLocation(null);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="explore-places">
            <h3>Campus Directory</h3>

            {visibleLocations.map((location) => {
              const LocationIcon = location.icon;

              return (
                <button
                  key={location.id}
                  className={`explore-place ${
                    selectedLocation?.id === location.id ? "selected" : ""
                  }`}
                  onClick={() => handleSelectLocation(location)}
                >
                  <span className="place-icon">
                    <LocationIcon size={19} />
                  </span>

                  <span className="place-details">
                    <strong>{location.name}</strong>
                    <small>{location.category} · {location.distance}</small>
                  </span>

                  <Navigation size={16} />
                </button>
              );
            })}

            {filteredLocations.length === 0 && (
              <p className="explore-no-results">No locations found.</p>
            )}

            <div className="buttons">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 0}
                aria-label="Previous locations"
              >
                ◀
              </button>

              <span>
                {totalPages === 0 ? 0 : currentPage + 1} / {totalPages}
              </span>

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                aria-label="Next locations"
              >
                ▶
              </button>
            </div>
          </div>
        </aside>

        <main className="explore-map-area" ref={mapAreaRef}>
          <MapContainer
            center={[6.515, 3.389]}
            zoom={16}
            scrollWheelZoom={true}
            className="campus-map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController selectedLocation={selectedLocation} />

            {visibleLocations.map((location) => (
              <CircleMarker
                key={location.id}
                center={location.position}
                radius={selectedLocation?.id === location.id ? 12 : 8}
                pathOptions={{
                  color: "#ffffff",
                  weight: 2,
                  fillColor: selectedLocation?.id === location.id ? "#22d3ee" : "#3b82f6",
                  fillOpacity: 1,
                }}
                eventHandlers={{
                  click: () => setSelectedLocation(location),
                }}
              >
                <Popup>
                  <strong>{location.name}</strong>
                  <br />
                  <span style={{ fontSize: "12px", color: "#64748b" }}>
                    {location.category} · {location.hours}
                  </span>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          {selectedLocation && (
            <div className="explore-details">
              <button
                type="button"
                aria-label="Close location details"
                className="close-details"
                onClick={() => setSelectedLocation(null)}
              >
                <X size={18} />
              </button>

              <span className="details-category">
                {selectedLocation.category}
              </span>

              <h2>{selectedLocation.name}</h2>
              <p>{selectedLocation.description}</p>

              <div className="explore-details-meta">
                <span>
                  <Clock size={15} color="#22d3ee" /> {selectedLocation.hours}
                </span>
                <span>
                  <Footprints size={15} color="#a855f7" /> {selectedLocation.distance}
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
                <button
                  type="button"
                  className={`explore-nav-btn ${navigating ? "navigating" : ""}`}
                  onClick={handleStartNavigation}
                >
                  <Navigation size={15} />
                  {navigating ? "Routing Calculated!" : "Start Walking Route"}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Explore;
