import { Component } from '@angular/core'
import { MatProgressBar } from '@angular/material/progress-bar'
import { StepperComponent } from '../shared/components/stepper/stepper.component'
import { ProgressButtonsComponent } from '../shared/components/progress-buttons/progress-buttons.component'

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  imports: [MatProgressBar, StepperComponent, ProgressButtonsComponent],
})
export default class QuestionsComponent {
  progressBarValue = 0

  afterStepperClicked($event: any) {
    this.progressBarValue = $event * 100
  }
}
