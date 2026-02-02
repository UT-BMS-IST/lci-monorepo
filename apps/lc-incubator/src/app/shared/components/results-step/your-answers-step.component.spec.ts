import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourAnswersStepComponent } from './your-answers-step.component';

describe('ResultsStepComponent', () => {
  let component: YourAnswersStepComponent;
  let fixture: ComponentFixture<YourAnswersStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourAnswersStepComponent],
    });
    fixture = TestBed.createComponent(YourAnswersStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
