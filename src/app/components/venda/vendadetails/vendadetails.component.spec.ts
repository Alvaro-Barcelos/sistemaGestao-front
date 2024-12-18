import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendadetailsComponent } from './vendadetails.component';

describe('VendadetailsComponent', () => {
  let component: VendadetailsComponent;
  let fixture: ComponentFixture<VendadetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendadetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendadetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
