import React from "react";
import GameCard from "./GameCard";
import "../styles/GameGrid.css";
const GameGrid = ({ games }) => {
    console.log(games);
    return (
        <div className="game-grid">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
};

export default GameGrid;
