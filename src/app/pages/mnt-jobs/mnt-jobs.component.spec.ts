import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MntJobsComponent } from './mnt-jobs.component';

describe('MntJobsComponent', () => {
  let component: MntJobsComponent;
  let fixture: ComponentFixture<MntJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MntJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MntJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
