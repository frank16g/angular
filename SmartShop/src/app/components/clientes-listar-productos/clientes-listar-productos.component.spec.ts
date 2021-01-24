import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesListarProductosComponent } from './clientes-listar-productos.component';

describe('ClientesListarProductosComponent', () => {
  let component: ClientesListarProductosComponent;
  let fixture: ComponentFixture<ClientesListarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesListarProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesListarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
