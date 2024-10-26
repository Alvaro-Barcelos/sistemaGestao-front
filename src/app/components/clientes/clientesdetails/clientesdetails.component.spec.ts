import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesdetailsComponent } from './clientesdetails.component';

describe('ClientesdetailsComponent', () => {
  let component: ClientesdetailsComponent;
  let fixture: ComponentFixture<ClientesdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
