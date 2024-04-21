import { TestBed } from '@angular/core/testing';

import { ValidadorCustomizadoService } from './validador-customizado.service';

describe('ValidadorCustomizadoService', () => {
  let service: ValidadorCustomizadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidadorCustomizadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
