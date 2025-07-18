import { Component, Input } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { Question } from '../../../services/questions.service'
import { AnswerService } from '../../../services/answer.service'
import { MatTooltip } from '@angular/material/tooltip'
import { MatRadioButton, MatRadioChange, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-radio-button-question',
  templateUrl: './radio-button-question.component.html',
  styleUrls: ['./radio-button-question.component.scss'],
  imports: [MatIcon, MatTooltip, MatRadioGroup, MatRadioButton],
})
export class RadioButtonQuestionComponent {
  @Input() question?: Question;

  constructor(private answerService: AnswerService) {}

  radioButtonSelected($event: MatRadioChange) {
    const value = $event.value;
    this.answerService.addOrUpdateAnswer({
      questionId: this.question?.id || '',
      value,
    });
  }

  getTooltip(q: any): string {
    return q;
  }
}
