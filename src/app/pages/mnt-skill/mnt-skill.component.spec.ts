import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MntSkillComponent } from './mnt-skill.component';

describe('MntSkillComponent', () => {
  let component: MntSkillComponent;
  let fixture: ComponentFixture<MntSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MntSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MntSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
