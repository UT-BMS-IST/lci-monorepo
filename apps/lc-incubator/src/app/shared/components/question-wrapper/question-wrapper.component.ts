import { Component, Input, OnDestroy } from '@angular/core'
import { take } from 'rxjs'
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common'
import { QuestionTitleComponent } from './question-title/question-title.component'
import { TextQuestionComponent } from './text-question/text-question.component'
import { CheckboxQuestionComponent } from './checkbox-question/checkbox-question.component'
import { RadioButtonQuestionComponent } from './radio-button-question/radio-button-question.component'
import { AnswerService } from '../../services/answer.service'
import { Question } from '../../services/questions.service'

@Component({
  selector: 'app-question-wrapper',
  templateUrl: './question-wrapper.component.html',
  styleUrls: ['./question-wrapper.component.scss'],
  imports: [
    NgIf,
    QuestionTitleComponent,
    NgSwitch,
    TextQuestionComponent,
    CheckboxQuestionComponent,
    RadioButtonQuestionComponent,
    NgSwitchCase,
  ],
})
export class QuestionWrapperComponent implements OnDestroy {
  @Input() question: Question | null = null

  constructor(private answerService: AnswerService) {}

  ngOnDestroy() {
    this.answerService
      .getAnswerById(this.question?.id!)
      .pipe(take(1))
      .subscribe((answer) => {
        if (answer) {
          this.answerService.removeAnswer(this.question?.id!)
        }
      })
  }
}
