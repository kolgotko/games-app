import { TestBed } from '@angular/core/testing';

import { GamesService } from './games.service';
import { HttpClientModule } from '@angular/common/http';

describe('GamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
  }));

  it('should be created', () => {
    const service: GamesService = TestBed.get(GamesService);
    expect(service).toBeTruthy();
  });
});
