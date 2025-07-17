import { Component, inject } from '@angular/core'
import { map, Observable } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { ProgressButtonsService } from '../../services/progress-buttons.service'
import { AsyncPipe, NgIf } from '@angular/common'
import { MatButton } from '@angular/material/button'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-progress-buttons',
  templateUrl: './progress-buttons.component.html',
  styleUrls: ['./progress-buttons.component.scss'],
  imports: [AsyncPipe, MatButton, NgIf, TranslatePipe],
})
export class ProgressButtonsComponent {
  //use the inject syntax for the services
  progressButtonsService = inject(ProgressButtonsService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  shouldShowPrevious$: Observable<boolean> = this.progressButtonsService.shouldShowPrevious()
  shouldShowHome$: Observable<boolean> = this.progressButtonsService.shouldShowPrevious().pipe(map((show) => !show))
  shouldShowNext$: Observable<boolean> = this.progressButtonsService.shouldShowNext()
  shouldDisableNext$: Observable<boolean> = this.progressButtonsService.shouldDisableNext()

  goHome() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute.parent })
  }

  nextStep() {
    this.progressButtonsService.setNextClicked()
  }

  previousStep() {
    this.progressButtonsService.setPreviousClicked()
  }
}
