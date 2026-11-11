
import { useState } from "react";

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
} from "lucide-react";

import "leaflet/dist/leaflet.css";
import "./Explore.css";

// ============================================
// CAMPUS LOCATIONS
// Each location has its own coordinates.
// Coordinates are sample positions for testing.
// Replace them with the real campus coordinates.
// ============================================

const locations = [
  {
    id: 1,
    name: "ORBIT Main Library",
    category: "Academic",
    description: "A quiet space for studying, research and group learning.",
    position: [6.515, 3.389],
    icon: BookOpen,
  },
  {
    id: 2,
    name: "Student Centre",
    category: "Social",
    description: "Meet friends, relax and connect with other students.",
    position: [6.517, 3.392],
    icon: Building2,
  },
  {
    id: 3,
    name: "Campus Café",
    category: "Food",
    description: "Grab a meal, coffee or a quick snack.",
    position: [6.513, 3.393],
    icon: Coffee,
  },
  {
    id: 4,
    name: "Sports Complex",
    category: "Sports",
    description: "Facilities for fitness, sports and recreational activities.",
    position: [6.519, 3.387],
    icon: Dumbbell,
  },
  {
    id: 5,
    name: "Innovation Hub",
    category: "Academic",
    description: "A creative space for technology, projects and collaboration.",
    position: [6.512, 3.386],
    icon: Building2,
  },
  {
    id: 6,
    name: "Student Affairs Office",
    category: "Administration",
    description: "Student welfare and administrative support.",
    position: [6.516, 3.390],
    icon: Building2,
  },
  {
    id: 7,
    name: "Medical Centre",
    category: "Healthcare",
    description: "Campus medical services and consultations.",
    position: [6.514, 3.391],
    icon: HeartPulse,
  },
  {
    id: 8,
    name: "Sports Complex",
    category: "Sports",
    description: "Sports facilities and recreational activities.",
    position: [6.520, 3.390],
    icon: Dumbbell,
  },
  {
    id: 9,
    name: "Faculty Buildings",
    category: "Academic",
    description: "Lecture rooms and faculty offices.",
    position: [6.511, 3.388],
    icon: GraduationCap,
  },
  {
    id: 10,
    name: "Cafeteria",
    category: "Food",
    description: "Food, snacks and refreshments.",
    position: [6.513, 3.395],
    icon: Coffee,
  },
];

// ============================================
// AVAILABLE CATEGORIES
// ============================================

const categories = [
  "All",
  "Academic",
  "Social",
  "Food",
  "Sports",
  "Administration",
  "Healthcare",
];

// ============================================
// MAP CONTROLLER
// Moves the map to the selected location.
// ============================================

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

// ============================================
// MAIN EXPLORE COMPONENT
// ============================================

function Explore() {
  // Stores the search input.
  const [search, setSearch] = useState("");

  // Stores the currently selected category.
  const [activeCategory, setActiveCategory] = useState("All");

  // Stores the selected campus location.
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Controls which group of locations is displayed.
  const [currentPage, setCurrentPage] = useState(0);

  // Number of locations displayed per page.
  const locationsPerPage = 5;

  // ============================================
  // SEARCH AND CATEGORY FILTERING
  // ============================================

  const filteredLocations = locations.filter((location) => {
    const matchesCategory =
      activeCategory === "All" ||
      location.category === activeCategory;

    const matchesSearch = location.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // ============================================
  // PAGINATION
  // ============================================

  // Calculate the first location on the current page.
  const startIndex = currentPage * locationsPerPage;

  // Display only five locations at a time.
  const visibleLocations = filteredLocations.slice(
    startIndex,
    startIndex + locationsPerPage
  );

  // Calculate how many pages are needed.
  const totalPages = Math.ceil(
    filteredLocations.length / locationsPerPage
  );

  // Move between pages.
  const changePage = (page) => {
    if (page < 0 || page >= totalPages) return;

    setCurrentPage(page);
    setSelectedLocation(null);
  };

  return (
    <div className="explore-page">

      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <header className="explore-header">
        <div>
          <h1>Campus Explorer</h1>
          <p>Find your way around campus.</p>
        </div>

        <div className="explore-location-count">
          <MapPin size={17} />
          <span>{filteredLocations.length} locations</span>
        </div>
      </header>


      {/* ========================================
          MAIN EXPLORE LAYOUT
      ======================================== */}

      <div className="explore-layout">

        {/* ======================================
            SIDEBAR
        ====================================== */}

        <aside className="explore-sidebar">

          {/* SEARCH BAR */}

          <div className="explore-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search locations..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(0);
                setSelectedLocation(null);
              }}
            />
          </div>


          {/* CATEGORY FILTERS */}

          <div className="explore-categories">
            <h3>Categories</h3>

            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category ? "active" : ""
                }
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


          {/* CAMPUS LOCATION LIST */}

          <div className="explore-places">
            <h3>Campus locations</h3>

            {visibleLocations.map((location) => {
              const LocationIcon = location.icon;

              return (
                <button
                  key={location.id}
                  className={`explore-place ${
                    selectedLocation?.id === location.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >

                  {/* LOCATION ICON */}

                  <span className="place-icon">
                    <LocationIcon size={19} />
                  </span>

                  {/* LOCATION DETAILS */}

                  <span className="place-details">
                    <strong>{location.name}</strong>
                    <small>{location.category}</small>
                  </span>

                  <Navigation size={16} />
                </button>
              );
            })}


            {/* NO RESULTS MESSAGE */}

            {filteredLocations.length === 0 && (
              <p className="explore-no-results">
                No locations found.
              </p>
            )}


            {/* PAGINATION BUTTONS */}

            <div className="buttons">

              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 0}
                aria-label="Previous locations"
              >
                ◀
              </button>

              <span>
                {totalPages === 0 ? 0 : currentPage + 1}
                {" / "}
                {totalPages}
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


        {/* ======================================
            CAMPUS MAP
        ====================================== */}

        <main className="explore-map-area">

          <MapContainer
            center={[6.515, 3.389]}
            zoom={16}
            scrollWheelZoom={true}
            className="campus-map"
          >

            {/* OPENSTREETMAP TILE LAYER */}

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {/* MOVE MAP TO SELECTED LOCATION */}

            <MapController selectedLocation={selectedLocation} />


            {/* MAP MARKERS */}

            {visibleLocations.map((location) => (
              <CircleMarker
                key={location.id}
                center={location.position}
                radius={
                  selectedLocation?.id === location.id ? 12 : 8
                }
                pathOptions={{
                  color: "#ffffff",
                  weight: 2,
                  fillColor: "#00d9ff",
                  fillOpacity: 1,
                }}
                eventHandlers={{
                  click: () => setSelectedLocation(location),
                }}
              >

                {/* MARKER POPUP */}

                <Popup>
                  <strong>{location.name}</strong>
                  <br />
                  {location.category}
                </Popup>

              </CircleMarker>
            ))}

          </MapContainer>


          {/* ==================================
              SELECTED LOCATION DETAILS
          ================================== */}

          {selectedLocation && (
            <div className="explore-details">

              {/* CLOSE DETAILS BUTTON */}

              <button
                className="close-details"
                onClick={() => setSelectedLocation(null)}
              >
                <X size={18} />
              </button>

              {/* LOCATION CATEGORY */}

              <span className="details-category">
                {selectedLocation.category}
              </span>

              {/* LOCATION NAME AND DESCRIPTION */}

              <h2>{selectedLocation.name}</h2>

              <p>{selectedLocation.description}</p>

              {/* LOCATION INDICATOR */}

              <div className="details-coordinate">
                <MapPin size={16} />
                Campus location
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Explore;
