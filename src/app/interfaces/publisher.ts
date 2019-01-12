import { Game } from './game';

export interface Publisher {

  publisherId: number;
  name: string;
  game: Game[];

}
