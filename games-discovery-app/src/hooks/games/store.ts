import { CanceledError } from "@/services/apiClient";
import gamesService, { Game, Games } from "@/services/gamesService";
import { create } from "zustand";

interface GamesStore {
  games: Game[];
  errorMessage: string;
  initialize: () => void;
}

const useGamesStore = create<GamesStore>((set) => ({
  games: [],
  errorMessage: "",
  initialize: () => {
    const { request, cancel } = gamesService.getAll<Games>();
    request
      .then((response) => {
        set({
          games: response.data.results,
        });
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          return;
        } else {
          set({
            errorMessage: error.message,
          });
        }
      });
    return () => cancel();
  },
}));
export default useGamesStore;
