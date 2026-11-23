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
  Check,
  CornerDownRight,
} from "lucide-react";
import { Link } from "react-router";
import { useCampus } from "../context/CampusContext";

import "./Community.css";

function Community() {
  const { profile } = useCampus();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [postText, setPostText] = useState("");
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState("");

  const [joinedGroups, setJoinedGroups] = useState({
    "Tech Enthusiasts": true,
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Daniel Johnson",
      username: "@danielj",
      avatar: "DJ",
      time: "15 mins ago",
      category: "Technology",
      content:
        "Just deployed my first full-stack React + Vite web app! The learning curve was steep, but seeing live interactive components feels super rewarding. What are other developers building right now?",
      likes: 24,
      comments: 2,
      liked: false,
      color: "blue",
      commentsList: [
        { id: 101, author: "Liam Chen", text: "Huge congratulations! What stack did you choose for the backend?", time: "10 mins ago" },
        { id: 102, author: "Daniel Johnson", text: "Thanks! Used Node.js and SQLite for testing.", time: "4 mins ago" },
      ],
    },
    {
      id: 2,
      name: "Sarah Williams",
      username: "@sarahw",
      avatar: "SW",
      time: "1 hour ago",
      category: "Campus Life",
      content:
        "Reminder: The campus cultural night and glow party is happening this Friday! Who else is going with their department? 🎉",
      likes: 42,
      comments: 1,
      liked: false,
      color: "purple",
      commentsList: [
        { id: 201, author: "Olivia Emma", text: "Our whole CS study group got tickets yesterday! See you there!", time: "45 mins ago" },
      ],
    },
    {
      id: 3,
      name: "Michael Adams",
      username: "@mikeadams",
      avatar: "MA",
      time: "3 hours ago",
      category: "Academics",
      content:
        "Does anyone have good lecture notes or study groups for Data Structures & Algorithms? Preparing early for the upcoming midterms.",
      likes: 16,
      comments: 1,
      liked: false,
      color: "orange",
      commentsList: [
        { id: 301, author: "Chloe Davis", text: "Check the student drive or join our study circle in the library at 4pm today!", time: "2 hours ago" },
      ],
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

  const toggleGroupJoin = (groupName) => {
    setJoinedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const createPost = (e) => {
    e.preventDefault();

    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      name: profile.fullName,
      username: `@${profile.username}`,
      avatar: profile.avatarInitials || "OE",
      time: "Just now",
      category: activeCategory === "All" ? "Campus Life" : activeCategory,
      content: postText,
      likes: 0,
      comments: 0,
      liked: false,
      color: "cyan",
      commentsList: [],
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setPostText("");
  };

  const addComment = (e, postId) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          const newComments = [
            ...(post.commentsList || []),
            {
              id: Date.now(),
              author: profile.fullName,
              text: commentInput,
              time: "Just now",
            },
          ];
          return {
            ...post,
            comments: newComments.length,
            commentsList: newComments,
          };
        }
        return post;
      })
    );
    setCommentInput("");
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
            <UsersRound size={22} color="#22D3EE" />
          </div>

          <div>
            <h2>Community Hub</h2>
            <p>Connect, collaborate, and share with your campus peers</p>
          </div>
        </div>

        <div className="community-top-actions">
          <div className="community-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search discussions, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link to="/notifications" className="community-notification" title="Alerts">
            <Bell size={20} />
            <span></span>
          </Link>

          <Link to="/settings" style={{ textDecoration: "none" }}>
            <div className="community-profile">{profile.avatarInitials || "OE"}</div>
          </Link>
        </div>
      </header>

      <main className="community-content">
        <section className="community-welcome">
          <div>
            <span className="community-eyebrow">ORBIT NETWORK</span>
            <h1>Your campus. Your people.</h1>
            <p>
              Share updates, explore study groups, discover clubs, and stay active in your campus culture.
            </p>
          </div>

          <div className="community-welcome-icon">
            <UsersRound size={75} color="#22D3EE" />
          </div>
        </section>

        <div className="community-layout">
          <section className="community-feed">
            <div className="community-section-heading">
              <div>
                <h2>Campus Feed</h2>
                <p>What's on your mind today?</p>
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
              <div className="community-user-avatar cyan">{profile.avatarInitials || "OE"}</div>

              <div className="community-post-input-area">
                <textarea
                  id="community-post-input"
                  placeholder="Share ideas, study tips, or questions with campus..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  rows="2"
                />

                <div className="community-post-tools">
                  <span style={{ cursor: "pointer" }} onClick={() => alert("Image attachment simulation active!")}>
                    <Image size={17} />
                    Photo / Media
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
                  className={activeCategory === category ? "active" : ""}
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

                      <button className="community-more" aria-label="Post options">
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

                      <button
                        onClick={() =>
                          setActiveCommentPostId(
                            activeCommentPostId === post.id ? null : post.id
                          )
                        }
                      >
                        <MessageCircle size={18} />
                        Comment ({post.comments})
                      </button>

                      <button onClick={() => alert("Post link copied to clipboard!")}>
                        <Share2 size={18} />
                        Share
                      </button>
                    </div>

                    {/* Expandable comments thread */}
                    {activeCommentPostId === post.id && (
                      <div style={{
                        marginTop: "16px",
                        paddingTop: "14px",
                        borderTop: "1px solid rgba(148, 163, 184, 0.12)",
                      }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "12px" }}>
                          {post.commentsList && post.commentsList.length > 0 ? (
                            post.commentsList.map((comm) => (
                              <div key={comm.id} style={{
                                background: "rgba(15, 23, 42, 0.7)",
                                padding: "10px 14px",
                                borderRadius: "10px",
                                fontSize: "13px",
                              }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                  <strong style={{ color: "#22D3EE" }}>{comm.author}</strong>
                                  <span style={{ fontSize: "11px", color: "#64748b" }}>{comm.time}</span>
                                </div>
                                <p style={{ margin: 0, color: "#cbd5e1" }}>{comm.text}</p>
                              </div>
                            ))
                          ) : (
                            <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>No comments yet. Start the conversation!</p>
                          )}
                        </div>

                        <form
                          onSubmit={(e) => addComment(e, post.id)}
                          style={{ display: "flex", gap: "8px" }}
                        >
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            style={{
                              flex: 1,
                              background: "rgba(15, 23, 42, 0.8)",
                              border: "1px solid rgba(148, 163, 184, 0.2)",
                              borderRadius: "8px",
                              padding: "8px 12px",
                              color: "#fff",
                              fontSize: "13px",
                              outline: "none",
                            }}
                          />
                          <button
                            type="submit"
                            style={{
                              background: "#22D3EE",
                              color: "#0f172a",
                              fontWeight: "bold",
                              border: "none",
                              borderRadius: "8px",
                              padding: "8px 14px",
                              cursor: "pointer",
                            }}
                          >
                            Reply
                          </button>
                        </form>
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <div className="community-empty">
                  <Search size={30} />
                  <h3>No posts found</h3>
                  <p>Try searching another keyword or selecting a different category.</p>
                </div>
              )}
            </div>
          </section>

          <aside className="community-sidebar">
            <div className="community-side-card">
              <div className="community-side-heading">
                <h3>
                  <TrendingUp size={18} color="#22D3EE" />
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
                  <UsersRound size={18} color="#a855f7" />
                  Campus Clubs
                </h3>
              </div>

              <div className="community-groups-list">
                {groups.map((group, index) => {
                  const GroupIcon = group.icon;
                  const isJoined = !!joinedGroups[group.name];

                  return (
                    <div className="community-group" key={group.name}>
                      <div className={`community-group-icon group-${index}`}>
                        <GroupIcon size={19} />
                      </div>

                      <div className="community-group-info">
                        <h4>{group.name}</h4>
                        <p>{group.members}</p>
                      </div>

                      <button
                        className="community-join-btn"
                        onClick={() => toggleGroupJoin(group.name)}
                        style={{
                          background: isJoined ? "rgba(16, 185, 129, 0.2)" : "rgba(34, 211, 238, 0.15)",
                          color: isJoined ? "#10b981" : "#22D3EE",
                          borderColor: isJoined ? "#10b981" : "rgba(34, 211, 238, 0.3)",
                        }}
                      >
                        {isJoined ? "Joined ✓" : "Join"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="community-side-banner">
              <span>ORBIT COMMUNITY</span>
              <h3>Stronger Together.</h3>
              <p>
                Collaborate with students in your major and join clubs that ignite your passion.
              </p>
              <UsersRound size={48} color="#22D3EE" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Community;
