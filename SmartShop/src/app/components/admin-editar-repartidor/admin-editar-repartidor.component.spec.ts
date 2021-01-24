import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditarRepartidorComponent } from './admin-editar-repartidor.component';

describe('AdminEditarRepartidorComponent', () => {
  let component: AdminEditarRepartidorComponent;
  let fixture: ComponentFixture<AdminEditarRepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditarRepartidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditarRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
