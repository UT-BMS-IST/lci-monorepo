import { Component, Input } from '@angular/core'
import { NgForOf } from '@angular/common'
import { MatIcon } from '@angular/material/icon'
import { Question } from '../../../services/questions.service'
import { AnswerService } from '../../../services/answer.service'
import { MatTooltip } from '@angular/material/tooltip'

@Component({
  selector: 'app-radio-button-question',
  templateUrl: './radio-button-question.component.html',
  styleUrls: ['./radio-button-question.component.scss'],
  imports: [NgForOf, MatIcon, MatTooltip],
})
export class RadioButtonQuestionComponent {
  @Input() question?: Question

  constructor(private answerService: AnswerService) {}

  radioButtonSelected($event: Event) {
    const value = ($event.target as HTMLInputElement).value
    this.answerService.addOrUpdateAnswer({ questionId: this.question?.id || '', value })
  }

  getTooltip(q: any): string {
    return q
  }
}
