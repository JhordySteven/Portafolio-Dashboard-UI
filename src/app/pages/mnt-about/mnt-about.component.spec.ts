import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MntAboutComponent } from './mnt-about.component';

describe('MntAboutComponent', () => {
  let component: MntAboutComponent;
  let fixture: ComponentFixture<MntAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MntAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MntAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
