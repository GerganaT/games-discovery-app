import create from "@/services/httpService";

export interface Games {
  results: Game[];
}

export interface Game {
  id: number;
  name: string;
  updated: string;
  released: string;
  rating: number;
  metacritic: number;
  background_image: string;
  ratings: [
    {
      title: string;
    }
  ];
  parent_platforms: PlatformType[];
  genres: GameGenre[];
}

export interface PlatformType {
    platform: Platform;
}

export interface Platform {
    name: string;
}

export interface GameGenre {
  id: number;
  name: string;
  image_background: string;
}

const allGamesEndpoint = "/games";

export default  create(allGamesEndpoint);
