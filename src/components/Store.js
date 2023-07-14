import React, { useEffect, useRef, useState } from "react";
import Carousel from "./Carousel";
import useFetchGames from "./hooks/useFetchGames";
import Advertisement from "./Advertisement";
import "../styles/Store.css";
import GameGrid from "./GameGrid";

const Store = () => {
    const [gamePage, setGamePage] = useState(1);
    const [sort, setSort] = useState(
        "name" ||
            "released" ||
            "added" ||
            "created" ||
            "updated" ||
            "rating" ||
            "metacritic"
    );
    //genres: action, indie, adventure, role-playing-games-rpg, strategy, shooter,
    //        casual, simulation, puzzle, arcade, platformer, massively-multiplayer,
    //        racing, sports, fighting, family, board-games, educational, card,
    //        point-and-click, turn-based-strategy-tbs, horror, tactical, trivia,
    //        music
    const [gameFilters, setGameFilters] = useState([]);
    const { gameData: gameList, loadingGames } = useFetchGames(
        gamePage,
        sort,
        gameFilters
    );
    const scrollRef = useRef(null);

    return (
        <div className="store">
            <div className="store-hero">
                <div className="store-hero-nav"></div>
            </div>
            {
                <Carousel
                    games={gameList.slice(0, 20)}
                    setGamePage={setGamePage}
                />
            }
            <Advertisement />
            <GameGrid games={gameList.slice(20, 40)} />
        </div>
    );
};

export default Store;

//option 1 - clear cache on sort/filter change
