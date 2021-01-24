import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRepartidoresComponent } from './admin-repartidores.component';

describe('AdminRepartidoresComponent', () => {
  let component: AdminRepartidoresComponent;
  let fixture: ComponentFixture<AdminRepartidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRepartidoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
