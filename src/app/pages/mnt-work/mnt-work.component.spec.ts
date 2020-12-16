import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MntWorkComponent } from './mnt-work.component';

describe('MntWorkComponent', () => {
  let component: MntWorkComponent;
  let fixture: ComponentFixture<MntWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MntWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MntWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
