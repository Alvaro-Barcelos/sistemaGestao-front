import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteslistComponent } from './clienteslist.component';

describe('ClienteslistComponent', () => {
  let component: ClienteslistComponent;
  let fixture: ComponentFixture<ClienteslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
