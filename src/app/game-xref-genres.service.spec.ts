import { TestBed } from '@angular/core/testing';

import { GameXrefGenresService } from './game-xref-genres.service';
import { HttpClientModule } from '@angular/common/http';

describe('GameXrefGenresService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
  }));

  it('should be created', () => {
    const service: GameXrefGenresService = TestBed.get(GameXrefGenresService);
    expect(service).toBeTruthy();
  });
});
