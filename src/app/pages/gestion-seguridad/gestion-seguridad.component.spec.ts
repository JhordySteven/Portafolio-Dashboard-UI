import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSeguridadComponent } from './gestion-seguridad.component';

describe('GestionSeguridadComponent', () => {
  let component: GestionSeguridadComponent;
  let fixture: ComponentFixture<GestionSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSeguridadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
