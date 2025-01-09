import { useEffect, useState } from "react";
import gamesService, { Game, Games } from "@/services/gamesService";
import { CanceledError } from "@/services/apiClient";

const useGames = () => {
  const [games, setGames] = useState<Game[]>();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { request, cancel } = gamesService.getAll<Games>();
    request
      .then((response) => {
        setGames(response.data.results);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          return;
        } else {
          setErrorMessage(error.message);
        }
      });
    return () => cancel();
  }, []);

  return {
    games,
    errorMessage,
  };
};

export default useGames;
