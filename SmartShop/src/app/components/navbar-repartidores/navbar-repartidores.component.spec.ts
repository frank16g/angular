import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRepartidoresComponent } from './navbar-repartidores.component';

describe('NavbarRepartidoresComponent', () => {
  let component: NavbarRepartidoresComponent;
  let fixture: ComponentFixture<NavbarRepartidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarRepartidoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarRepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
