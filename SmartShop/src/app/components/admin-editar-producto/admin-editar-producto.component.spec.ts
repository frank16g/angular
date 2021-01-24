import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditarProductoComponent } from './admin-editar-producto.component';

describe('AdminEditarProductoComponent', () => {
  let component: AdminEditarProductoComponent;
  let fixture: ComponentFixture<AdminEditarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditarProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
