import { lazy, Suspense, useEffect, Component } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import Navigation from "./Navigation";
import { CampusProvider } from "./context/CampusContext";
import "./App.css";

// Lazy-loaded routes for peak bundle performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Events = lazy(() => import("./pages/events"));
const Explore = lazy(() => import("./pages/Explore"));
const Announcements = lazy(() => import("./pages/Announcement"));
const Community = lazy(() => import("./pages/Community"));
const Settings = lazy(() => import("./pages/Settings"));
const Notifications = lazy(() => import("./pages/Notifications"));

// High-performance pulse loading skeleton with zero layout shift
function PageSkeleton() {
  return (
    <div
      style={{
        padding: "35px",
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div
        style={{
          height: "54px",
          width: "100%",
          maxWidth: "550px",
          borderRadius: "13px",
          background: "rgba(15, 23, 42, 0.6)",
          animation: "pulse 1.5s infinite ease-in-out",
        }}
      />
      <div
        style={{
          height: "220px",
          width: "100%",
          borderRadius: "18px",
          background: "rgba(15, 23, 42, 0.6)",
          animation: "pulse 1.5s infinite ease-in-out",
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              height: "140px",
              borderRadius: "16px",
              background: "rgba(15, 23, 42, 0.6)",
              animation: "pulse 1.5s infinite ease-in-out",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Catches any render crash and shows a friendly recovery screen instead of a blank page
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ORBIT ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            background: "#0a0f1e",
            color: "#f8fafc",
            textAlign: "center",
            gap: "16px",
          }}
        >
          <span style={{ fontSize: "52px" }}>⚠️</span>
          <h2 style={{ fontSize: "24px", margin: 0 }}>Something went wrong</h2>
          <p style={{ color: "#94a3b8", maxWidth: "420px", margin: 0 }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = "/";
            }}
            style={{
              marginTop: "8px",
              padding: "12px 28px",
              borderRadius: "10px",
              border: "none",
              background: "#22d3ee",
              color: "#0a0f1e",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Go back to Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppInner() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-layout">
      <Navigation />

      <main className="main-content">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* Case-insensitive and legacy fallbacks */}
            <Route path="/Events" element={<Navigate to="/events" replace />} />
            <Route path="/Explore" element={<Navigate to="/explore" replace />} />
            <Route path="/Announcements" element={<Navigate to="/announcements" replace />} />
            <Route path="/Community" element={<Navigate to="/community" replace />} />
            <Route path="/Settings" element={<Navigate to="/settings" replace />} />
            <Route path="/Notifications" element={<Navigate to="/notifications" replace />} />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <CampusProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <AppInner />
        </ErrorBoundary>
      </BrowserRouter>
    </CampusProvider>
  );
}

export default App;
