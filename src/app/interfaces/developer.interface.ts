import { GameInterface } from './game.interface';

export interface DeveloperInterface {

  developerId: number;
  name: string;
  game?: GameInterface[];

}

