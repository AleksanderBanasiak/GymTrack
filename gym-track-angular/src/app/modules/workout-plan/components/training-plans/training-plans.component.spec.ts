import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlansComponent } from './training-plans.component';

describe('TrainingPlansComponent', () => {
  let component: TrainingPlansComponent;
  let fixture: ComponentFixture<TrainingPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingPlansComponent]
    });
    fixture = TestBed.createComponent(TrainingPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
