import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidorPedidosRealizadosComponent } from './repartidor-pedidos-realizados.component';

describe('RepartidorPedidosRealizadosComponent', () => {
  let component: RepartidorPedidosRealizadosComponent;
  let fixture: ComponentFixture<RepartidorPedidosRealizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepartidorPedidosRealizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartidorPedidosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
