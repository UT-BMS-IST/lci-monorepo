import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { ClicItSocialMediaComponent } from '../shared/components/clic-it-social-media/clic-it-social-media.component'
import { MatButton } from '@angular/material/button'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [ClicItSocialMediaComponent, MatButton, TranslatePipe],
})
export default class WelcomeComponent {
  router = inject(Router)

  public goToQuiz() {
    this.router.navigate(['/questions'])
  }
}
