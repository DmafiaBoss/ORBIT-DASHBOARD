
import { BrowserRouter, Routes, Route } from "react-router";

import Navigation from "./Navigation";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/events";
import Explore from "./pages/Explore";
import Announcements from "./pages/Announcement";
import Community from "./pages/Community";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navigation />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/Community" element={<Community />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
