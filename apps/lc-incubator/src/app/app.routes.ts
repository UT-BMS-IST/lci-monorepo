import { Route } from '@angular/router'

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./welcome/welcome.component'),
  },
  {
    path: 'questions',
    loadComponent: () => import('./questions/questions.component'),
  },
]
