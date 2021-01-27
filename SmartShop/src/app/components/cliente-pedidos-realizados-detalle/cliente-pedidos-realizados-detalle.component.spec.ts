import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePedidosRealizadosDetalleComponent } from './cliente-pedidos-realizados-detalle.component';

describe('ClientePedidosRealizadosDetalleComponent', () => {
  let component: ClientePedidosRealizadosDetalleComponent;
  let fixture: ComponentFixture<ClientePedidosRealizadosDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientePedidosRealizadosDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePedidosRealizadosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
