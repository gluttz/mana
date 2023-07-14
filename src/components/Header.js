import { Link } from "react-router-dom";
import bell from "../assets/images/bell.png";
import React, { useState } from "react";
import { useAppContext } from "../AppProvider";

export default function Header() {
    const { isDarkTheme, setIsDarkTheme, user, setUser } = useAppContext();

    const [userNavOpen, setUserNavOpen] = useState(false);
    const [isStoreHovered, setIsStoreHovered] = useState(false);
    const [isCommunityHovered, setIsCommunityHovered] = useState(false);
    const [isProfileHovered, setIsProfileHovered] = useState(false);

    return (
        <header className="dark-theme header">
            <div className="header-content">
                <Link to="/" className="logo">
                    <img
                        src="https://img.icons8.com/ios-filled/60/mana.png"
                        alt="Mana Icon"
                        className="mana-icon"
                    />
                    <h1>Mana</h1>
                    <span>™</span>
                </Link>
                <ul className="header-nav">
                    <li
                        onMouseEnter={() => {
                            setIsStoreHovered(true);
                        }}
                        onMouseLeave={() => {
                            setIsStoreHovered(false);
                        }}
                    >
                        <Link to="/store">STORE</Link>
                        {isStoreHovered && (
                            <div className="hover-nav">
                                <ul>
                                    <li>
                                        <Link>Home</Link>
                                    </li>
                                    <li>
                                        <Link>Discovery Queue</Link>
                                    </li>
                                    <li>
                                        <Link>Wishlist</Link>
                                    </li>
                                    <li>
                                        <Link>Points Shop</Link>
                                    </li>
                                    <li>
                                        <Link>News</Link>
                                    </li>
                                    <li>
                                        <Link>Stats</Link>
                                    </li>
                                    <li>
                                        <Link>About</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li
                        onMouseEnter={() => {
                            setIsCommunityHovered(true);
                        }}
                        onMouseLeave={() => {
                            setIsCommunityHovered(false);
                        }}
                    >
                        <Link to="/community">COMMUNITY</Link>
                        {isCommunityHovered && (
                            <div className="hover-nav">
                                <ul>
                                    <li>
                                        <Link>Home</Link>
                                    </li>
                                    <li>
                                        <Link>Discussions</Link>
                                    </li>
                                    <li>
                                        <Link>Workshop</Link>
                                    </li>
                                    <li>
                                        <Link>Market</Link>
                                    </li>
                                    <li>
                                        <Link>Broadcasts</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li
                        onMouseEnter={() => {
                            setIsProfileHovered(true);
                        }}
                        onMouseLeave={() => {
                            setIsProfileHovered(false);
                        }}
                    >
                        <Link to="/profile">{user.name.toUpperCase()}</Link>
                        {isProfileHovered && (
                            <div className="hover-nav">
                                <ul>
                                    <li>
                                        <Link>Activity</Link>
                                    </li>
                                    <li>
                                        <Link>Profile</Link>
                                    </li>
                                    <li>
                                        <Link>Friends</Link>
                                    </li>
                                    <li>
                                        <Link>Games</Link>
                                    </li>
                                    <li>
                                        <Link>Groups</Link>
                                    </li>
                                    <li>
                                        <Link>Content</Link>
                                    </li>
                                    <li>
                                        <Link>Badges</Link>
                                    </li>
                                    <li>
                                        <Link>Inventory</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                    <li>
                        <Link to="/chat">CHAT</Link>
                    </li>
                    <li>
                        <Link to="/support">SUPPORT</Link>
                    </li>
                </ul>
                <div className="header-user">
                    <div className="header-user-content">
                        <div className="install-btn">
                            <img
                                src="https://community.cloudflare.steamstatic.com/public/shared/images/header/btn_header_installsteam_download.png?v=1"
                                alt=""
                            />
                            Install Mana
                        </div>
                        <div className="header-user-alerts">
                            <img src={bell} alt="" />
                        </div>
                        <div className="user-nav-container">
                            <div
                                className="user-nav-btn"
                                onClick={() => {
                                    setUserNavOpen(!userNavOpen);
                                }}
                            >
                                <div className="user-nav-btn-name">
                                    {user.name.charAt(0).toUpperCase() +
                                        user.name.slice(1)}
                                </div>
                                <span className="caret"></span>
                            </div>

                            <ul
                                className={
                                    userNavOpen
                                        ? "user-nav user-nav-open"
                                        : "user-nav user-nav-closed"
                                }
                            >
                                <li>
                                    <Link to="/profile">View Profile</Link>
                                </li>
                                <li>
                                    <Link to="/account">Account Details</Link>
                                </li>
                                <li>
                                    <Link to="/profile">
                                        Logout: {user.name}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/profile">Preferences</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Change Language</Link>
                                </li>
                            </ul>
                            <div className="balance">${user.balance}</div>
                        </div>
                        <div className="header-user-content-avatar">
                            <img src={user.avatar} alt="user-image" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
