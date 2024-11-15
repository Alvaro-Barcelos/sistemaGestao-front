import { TestBed } from '@angular/core/testing';

import { TipoAtendimentoService } from './tipo-atendimento.service';

describe('TipoAtendimentoService', () => {
  let service: TipoAtendimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAtendimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
