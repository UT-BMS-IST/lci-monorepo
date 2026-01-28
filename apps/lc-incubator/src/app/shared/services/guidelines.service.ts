import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  shareReplay,
} from 'rxjs';
import { Answer, AnswerService } from './answer.service';
import { QuestionnaireStep, QuestionsService } from './questions.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GuidelinesService {
  answersService = inject(AnswerService);
  questionsService = inject(QuestionsService);
  guidelinesGistUrl = `https://gist.githubusercontent.com/shantd9/ffda1deae1852eed15c2caf7a0231f83/raw/results.json?v=${Date.now()}`;
  private http = inject(HttpClient);
  private allGuidelines$: Observable<SbsGuideline[]> = this.http
    .get<SbsGuideline[]>(this.guidelinesGistUrl)
    .pipe(
      catchError(() => of([])),
      map((file) => file),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  visibleGuidelines$ = combineLatest([
    this.allGuidelines$,
    this.answersService.getAnswers(),
  ]).pipe(
    map(([guidelines, answers]) => {
      return guidelines.map((guideline) => {
        const visible = guideline.conditions.every((condition) => {
          const answer = answers.find(
            (a) => a.questionId === condition.questionId
          );
          if (!answer) {
            return false;
          }
          if (answer.value) {
            return answer.value === condition.value;
          }
          if (answer.values) {
            return condition.values?.every((cond) =>
              answer.values?.includes(cond)
            );
          }
          return answer;
        });
        return { ...guideline, visible };
      });
    })
  );

  constructor() {
    //the below code is just used for testing purposes, it can be removed for production.
    this.allGuidelines$.subscribe((guidelines) => {
      const conditions = guidelines.flatMap((g) => g.conditions);
      this.questionsService.getFlattenedQuestions().subscribe((questions) => {
        conditions.forEach((condition) => {
          const question = questions.find((q) => q.id === condition.questionId);
          if (!question) {
            console.error(`Question with id ${condition.questionId} not found`);
          } else {
            if (condition.value && condition.values) {
              console.error(
                `Condition with both value and values found in question ${condition.questionId}`
              );
            }
            if (condition.value) {
              if (
                !question.configuration.options?.find(
                  (o) => o.value === condition.value
                )
              ) {
                console.error(
                  `Value ${condition.value} not found in question ${condition.questionId}`
                );
              }
            }

            if (condition.values && condition.values.length > 0) {
              if (
                !question.configuration.options?.find((o) =>
                  condition.values!.includes(o.value)
                )
              ) {
                console.error(
                  `Value ${condition.value} not found in question ${condition.questionId}`
                );
              }
            }
          }
        });
      });
    });
  }
}

export interface SbsGuideline {
  // id: string
  mainText?: string;
  titleAndTexts: TitleAndText[];
  conditions: Answer[];
}

export interface TitleAndText {
  title: string;
  text: string;
}

export interface SbsGuidelineWithVisibility extends SbsGuideline {
  visible: boolean;
}
