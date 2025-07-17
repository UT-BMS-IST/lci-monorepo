import { Injectable } from '@angular/core'
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs'
import { QuestionsService } from './questions.service'
import { AnswerService } from './answer.service'

@Injectable({
  providedIn: 'root',
})
export class ProgressButtonsService {
  private nextClicked$: BehaviorSubject<any | null> = new BehaviorSubject(null)
  private previousClicked$: BehaviorSubject<any | null> = new BehaviorSubject(null)

  constructor(
    private questionsService: QuestionsService,
    private answerService: AnswerService,
  ) {}

  getNextClicked() {
    return this.nextClicked$.asObservable()
  }

  setNextClicked() {
    this.nextClicked$.next(1)
  }

  getPreviousClicked() {
    return this.previousClicked$.asObservable()
  }

  setPreviousClicked() {
    this.previousClicked$.next(1)
  }

  shouldShowPrevious() {
    return this.questionsService.getCurrentStep().pipe(map((step) => step > 0))
  }

  shouldShowNext() {
    return this.questionsService.getSteps().pipe(
      map((items) => items.length + 1), //+1 because of result step
      switchMap((length) => this.questionsService.getCurrentStep().pipe(map((step) => step < length - 1))),
    )
  }

  shouldDisableNext() {
    return this.answerService.getAnswers().pipe(
      switchMap((answers) => {
        return combineLatest([this.questionsService.getCurrentStep(), this.questionsService.getSteps()]).pipe(
          map(([step, steps]) => {
            const currentStep = steps[step]

            if (!currentStep) {
              return false
            }

            const answersForNonHiddenQuestionsInStep = answers.filter((a) => {
              const question = currentStep.questions.find((q) => q.id === a.questionId)
              return question && !question.isHidden
            })

            return answersForNonHiddenQuestionsInStep.length !== currentStep.questions.filter((q) => !q.isHidden).length
          }),
        )
      }),
    )
  }
}
