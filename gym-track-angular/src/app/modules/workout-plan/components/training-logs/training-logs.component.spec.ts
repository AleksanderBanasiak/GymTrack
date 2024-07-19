import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLogsComponent } from './training-logs.component';

describe('TrainingLogsComponent', () => {
  let component: TrainingLogsComponent;
  let fixture: ComponentFixture<TrainingLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingLogsComponent]
    });
    fixture = TestBed.createComponent(TrainingLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
