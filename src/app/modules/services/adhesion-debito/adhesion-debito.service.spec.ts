import { TestBed } from '@angular/core/testing';

import { AdhesionDebitoService } from './adhesion-debito.service';

describe('AdhesionDebitoService', () => {
  let service: AdhesionDebitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdhesionDebitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
