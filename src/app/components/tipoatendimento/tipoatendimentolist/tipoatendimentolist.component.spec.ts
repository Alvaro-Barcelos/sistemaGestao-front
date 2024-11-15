import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoatendimentolistComponent } from './tipoatendimentolist.component';

describe('TipoatendimentolistComponent', () => {
  let component: TipoatendimentolistComponent;
  let fixture: ComponentFixture<TipoatendimentolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoatendimentolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoatendimentolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
