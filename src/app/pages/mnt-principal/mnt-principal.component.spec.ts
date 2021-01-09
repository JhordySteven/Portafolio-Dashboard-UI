import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MntPrincipalComponent } from './mnt-principal.component';

describe('MntPrincipalComponent', () => {
  let component: MntPrincipalComponent;
  let fixture: ComponentFixture<MntPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MntPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MntPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
