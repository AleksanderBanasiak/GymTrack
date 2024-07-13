import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseInSessionComponent } from './exercise-in-session.component';

describe('ExerciseInSessionComponent', () => {
  let component: ExerciseInSessionComponent;
  let fixture: ComponentFixture<ExerciseInSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseInSessionComponent]
    });
    fixture = TestBed.createComponent(ExerciseInSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
