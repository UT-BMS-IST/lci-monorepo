import { Component, inject } from '@angular/core'
import { map, Observable } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { ProgressButtonsService } from '../../services/progress-buttons.service'
import { AsyncPipe, NgIf } from '@angular/common'
import { MatAnchor, MatButton } from '@angular/material/button'
import { TranslatePipe } from '@ngx-translate/core'
import { AnswerService } from '../../services/answer.service'
import { buildRouteCode, buildRoutePageUrl } from '../../services/route-code'

@Component({
  selector: 'app-progress-buttons',
  templateUrl: './progress-buttons.component.html',
  styleUrls: ['./progress-buttons.component.scss'],
  imports: [AsyncPipe, MatAnchor, MatButton, NgIf, TranslatePipe],
})
export class ProgressButtonsComponent {
  //use the inject syntax for the services
  progressButtonsService = inject(ProgressButtonsService);
  answerService = inject(AnswerService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  routePageUrl$ = this.answerService
    .getAnswers()
    .pipe(map((answers) => buildRoutePageUrl(buildRouteCode(answers))));

  shouldShowPrevious$: Observable<boolean> =
    this.progressButtonsService.shouldShowPrevious();
  shouldShowHome$: Observable<boolean> = this.progressButtonsService
    .shouldShowPrevious()
    .pipe(map((show) => !show));
  shouldShowNext$: Observable<boolean> =
    this.progressButtonsService.shouldShowNext();
  shouldShowRestart$: Observable<boolean> =
    this.progressButtonsService.shouldShowRestart();
  shouldDisableNext$: Observable<boolean> =
    this.progressButtonsService.shouldDisableNext();

  goHome() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute.parent });
  }

  nextStep() {
    this.progressButtonsService.setNextClicked();
  }

  previousStep() {
    this.progressButtonsService.setPreviousClicked();
  }

  restart() {
    window.location.reload()
  }
}
