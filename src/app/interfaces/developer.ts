import { Game } from './game';

export interface Developer {

  developerId: number;
  name: string;
  game?: Game[];

}
