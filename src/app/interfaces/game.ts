import { GameXrefGenre } from "./game-xref-genre";
import { Developer } from "./developer";
import { Publisher } from "./publisher";
import { Genre } from "./genre";

export interface Game {

  gameId: string;
  name: string;
  description: string;
  developerId: number;
  piblisherId: number;
  developer?: Developer;
  publisher?: Publisher;
  gameXrefGenre: GameXrefGenre[];

}
