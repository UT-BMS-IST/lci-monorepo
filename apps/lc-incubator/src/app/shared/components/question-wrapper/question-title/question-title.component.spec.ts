import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTitleComponent } from './question-title.component';

describe('QuestionTitleComponent', () => {
  let component: QuestionTitleComponent;
  let fixture: ComponentFixture<QuestionTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionTitleComponent]
    });
    fixture = TestBed.createComponent(QuestionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
