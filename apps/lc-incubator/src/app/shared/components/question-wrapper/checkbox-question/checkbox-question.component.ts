import { Component, Input } from '@angular/core'
import { NgForOf, NgIf } from '@angular/common'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { Question } from '../../../services/questions.service'
import { AnswerService } from '../../../services/answer.service'

@Component({
  selector: 'app-checkbox-question',
  templateUrl: './checkbox-question.component.html',
  styleUrls: ['./checkbox-question.component.scss'],
  imports: [NgForOf, NgIf, MatIcon, MatTooltip],
})
export class CheckboxQuestionComponent {
  @Input() question?: Question
  selectedValues: string[] = []

  constructor(private answerService: AnswerService) {}

  checkboxSelected($event: Event) {
    const checkbox = $event.target as HTMLInputElement
    const value = checkbox.value

    if (checkbox.checked) {
      this.selectedValues.push(value)
    } else {
      const index = this.selectedValues.indexOf(value)
      if (index !== -1) {
        this.selectedValues.splice(index, 1)
      }
    }

    this.answerService.addOrUpdateAnswer({ questionId: this.question?.id || '', values: this.selectedValues })
  }

  getTooltip(q: any): string {
    return q
  }
}
