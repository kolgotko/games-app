import { TestBed } from '@angular/core/testing';

import { GameXrefGenresService } from './game-xref-genres.service';

describe('GameXrefGenresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameXrefGenresService = TestBed.get(GameXrefGenresService);
    expect(service).toBeTruthy();
  });
});
