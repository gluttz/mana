import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import arrow from "../assets/images/right-arrow.png";
import "../styles/Carousel.css";

const Carousel = ({ games, setGamePage }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        setGamePage((old) => old + 1);
    }, []);
    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => {
            if (prevIndex === 0) {
                return Math.ceil(games.length / 4) - 1;
            } else {
                return prevIndex - 1;
            }
        });
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => {
            if (prevIndex === Math.ceil(games.length / 4) - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
    };

    const handleRadioChange = (index) => {
        setActiveIndex(index);
    };

    if (games.length === 0) {
        return null;
    }

    return (
        <div className="carousel-container">
            <div className="carousel">
                {games.length &&
                    games
                        .slice(activeIndex * 4, activeIndex * 4 + 4)
                        .map((game) => <GameCard key={game.id} game={game} />)}
            </div>
            <div className="carousel-navigation">
                <img
                    className="carousel-prev arrow"
                    onClick={handlePrevClick}
                    src={arrow}
                ></img>
                <img
                    className="carousel-next arrow"
                    onClick={handleNextClick}
                    src={arrow}
                ></img>
            </div>
            <div className="carousel-radio">
                {games.slice(0, Math.ceil(games.length / 4)).map((_, index) => (
                    <label
                        className={
                            index === activeIndex
                                ? "radio-bubble active"
                                : "radio-bubble"
                        }
                        key={index}
                    >
                        <input
                            className="radio-input"
                            type="radio"
                            name="carousel-radio"
                            checked={index === activeIndex}
                            onChange={() => handleRadioChange(index)}
                        />
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
