import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMaestroComponent } from './gestion-maestro.component';

describe('GestionMaestroComponent', () => {
  let component: GestionMaestroComponent;
  let fixture: ComponentFixture<GestionMaestroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMaestroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
