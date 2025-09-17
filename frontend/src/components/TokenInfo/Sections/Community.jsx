import React from "react";
import "./Community.css";

export default function Community({ detailedData }) {
  if (!detailedData) return <div>Loading community data...</div>;

  const community = detailedData.community_data || {};
  const links = detailedData.links || {};

  const fmt = (n) =>
    typeof n === "number" && isFinite(n) ? n.toLocaleString() : "Unknown";

  const homepage = links.homepage?.[0];
  const twitter = links.twitter_screen_name;
  const reddit = links.reddit_url;
  const telegram = links.telegram_channel_identifier;
  const discord = links.discord_url;

  return (
    <div className="community-container">
      <h2 className="community-title">Community &amp; Socials</h2>

      <div className="community-links">
        {homepage && homepage.startsWith("http") && (
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            🌐 Official Website
          </a>
        )}
        {twitter && (
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            🐦 Twitter
          </a>
        )}
        {reddit && (
          <a href={reddit} target="_blank" rel="noopener noreferrer">
            📢 Reddit
          </a>
        )}
        {telegram && (
          <a
            href={`https://t.me/${telegram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            📩 Telegram
          </a>
        )}
        {discord && (
          <a href={discord} target="_blank" rel="noopener noreferrer">
            🎮 Discord
          </a>
        )}
      </div>

      <div className="community-stats">
        <p>
          🐦 Twitter Followers: <span>{fmt(community.twitter_followers)}</span>
        </p>
        <p>
          📢 Reddit Subscribers:{" "}
          <span>{fmt(community.reddit_subscribers)}</span>
        </p>
        <p>
          🗨️ Reddit Active Users (24h):{" "}
          <span>{fmt(Number(community.reddit_accounts_active_48h))}</span>
        </p>
      </div>
    </div>
  );
}
