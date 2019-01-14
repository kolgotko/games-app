import { GameXrefGenre } from "./game-xref-genre";
import { Developer } from "./developer";
import { Publisher } from "./publisher";
import { Genre } from "./genre";

export interface Game {

  gameId: number;
  name: string;
  description: string;
  developerId: number;
  publisherId?: number;
  developer?: Developer;
  publisher?: Publisher;
  gameXrefGenre?: GameXrefGenre[];

}
