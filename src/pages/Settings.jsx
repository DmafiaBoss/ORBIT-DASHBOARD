import { useState } from "react";
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
} from "lucide-react";

import "./Settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Olivia Emma",
    username: "olivia",
    email: "olivia@example.com",
    phone: "",
    department: "Computer Science",
    bio: "Student exploring technology and building amazing things.",
  });

  const [notifications, setNotifications] = useState({
    announcements: true,
    events: true,
    messages: true,
    community: false,
    email: true,
    push: true,
  });

  const [appearance, setAppearance] = useState("Dark");

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showEmail: false,
    showActivity: true,
  });

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
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const togglePrivacy = (key) => {
    setPrivacy((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const saveSettings = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div className="settings-page">
      <header className="settings-topbar">
        <div className="settings-heading">
          <div className="settings-heading-icon">
            <Lock size={21} />
          </div>

          <div>
            <h2>Settings</h2>
            <p>Manage your ORBIT experience</p>
          </div>
        </div>

        <div className="settings-top-profile">
          <div className="settings-online-dot"></div>
          <div className="settings-avatar-small">OE</div>
        </div>
      </header>

      <main className="settings-content">
        <div className="settings-intro">
          <div>
            <span className="settings-eyebrow">PERSONAL CONTROL CENTER</span>
            <h1>Account Settings</h1>
            <p>
              Customize your account, manage preferences and control
              your experience on ORBIT.
            </p>
          </div>
        </div>

        <div className="settings-layout">
          <aside className="settings-navigation">
            <div className="settings-nav-user">
              <div className="settings-avatar-large">OE</div>
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
                    className={
                      activeTab === tab.name ? "active" : ""
                    }
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
              <ShieldCheck size={20} />
              <h4>Your account, your control.</h4>
              <p>
                Manage your personal information and preferences
                securely.
              </p>
            </div>
          </aside>

          <section className="settings-panel">
            <form onSubmit={saveSettings}>
              {activeTab === "Profile" && (
                <div className="settings-section">
                  <div className="settings-panel-heading">
                    <div>
                      <h2>Profile Information</h2>
                      <p>
                        Update your personal details and how others
                        see you on ORBIT.
                      </p>
                    </div>
                    <UserRound size={23} />
                  </div>

                  <div className="settings-profile-photo">
                    <div className="settings-photo-avatar">OE</div>
                    <div>
                      <h3>Profile Picture</h3>
                      <p>Choose a picture to represent your account.</p>
                      <button
                        type="button"
                        className="settings-upload-btn"
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
                      Department
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
                      <p>
                        Choose what you want ORBIT to notify you about.
                      </p>
                    </div>
                    <Bell size={23} />
                  </div>

                  <h3 className="settings-subheading">
                    CAMPUS UPDATES
                  </h3>

                  <div className="settings-options">
                    {[
                      {
                        key: "announcements",
                        title: "Announcements",
                        description: "Important school news and updates.",
                        icon: Megaphone,
                      },
                      {
                        key: "events",
                        title: "Campus Events",
                        description: "Upcoming events and activities.",
                        icon: CalendarDays,
                      },
                      {
                        key: "messages",
                        title: "Messages",
                        description: "Messages and direct conversations.",
                        icon: MessageSquare,
                      },
                      {
                        key: "community",
                        title: "Community Activity",
                        description: "Updates from your campus community.",
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
                            onClick={() =>
                              toggleNotification(item.key)
                            }
                            aria-label={`Toggle ${item.title}`}
                          >
                            <span />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <h3 className="settings-subheading">
                    DELIVERY METHODS
                  </h3>

                  <div className="settings-options">
                    <div className="settings-option">
                      <div className="settings-option-icon">
                        <Mail size={19} />
                      </div>
                      <div className="settings-option-text">
                        <h4>Email Notifications</h4>
                        <p>Receive updates through your email.</p>
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
                        <p>Receive notifications on your device.</p>
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
                      <h2>Appearance</h2>
                      <p>
                        Personalize how ORBIT looks on your device.
                      </p>
                    </div>
                    <Palette size={23} />
                  </div>

                  <h3 className="settings-subheading">THEME</h3>

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
                    <Globe size={19} />
                    <p>
                      Theme selection is saved in this demo interface.
                      Full app-wide theme switching will be connected
                      when we polish the shared ORBIT layout.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "Privacy" && (
                <div className="settings-section">
                  <div className="settings-panel-heading">
                    <div>
                      <h2>Privacy & Security</h2>
                      <p>
                        Control what other students can see about you.
                      </p>
                    </div>
                    <ShieldCheck size={23} />
                  </div>

                  <h3 className="settings-subheading">
                    PROFILE VISIBILITY
                  </h3>

                  <div className="settings-options">
                    {[
                      {
                        key: "showProfile",
                        title: "Public Profile",
                        description:
                          "Allow other students to view your profile.",
                      },
                      {
                        key: "showEmail",
                        title: "Show Email Address",
                        description:
                          "Allow your email to appear on your profile.",
                      },
                      {
                        key: "showActivity",
                        title: "Activity Visibility",
                        description:
                          "Allow others to see your community activity.",
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

                  <div className="settings-security-note">
                    <ShieldCheck size={22} />
                    <div>
                      <h4>Your privacy matters</h4>
                      <p>
                        Your account information should only be shared
                        according to the preferences you choose.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="settings-save-area">
                <span className={saved ? "settings-saved" : ""}>
                  {saved ? (
                    <>
                      <Check size={15} /> Changes saved
                    </>
                  ) : (
                    "Changes are not saved yet"
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