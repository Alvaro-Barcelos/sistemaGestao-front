import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentodetailsComponent } from './atendimentodetails.component';

describe('AtendimentodetailsComponent', () => {
  let component: AtendimentodetailsComponent;
  let fixture: ComponentFixture<AtendimentodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtendimentodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
