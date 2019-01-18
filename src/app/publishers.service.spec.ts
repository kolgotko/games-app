import { TestBed } from '@angular/core/testing';

import { PublishersService } from './publishers.service';
import { HttpClientModule } from '@angular/common/http';

describe('PublishersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
  }));

  it('should be created', () => {
    const service: PublishersService = TestBed.get(PublishersService);
    expect(service).toBeTruthy();
  });
});
