import { useEffect, useRef, useState } from "react";

const useFetchGames = (page, sort = "rating", filters) => {
    const [gameData, setGameData] = useState({});
    const [loadingGames, setLoadingGames] = useState(false);
    const [statePage, setStatePage] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            const gameCacheKey = `page-${page}-${sort}`;
            const cache = JSON.parse(localStorage.getItem(gameCacheKey));

            if (cache) {
                setGameData((oldGameData) => ({
                    ...oldGameData,
                    [sort]: { ...(oldGameData[sort] || {}), [page]: cache },
                }));
            } else {
                try {
                    setLoadingGames(true);

                    const response = await fetch(
                        `https://api.rawg.io/api/games?key=1e5559eb1319489681ba17f7d21471c0&page=${page}`
                    );
                    const data = await response.json();

                    const processedData = data.results.map((game) => ({
                        slug: game.slug,
                        id: game.id,
                        name: game.name,
                        image: game.background_image,
                        rating: game.rating,
                        released: game.released,
                        platforms: game.parent_platforms,
                        genres: game.genres.map((genre) => genre.name),
                        ratings: game.ratings.map((rating) => ({
                            id: rating.id,
                            title: rating.title,
                            count: rating.count,
                        })),
                        ratingsCount: game.ratings_count,
                        short_screenshots: game.short_screenshots.map(
                            (screenshot) => ({
                                id: screenshot.id,
                                image: screenshot.image,
                            })
                        ),
                        stores: game.stores.map((store) => ({
                            id: store.id,
                            name: store.store.name,
                            domain: store.store.domain,
                        })),
                        tags: game.tags.map((tag) => ({
                            id: tag.id,
                            name: tag.name,
                        })),
                    }));

                    localStorage.setItem(
                        gameCacheKey,
                        JSON.stringify(processedData)
                    );
                    setGameData((oldGameData) => ({
                        ...oldGameData,
                        [sort]: {
                            ...(oldGameData[sort] || {}),
                            [page]: processedData,
                        },
                    }));
                    setLoadingGames(false);
                } catch (error) {
                    console.error("Error fetching games:", error);
                }
            }
        };

        fetchGames();
    }, [page, sort, filters, statePage, setStatePage]);

    return {
        gameData: Object.keys(gameData[sort] || {})
            .sort((a, b) => a - b)
            .flatMap((page) => gameData[sort][page]),
        loadingGames,
    };
};

export default useFetchGames;
