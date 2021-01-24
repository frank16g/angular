import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePedidosRealizadosComponent } from './cliente-pedidos-realizados.component';

describe('ClientePedidosRealizadosComponent', () => {
  let component: ClientePedidosRealizadosComponent;
  let fixture: ComponentFixture<ClientePedidosRealizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientePedidosRealizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePedidosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
