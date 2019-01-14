import { Genre } from "./genre";

export interface GameXrefGenre {

  gameId: number;
  genreId: number;
  genre?: Genre;

}
