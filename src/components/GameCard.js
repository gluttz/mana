import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import xbox from "../assets/images/xbox-logo.png";
import playstation from "../assets/images/playstation-logo.png";
import nintendo from "../assets/images/nintendo.png";
import apple from "../assets/images/apple.png";
import steam from "../assets/images/steam.png";
import linux from "../assets/images/linux.png";
import star from "../assets/images/star.png";
import android from "../assets/images/android.png";
import arrow from "../assets/images/right-arrow.png";
import sega from "../assets/images/sega.png";
import "../styles/card.css";

const GameCard = React.memo(({ game }) => {
    const [cardHovered, setCardHovered] = useState(false);
    const handleMouseEnter = useCallback(() => {
        setCardHovered(true);
    });
    const handleMouseLeave = useCallback(() => {
        setCardHovered(false);
    });

    const uniquePlatforms = useMemo(
        () =>
            Array.from(
                new Set(game.platforms.map((obj) => obj.platform.slug))
            ).map((slug) =>
                game.platforms.find((obj) => obj.platform.slug === slug)
            ),
        [game.platforms]
    );

    const initialPrice = useMemo(
        () => getRandomPrice(uniquePlatforms[0]?.platform.slug).toFixed(2),
        [uniquePlatforms]
    );
    const discount = useMemo(() => Math.floor(Math.random() * 75), []);
    const newPrice = useMemo(
        () => (initialPrice - (initialPrice * discount) / 100).toFixed(2),
        [initialPrice]
    );

    const randomScreenshotIndex = Math.floor(
        Math.random() * game.short_screenshots.length
    );
    const [screenshotIndex, setScreenshotIndex] = useState(
        randomScreenshotIndex
    );

    const [disableAnimation, setDisableAnimation] = useState(false);

    return (
        <>
            <div
                key={game.id}
                className="game-card"
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
            >
                <div
                    style={{ backgroundImage: `url(${game.image})` }}
                    className="card-img-overlay"
                ></div>
                {!cardHovered && (
                    <div className="no-hover-game-card-overlay">
                        <div className="card-image-overlay">
                            <ul className="platforms-container">
                                {uniquePlatforms.map(({ platform }) => (
                                    <li key={crypto.randomUUID()}>
                                        <Link to="https://store.steampowered.com/">
                                            <img
                                                src={getPlatformIcon(
                                                    platform.slug
                                                )}
                                                alt="xbox-logo"
                                                className="platform-icon"
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="card-rating-container">
                                <div className="card-rating">{game.rating}</div>
                                <div className="card-rating-icon">
                                    <img src={star} alt="star-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="card-sale">
                    <div className="discount">{discount}%</div>
                    <div className="initial-price">${initialPrice}</div>
                    <div className="newPrice">${newPrice}</div>
                </div>
                {cardHovered && game.short_screenshots.length > 0 && (
                    <div className="ssContainer">
                        <img
                            src={arrow}
                            alt=">"
                            className="ssArrow ssRight"
                            onClick={() => {
                                setDisableAnimation(true);
                                setScreenshotIndex((old) => {
                                    if (
                                        old ===
                                        game.short_screenshots.length - 1
                                    ) {
                                        return 0;
                                    } else {
                                        return old + 1;
                                    }
                                });
                            }}
                        />
                        <img
                            src={arrow}
                            alt="<>>"
                            className="ssArrow ssLeft"
                            onClick={() => {
                                setDisableAnimation(true);
                                setScreenshotIndex((old) => {
                                    if (old === 0) {
                                        return (
                                            game.short_screenshots.length - 1
                                        );
                                    } else {
                                        return old - 1;
                                    }
                                });
                            }}
                        />
                        {game.short_screenshots.map((screenshot, index) => {
                            if (disableAnimation) {
                                return (
                                    <div
                                        className={
                                            index === screenshotIndex
                                                ? "game-screenshot-preview animation-disabled"
                                                : "game-screenshot-preview game-screenshot-preview-hidden"
                                        }
                                        style={{
                                            backgroundImage: `url(${screenshot.image})`,
                                        }}
                                        key={screenshot.id}
                                    ></div>
                                );
                            } else {
                                return (
                                    <div
                                        className={
                                            index === screenshotIndex
                                                ? "game-screenshot-preview"
                                                : "game-screenshot-preview game-screenshot-preview-hidden"
                                        }
                                        style={{
                                            backgroundImage: `url(${screenshot.image})`,
                                        }}
                                        key={screenshot.id}
                                    ></div>
                                );
                            }
                        })}
                    </div>
                )}
                <div
                    className={
                        cardHovered
                            ? "card-title-hovered card-title-overlay"
                            : "card-title-overlay"
                    }
                >
                    <h3>{game.name}</h3>

                    {cardHovered && (
                        <>
                            <div className="genres-container">
                                {game.genres.map((genre) => {
                                    return (
                                        <span
                                            className="genre"
                                            key={crypto.randomUUID()}
                                        >
                                            {genre}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className="cart-container">
                                <button type="button" className="cart-button">
                                    Add to Cart
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
});

function getPlatformIcon(platform) {
    switch (platform) {
        case "pc":
            return steam;
            break;
        case "playstation":
            return playstation;
            break;
        case "xbox":
            return xbox;
            break;
        case "nintendo":
            return nintendo;
            break;
        case "mac":
            return apple;
            break;
        case "linux":
            return linux;
            break;
        case "android":
            return android;
            break;
        case "ios":
            return apple;
            break;
        case "web":
            return steam;
        case "sega":
            return sega;
            break;
        default:
            throw new Error("Platform not found" + platform);
            return null;
    }
}

function getRandomPrice(platform) {
    let min;
    let max;
    switch (platform) {
        case "pc":
            min = 20;
            max = 60;
            break;
        case "playstation":
            min = 40;
            max = 60;
            break;
        case "xbox":
            min = 35;
            max = 55;
            break;
        case "nintendo":
            min = 30;
            max = 50;
            break;
        case "mac":
            min = 20;
            max = 40;
            break;
        case "linux":
            min = 15;
            max = 30;
            break;
        case "android":
            min = 5;
            max = 15;
            break;
        case "ios":
            min = 5;
            max = 15;
            break;
        case "web":
            return steam;
        default:
            throw new Error("Platform not found" + platform);
            return null;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default GameCard;
