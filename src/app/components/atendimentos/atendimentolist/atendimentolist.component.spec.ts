import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentolistComponent } from './atendimentolist.component';

describe('AtendimentolistComponent', () => {
  let component: AtendimentolistComponent;
  let fixture: ComponentFixture<AtendimentolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendimentolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtendimentolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
