import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoatendimentodetailsComponent } from './tipoatendimentodetails.component';

describe('TipoatendimentodetailsComponent', () => {
  let component: TipoatendimentodetailsComponent;
  let fixture: ComponentFixture<TipoatendimentodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoatendimentodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoatendimentodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
