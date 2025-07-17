import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonQuestionComponent } from './radio-button-question.component';

describe('RadioButtonQuestionComponent', () => {
  let component: RadioButtonQuestionComponent;
  let fixture: ComponentFixture<RadioButtonQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadioButtonQuestionComponent]
    });
    fixture = TestBed.createComponent(RadioButtonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
