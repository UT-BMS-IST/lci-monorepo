import { Component, Input } from '@angular/core'
import { NgClass, NgIf } from '@angular/common'

@Component({
  selector: 'app-question-title',
  templateUrl: './question-title.component.html',
  styleUrls: ['./question-title.component.scss'],
  imports: [NgClass, NgIf],
})
export class QuestionTitleComponent {
  @Input() title: string | undefined = undefined
  @Input() explanation: string | undefined = undefined
  @Input() color: string | undefined = undefined
  @Input() mainTitleMode = false
}
