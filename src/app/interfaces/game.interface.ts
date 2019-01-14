import { GameXrefGenreInterface } from './game-xref-genre.interface';
import { DeveloperInterface } from './developer.interface';
import { PublisherInterface } from './publisher.interface';
import { GenreInterface } from './genre.interface';

export interface GameInterface {

  gameId: number;
  name: string;
  description: string;
  developerId: number;
  publisherId?: number;
  developer?: DeveloperInterface;
  publisher?: PublisherInterface;
  gameXrefGenre?: GameXrefGenreInterface[];

}

