import { TestBed } from '@angular/core/testing';

import { GenresService } from './genres.service';
import { HttpClientModule } from '@angular/common/http';

describe('GenresService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
  }));

  it('should be created', () => {
    const service: GenresService = TestBed.get(GenresService);
    expect(service).toBeTruthy();
  });
});
