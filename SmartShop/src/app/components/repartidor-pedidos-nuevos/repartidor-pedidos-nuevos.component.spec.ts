import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidorPedidosNuevosComponent } from './repartidor-pedidos-nuevos.component';

describe('RepartidorPedidosNuevosComponent', () => {
  let component: RepartidorPedidosNuevosComponent;
  let fixture: ComponentFixture<RepartidorPedidosNuevosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepartidorPedidosNuevosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartidorPedidosNuevosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
