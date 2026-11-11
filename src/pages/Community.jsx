import { useState } from "react";
import {
  Search,
  Bell,
  UsersRound,
  Heart,
  MessageCircle,
  Share2,
  Image,
  Send,
  Plus,
  TrendingUp,
  Hash,
  MoreHorizontal,
  GraduationCap,
  Code,
  Trophy,
  Music,
} from "lucide-react";

import "./Community.css";

function Community() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [postText, setPostText] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Daniel Johnson",
      username: "@danielj",
      avatar: "DJ",
      time: "15 mins ago",
      category: "Technology",
      content:
        "Just completed my first React project! The journey has been challenging, but seeing everything come together feels amazing. What's everyone currently building?",
      likes: 24,
      comments: 8,
      liked: false,
      color: "blue",
    },
    {
      id: 2,
      name: "Sarah Williams",
      username: "@sarahw",
      avatar: "SW",
      time: "1 hour ago",
      category: "Campus Life",
      content:
        "Reminder: The campus cultural night is happening this Friday! Who else is excited? 🎉",
      likes: 42,
      comments: 13,
      liked: false,
      color: "purple",
    },
    {
      id: 3,
      name: "Michael Adams",
      username: "@mikeadams",
      avatar: "MA",
      time: "3 hours ago",
      category: "Academics",
      content:
        "Does anyone have good resources for understanding data structures and algorithms? I'm preparing for next week's assessment.",
      likes: 16,
      comments: 5,
      liked: false,
      color: "orange",
    },
  ]);

  const categories = [
    "All",
    "Technology",
    "Academics",
    "Campus Life",
    "Sports",
  ];

  const groups = [
    { name: "Tech Enthusiasts", members: "1.2k members", icon: Code },
    { name: "Campus Developers", members: "856 members", icon: GraduationCap },
    { name: "Sports Community", members: "642 members", icon: Trophy },
    { name: "Music & Entertainment", members: "420 members", icon: Music },
  ];

  const trending = [
    "#CampusLife",
    "#TechMeetup",
    "#Examination2026",
    "#StudentDevelopers",
    "#CampusSports",
  ];

  const toggleLike = (id) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const createPost = (e) => {
    e.preventDefault();

    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      name: "Olivia Emma",
      username: "@olivia",
      avatar: "OE",
      time: "Just now",
      category: "Campus Life",
      content: postText,
      likes: 0,
      comments: 0,
      liked: false,
      color: "cyan",
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setPostText("");
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    const matchesSearch =
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="community-page">
      <header className="community-topbar">
        <div className="community-page-title">
          <div className="community-title-icon">
            <UsersRound size={22} />
          </div>

          <div>
            <h2>Community</h2>
            <p>Connect with your campus</p>
          </div>
        </div>

        <div className="community-top-actions">
          <div className="community-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search community..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="community-notification">
            <Bell size={20} />
            <span></span>
          </button>

          <div className="community-profile">OE</div>
        </div>
      </header>

      <main className="community-content">
        <section className="community-welcome">
          <div>
            <span className="community-eyebrow">ORBIT NETWORK</span>
            <h1>Your campus. Your people.</h1>
            <p>
              Share ideas, meet people, and stay connected with your
              campus community.
            </p>
          </div>

          <div className="community-welcome-icon">
            <UsersRound size={75} />
          </div>
        </section>

        <div className="community-layout">
          <section className="community-feed">
            <div className="community-section-heading">
              <div>
                <h2>Campus Feed</h2>
                <p>What's happening around you?</p>
              </div>

              <button
                className="community-create-shortcut"
                onClick={() =>
                  document
                    .getElementById("community-post-input")
                    ?.focus()
                }
              >
                <Plus size={17} />
                Create post
              </button>
            </div>

            <form className="community-create-post" onSubmit={createPost}>
              <div className="community-user-avatar cyan">OE</div>

              <div className="community-post-input-area">
                <textarea
                  id="community-post-input"
                  placeholder="Share something with your campus..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  rows="2"
                />

                <div className="community-post-tools">
                  <span>
                    <Image size={17} />
                    Media
                  </span>

                  <button type="submit" disabled={!postText.trim()}>
                    Post
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </form>

            <div className="community-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category ? "active" : ""
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="community-post-list">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <article className="community-post-card" key={post.id}>
                    <div className="community-post-header">
                      <div className={`community-user-avatar ${post.color}`}>
                        {post.avatar}
                      </div>

                      <div className="community-post-user">
                        <h3>{post.name}</h3>
                        <p>
                          {post.username} <span>·</span> {post.time}
                        </p>
                      </div>

                      <button className="community-more">
                        <MoreHorizontal size={21} />
                      </button>
                    </div>

                    <span className="community-post-category">
                      {post.category}
                    </span>

                    <p className="community-post-text">
                      {post.content}
                    </p>

                    <div className="community-post-stats">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>

                    <div className="community-post-actions">
                      <button
                        className={post.liked ? "liked" : ""}
                        onClick={() => toggleLike(post.id)}
                      >
                        <Heart
                          size={18}
                          fill={post.liked ? "currentColor" : "none"}
                        />
                        Like
                      </button>

                      <button>
                        <MessageCircle size={18} />
                        Comment
                      </button>

                      <button>
                        <Share2 size={18} />
                        Share
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="community-empty">
                  <Search size={30} />
                  <h3>No posts found</h3>
                  <p>Try another search or category.</p>
                </div>
              )}
            </div>
          </section>

          <aside className="community-sidebar">
            <div className="community-side-card">
              <div className="community-side-heading">
                <h3>
                  <TrendingUp size={18} />
                  Trending topics
                </h3>
              </div>

              <div className="community-trending-list">
                {trending.map((topic, index) => (
                  <button
                    key={topic}
                    onClick={() => setSearch(topic.replace("#", ""))}
                  >
                    <span className="trending-number">0{index + 1}</span>
                    <span>{topic}</span>
                    <Hash size={15} />
                  </button>
                ))}
              </div>
            </div>

            <div className="community-side-card">
              <div className="community-side-heading">
                <h3>
                  <UsersRound size={18} />
                  Popular groups
                </h3>

                <button>Explore</button>
              </div>

              <div className="community-groups-list">
                {groups.map((group, index) => {
                  const GroupIcon = group.icon;

                  return (
                    <div className="community-group" key={group.name}>
                      <div className={`community-group-icon group-${index}`}>
                        <GroupIcon size={19} />
                      </div>

                      <div className="community-group-info">
                        <h4>{group.name}</h4>
                        <p>{group.members}</p>
                      </div>

                      <button className="community-join-btn">
                        Join
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="community-side-banner">
              <span>ORBIT COMMUNITY</span>
              <h3>Better together.</h3>
              <p>
                Your campus experience is bigger when you connect with
                others.
              </p>
              <UsersRound size={48} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Community;