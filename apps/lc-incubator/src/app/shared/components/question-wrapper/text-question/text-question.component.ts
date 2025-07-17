import { Component, Input } from '@angular/core'
import { NgIf } from '@angular/common'
import { Question } from '../../../services/questions.service'
import { AnswerService } from '../../../services/answer.service'

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.scss'],
  imports: [NgIf],
})
export class TextQuestionComponent {
  @Input() question?: Question
  selectedValues: string[] = []

  constructor(private answerService: AnswerService) {}

  textEntered($event: Event) {
    const input = $event.target as HTMLInputElement
    const value = input.value

    this.answerService.addOrUpdateAnswer({ questionId: this.question?.id || '', value })
  }

  getTooltip(q: any): string {
    return q
  }
}
