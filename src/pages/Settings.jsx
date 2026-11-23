import { useState, useEffect } from "react";
import { useCampus } from "../context/CampusContext";
import {
  UserRound,
  Bell,
  Palette,
  ShieldCheck,
  Camera,
  Save,
  Mail,
  Phone,
  GraduationCap,
  Lock,
  Eye,
  Moon,
  Sun,
  Monitor,
  Globe,
  Smartphone,
  MessageSquare,
  CalendarDays,
  Megaphone,
  ChevronRight,
  Check,
  CheckCircle2,
} from "lucide-react";

import "./Settings.css";

function Settings() {
  const { profile: contextProfile, updateProfile: contextUpdateProfile, theme: contextTheme, setTheme: contextSetTheme } = useCampus();
  const [activeTab, setActiveTab] = useState("Profile");
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [profile, setProfile] = useState(() => ({
    fullName: contextProfile.fullName || "Olivia Emma",
    username: contextProfile.username || "olivia",
    email: contextProfile.email || "olivia@example.com",
    phone: contextProfile.phone || "+1 (555) 234-5678",
    department: contextProfile.department || "Computer Science & Engineering",
    bio: contextProfile.bio || "Undergraduate student exploring intelligent systems, web engineering, and campus culture.",
  }));

  const [notifications, setNotifications] = useState(() => {
    const savedNotifs = localStorage.getItem("orbit_notifs");
    return savedNotifs
      ? JSON.parse(savedNotifs)
      : {
          announcements: true,
          events: true,
          messages: true,
          community: true,
          email: true,
          push: true,
        };
  });

  const [appearance, setAppearance] = useState(contextTheme || "Dark");

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showEmail: false,
    showActivity: true,
  });

  useEffect(() => {
    applyTheme(appearance);
  }, [appearance]);

  const applyTheme = (themeName) => {
    contextSetTheme(themeName);
  };

  const tabs = [
    { name: "Profile", icon: UserRound },
    { name: "Notifications", icon: Bell },
    { name: "Appearance", icon: Palette },
    { name: "Privacy", icon: ShieldCheck },
  ];

  const updateProfile = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  const toggleNotification = (key) => {
    setNotifications((current) => {
      const updated = { ...current, [key]: !current[key] };
      localStorage.setItem("orbit_notifs", JSON.stringify(updated));
      return updated;
    });
  };

  const togglePrivacy = (key) => {
    setPrivacy((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const saveSettings = (e) => {
    e.preventDefault();
    contextUpdateProfile(profile);
    contextSetTheme(appearance);
    setSaved(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="settings-page">
      {showToast && (
        <div style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          background: "#10b981",
          color: "#ffffff",
          padding: "12px 20px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "600",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          zIndex: 10000,
        }}>
          <CheckCircle2 size={18} />
          Settings saved successfully!
        </div>
      )}

      <header className="settings-topbar">
        <div className="settings-heading">
          <div className="settings-heading-icon">
            <Lock size={21} color="#22D3EE" />
          </div>

          <div>
            <h2>Settings & Preferences</h2>
            <p>Customize your profile, notifications, and theme</p>
          </div>
        </div>

        <div className="settings-top-profile">
          <div className="settings-online-dot"></div>
          <div className="settings-avatar-small">{contextProfile.avatarInitials || "OE"}</div>
        </div>
      </header>

      <main className="settings-content">
        <div className="settings-intro">
          <div>
            <span className="settings-eyebrow">PERSONAL CONTROL CENTER</span>
            <h1>Account Settings</h1>
            <p>
              Customize your public student profile, manage alerts, and control privacy.
            </p>
          </div>
        </div>

        <div className="settings-layout">
          <aside className="settings-navigation">
            <div className="settings-nav-user">
              <div className="settings-avatar-large">{contextProfile.avatarInitials || "OE"}</div>
              <div>
                <h3>{profile.fullName}</h3>
                <p>@{profile.username}</p>
              </div>
            </div>

            <div className="settings-nav-links">
              <span className="settings-nav-label">GENERAL</span>

              {tabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.name}
                    className={activeTab === tab.name ? "active" : ""}
                    onClick={() => {
                      setActiveTab(tab.name);
                      setSaved(false);
                    }}
                  >
                    <Icon size={18} />
                    {tab.name}
                    <ChevronRight size={15} className="settings-nav-arrow" />
                  </button>
                );
              })}
            </div>

            <div className="settings-help">
              <ShieldCheck size={20} color="#22D3EE" />
              <h4>Account Security</h4>
              <p>Your preferences and credentials are encrypted and stored locally.</p>
            </div>
          </aside>

          <section className="settings-panel">
            <form onSubmit={saveSettings}>
              {activeTab === "Profile" && (
                <div className="settings-section">
                  <div className="settings-panel-heading">
                    <div>
                      <h2>Profile Information</h2>
                      <p>Update your personal details as seen across ORBIT campus.</p>
                    </div>
                    <UserRound size={23} color="#22D3EE" />
                  </div>

                  <div className="settings-profile-photo">
                    <div className="settings-photo-avatar">{contextProfile.avatarInitials || "OE"}</div>
                    <div>
                      <h3>Profile Avatar</h3>
                      <p>Avatar displayed in class discussions, forums, and team rosters.</p>
                      <button
                        type="button"
                        className="settings-upload-btn"
                        onClick={() => alert("Avatar photo upload dialog")}
                      >
                        <Camera size={15} />
                        Change photo
                      </button>
                    </div>
                  </div>

                  <div className="settings-form-grid">
                    <label>
                      Full Name
                      <div className="settings-input-wrap">
                        <UserRound size={17} />
                        <input
                          name="fullName"
                          value={profile.fullName}
                          onChange={updateProfile}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </label>

                    <label>
                      Username
                      <div className="settings-input-wrap">
                        <span>@</span>
                        <input
                          name="username"
                          value={profile.username}
                          onChange={updateProfile}
                          placeholder="Username"
                        />
                      </div>
                    </label>

                    <label>
                      Email Address
                      <div className="settings-input-wrap">
                        <Mail size={17} />
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={updateProfile}
                          placeholder="Email address"
                        />
                      </div>
                    </label>

                    <label>
                      Phone Number
                      <div className="settings-input-wrap">
                        <Phone size={17} />
                        <input
                          name="phone"
                          value={profile.phone}
                          onChange={updateProfile}
                          placeholder="Enter phone number"
                        />
                      </div>
                    </label>

                    <label className="settings-full-field">
                      Department / Major
                      <div className="settings-input-wrap">
                        <GraduationCap size={17} />
                        <input
                          name="department"
                          value={profile.department}
                          onChange={updateProfile}
                          placeholder="Your department"
                        />
                      </div>
                    </label>

                    <label className="settings-full-field">
                      About You
                      <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={updateProfile}
                        placeholder="Tell your campus community about yourself..."
                        rows="4"
                      />
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "Notifications" && (
                <div className="settings-section">
                  <div className="settings-panel-heading">
                    <div>
                      <h2>Notification Preferences</h2>
                      <p>Configure which alerts you receive across channels.</p>
                    </div>
                    <Bell size={23} color="#22D3EE" />
                  </div>

                  <h3 className="settings-subheading">CAMPUS UPDATES</h3>

                  <div className="settings-options">
                    {[
                      {
                        key: "announcements",
                        title: "Announcements",
                        description: "Important university and administration notices.",
                        icon: Megaphone,
                      },
                      {
                        key: "events",
                        title: "Campus Events & RSVP Reminders",
                        description: "Upcoming events and workshops.",
                        icon: CalendarDays,
                      },
                      {
                        key: "messages",
                        title: "Peer Messages",
                        description: "Direct conversations and group mentions.",
                        icon: MessageSquare,
                      },
                      {
                        key: "community",
                        title: "Community & Club Activity",
                        description: "Discussion replies and popular threads.",
                        icon: UsersRound,
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div className="settings-option" key={item.key}>
                          <div className="settings-option-icon">
                            <Icon size={19} />
                          </div>
                          <div className="settings-option-text">
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                          </div>
                          <button
                            type="button"
                            className={`settings-switch ${
                              notifications[item.key] ? "on" : ""
                            }`}
                            onClick={() => toggleNotification(item.key)}
                            aria-label={`Toggle ${item.title}`}
                          >
                            <span />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <h3 className="settings-subheading">DELIVERY METHODS</h3>

                  <div className="settings-options">
                    <div className="settings-option">
                      <div className="settings-option-icon">
                        <Mail size={19} />
                      </div>
                      <div className="settings-option-text">
                        <h4>Email Notifications</h4>
                        <p>Receive weekly digest and critical notices in inbox.</p>
                      </div>
                      <button
                        type="button"
                        className={`settings-switch ${
                          notifications.email ? "on" : ""
                        }`}
                        onClick={() => toggleNotification("email")}
                        aria-label="Toggle email notifications"
                      >
                        <span />
                      </button>
                    </div>

                    <div className="settings-option">
                      <div className="settings-option-icon">
                        <Smartphone size={19} />
                      </div>
                      <div className="settings-option-text">
                        <h4>Push Notifications</h4>
                        <p>Instant alerts on mobile and desktop browser.</p>
                      </div>
                      <button
                        type="button"
                        className={`settings-switch ${
                          notifications.push ? "on" : ""
                        }`}
                        onClick={() => toggleNotification("push")}
                        aria-label="Toggle push notifications"
                      >
                        <span />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Appearance" && (
                <div className="settings-section">
                  <div className="settings-panel-heading">
                    <div>
                      <h2>Appearance & Theme</h2>
                      <p>Switch between dark futuristic mode, crisp light mode, or system default.</p>
                    </div>
                    <Palette size={23} color="#22D3EE" />
                  </div>

                  <h3 className="settings-subheading">ACTIVE THEME</h3>

                  <div className="settings-theme-options">
                    {[
                      { name: "Dark", icon: Moon },
                      { name: "Light", icon: Sun },
                      { name: "System", icon: Monitor },
                    ].map((theme) => {
                      const Icon = theme.icon;

                      return (
                        <button
                          type="button"
                          key={theme.name}
                          className={`settings-theme-card ${
                            appearance === theme.name ? "selected" : ""
                          }`}
                          onClick={() => {
                            setAppearance(theme.name);
                            setSaved(false);
                          }}
                        >
                          <Icon size={25} />
                          <span>{theme.name}</span>
                          {appearance === theme.name && (
                            <Check size={17} className="theme-check" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="settings-info-note">
                    <Globe size={19} color="#22D3EE" />
                    <p>
                      Theme toggling is active in real time! Selecting <strong>Light</strong> or <strong>Dark</strong> applies instantly across all screens.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "Privacy" && (
                <div className="settings-section">
                  <div className="settings-panel-heading">
                    <div>
                      <h2>Privacy & Permissions</h2>
                      <p>Control visibility of your student profile and activity.</p>
                    </div>
                    <ShieldCheck size={23} color="#22D3EE" />
                  </div>

                  <h3 className="settings-subheading">PROFILE VISIBILITY</h3>

                  <div className="settings-options">
                    {[
                      {
                        key: "showProfile",
                        title: "Public Student Profile",
                        description: "Allow classmates and study partners to find you.",
                      },
                      {
                        key: "showEmail",
                        title: "Display Email Publicly",
                        description: "Show contact email on your campus profile card.",
                      },
                      {
                        key: "showActivity",
                        title: "Community Activity Feed",
                        description: "Display recent posts and events you are attending.",
                      },
                    ].map((item) => (
                      <div className="settings-option" key={item.key}>
                        <div className="settings-option-icon">
                          <Eye size={19} />
                        </div>
                        <div className="settings-option-text">
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                        <button
                          type="button"
                          className={`settings-switch ${
                            privacy[item.key] ? "on" : ""
                          }`}
                          onClick={() => togglePrivacy(item.key)}
                          aria-label={`Toggle ${item.title}`}
                        >
                          <span />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="settings-save-area">
                <span className={saved ? "settings-saved" : ""}>
                  {saved ? (
                    <>
                      <Check size={15} /> All changes saved
                    </>
                  ) : (
                    "Unsaved changes"
                  )}
                </span>

                <button type="submit" className="settings-save-btn">
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Settings;
