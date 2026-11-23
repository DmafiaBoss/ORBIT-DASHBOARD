import { createContext, useContext, useState, useEffect } from "react";

const CampusContext = createContext(null);

const DEFAULT_COURSES = [
  { id: "CS301", name: "Data Structures & Algorithms", code: "CS 301", credits: 4, room: "Tech Hall 204", instructor: "Dr. Alan Turing", schedule: "Mon, Wed 10:00 - 11:30 AM", grade: "A" },
  { id: "CS304", name: "Modern Web Architecture", code: "CS 304", credits: 3, room: "Lab Wing B", instructor: "Prof. Grace Hopper", schedule: "Tue, Thu 01:00 - 02:30 PM", grade: "A-" },
  { id: "CS312", name: "Database Systems & SQL", code: "CS 312", credits: 3, room: "Science 101", instructor: "Dr. Edgar Codd", schedule: "Mon, Wed 02:00 - 03:30 PM", grade: "B+" },
  { id: "MATH210", name: "Linear Algebra & Statistics", code: "MTH 210", credits: 4, room: "Math Hall 302", instructor: "Prof. Carl Gauss", schedule: "Tue, Thu 09:00 - 10:30 AM", grade: "A" },
  { id: "ENG202", name: "Technical Communication", code: "ENG 202", credits: 2, room: "Humanities 115", instructor: "Dr. Maya Angelou", schedule: "Fri 10:00 AM - 12:00 PM", grade: "A" },
  { id: "CS390", name: "Senior Capstone Project", code: "CS 390", credits: 3, room: "Innovation Hub", instructor: "Dr. Claude Shannon", schedule: "Fri 02:00 - 04:00 PM", grade: "IP" }
];

export function CampusProvider({ children }) {
  // Student Profile
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("orbit_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      fullName: "Olivia Emma",
      username: "olivia",
      email: "olivia@example.com",
      phone: "+1 (555) 234-5678",
      department: "Computer Science & Engineering",
      bio: "Undergraduate student exploring intelligent systems, web engineering, and campus culture.",
      avatarInitials: "OE",
    };
  });

  // Theme
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("orbit_theme") || "Dark";
  });

  // RSVP'd Events
  const [rsvps, setRsvps] = useState(() => {
    try {
      const saved = localStorage.getItem("orbit_rsvps");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return { 1: true }; // Tech workshop pre-registered by default
  });

  // Pinned Announcements
  const [pinnedAnnouncements, setPinnedAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem("orbit_pinned_announcements");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return { 1: true }; // Fees deadline pinned by default
  });

  // Apply Theme App-wide
  useEffect(() => {
    if (theme === "Light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else if (theme === "Dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
    localStorage.setItem("orbit_theme", theme);
  }, [theme]);

  const updateProfile = (newProfile) => {
    const initials = newProfile.fullName
      ? newProfile.fullName
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "OE";

    const updated = { ...newProfile, avatarInitials: initials };
    setProfile(updated);
    localStorage.setItem("orbit_profile", JSON.stringify(updated));
  };

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const toggleRSVP = (eventId) => {
    setRsvps((prev) => {
      const updated = { ...prev, [eventId]: !prev[eventId] };
      localStorage.setItem("orbit_rsvps", JSON.stringify(updated));
      return updated;
    });
  };

  const togglePinAnnouncement = (id) => {
    setPinnedAnnouncements((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem("orbit_pinned_announcements", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <CampusContext.Provider
      value={{
        profile,
        updateProfile,
        theme,
        setTheme,
        enrolledCourses: DEFAULT_COURSES,
        rsvps,
        toggleRSVP,
        pinnedAnnouncements,
        togglePinAnnouncement,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
}

export function useCampus() {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error("useCampus must be used within a CampusProvider");
  }
  return context;
}
