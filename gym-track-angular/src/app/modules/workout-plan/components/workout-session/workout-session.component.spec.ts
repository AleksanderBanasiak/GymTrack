import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutSessionComponent } from './workout-session.component';

describe('WorkoutSessionComponent', () => {
  let component: WorkoutSessionComponent;
  let fixture: ComponentFixture<WorkoutSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutSessionComponent]
    });
    fixture = TestBed.createComponent(WorkoutSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
