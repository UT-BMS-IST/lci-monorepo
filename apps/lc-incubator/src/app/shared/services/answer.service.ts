import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private answers: BehaviorSubject<Answer[]> = new BehaviorSubject<Answer[]>([])
  private answers$ = this.answers.asObservable()

  constructor() {}

  getAnswers() {
    return this.answers$
  }

  getAnswerById(id: string): Observable<Answer | undefined> {
    return this.answers$.pipe(map((answers) => answers.find((a) => a.questionId === id)))
  }

  addOrUpdateAnswer(answer: Answer) {
    const currentAnswers = this.answers.getValue()
    const answerIndex = currentAnswers.findIndex((a) => a.questionId === answer.questionId)

    if (answerIndex !== -1) {
      currentAnswers[answerIndex] = answer
    } else {
      currentAnswers.push(answer)
    }

    this.answers.next(currentAnswers)
  }

  removeAnswer(answerId: string) {
    const currentAnswers = this.answers.getValue()
    const newAnswers = currentAnswers.filter((answer) => answer.questionId !== answerId)
    this.answers.next(newAnswers)
  }
}

export interface Answer {
  questionId: string
  value?: string
  values?: string[]
}
