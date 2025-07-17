import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsStepComponent } from './results-step.component';

describe('ResultsStepComponent', () => {
  let component: ResultsStepComponent;
  let fixture: ComponentFixture<ResultsStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsStepComponent]
    });
    fixture = TestBed.createComponent(ResultsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
