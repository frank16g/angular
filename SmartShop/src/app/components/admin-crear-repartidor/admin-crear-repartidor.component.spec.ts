import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrearRepartidorComponent } from './admin-crear-repartidor.component';

describe('AdminCrearRepartidorComponent', () => {
  let component: AdminCrearRepartidorComponent;
  let fixture: ComponentFixture<AdminCrearRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCrearRepartidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrearRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
