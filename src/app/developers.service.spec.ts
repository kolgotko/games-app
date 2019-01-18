import { TestBed } from '@angular/core/testing';

import { DevelopersService } from './developers.service';
import { HttpClientModule } from '@angular/common/http';

describe('DevelopersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
  }));

  it('should be created', () => {
    const service: DevelopersService = TestBed.get(DevelopersService);
    expect(service).toBeTruthy();
  });
});
