import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCantidadProductoComponent } from './cliente-cantidad-producto.component';

describe('ClienteCantidadProductoComponent', () => {
  let component: ClienteCantidadProductoComponent;
  let fixture: ComponentFixture<ClienteCantidadProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteCantidadProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCantidadProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
