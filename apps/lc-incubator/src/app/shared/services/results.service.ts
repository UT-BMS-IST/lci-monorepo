import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  shareReplay,
  tap,
} from 'rxjs';
import { Answer, AnswerService } from './answer.service';
import { QuestionnaireStep, QuestionsService } from './questions.service';
import { HttpClient } from '@angular/common/http';
import { load as yamlLoad } from 'js-yaml';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  answersService = inject(AnswerService);
  questionsService = inject(QuestionsService);
  resultsYamlUrl = `https://gist.githubusercontent.com/shantd9/ed7d29e26ec233f527d26f23d956a463/raw/results.yaml?v=${Date.now()}`;
  private http = inject(HttpClient);
  private allResults: Observable<LCResult[]> = this.http
    .get(this.resultsYamlUrl, { responseType: 'text' })
    .pipe(
      map((yamlText) => yamlLoad(yamlText) as LCResult[]),
      catchError((err) => {
        console.error('Failed to load YAML', err);
        return of([] as LCResult[]);
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  visibleResults$ = combineLatest([
    this.allResults,
    this.answersService.getAnswers(),
  ]).pipe(
    map(([results, answers]) => {
      const res = results.map((result) => {
        const visible = result.conditions.every((condition) => {
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
        return { ...result, visible };
      });
      return res
    })
  );

  constructor() {
    //the below code is just used for testing purposes, it can be removed for production.
    // this.allResults.subscribe((results) => {
    //   const conditions = results.flatMap((g) => g.conditions);
    //   this.questionsService.getFlattenedQuestions().subscribe((questions) => {
    //     conditions.forEach((condition) => {
    //       const question = questions.find((q) => q.id === condition.questionId);
    //       if (!question) {
    //         console.error(`Question with id ${condition.questionId} not found`);
    //       } else {
    //         if (condition.value && condition.values) {
    //           console.error(
    //             `Condition with both value and values found in question ${condition.questionId}`
    //           );
    //         }
    //         if (condition.value) {
    //           if (
    //             !question.configuration.options?.find(
    //               (o) => o.value === condition.value
    //             )
    //           ) {
    //             console.error(
    //               `Value ${condition.value} not found in question ${condition.questionId}`
    //             );
    //           }
    //         }
    //
    //         if (condition.values && condition.values.length > 0) {
    //           if (
    //             !question.configuration.options?.find((o) =>
    //               condition.values!.includes(o.value)
    //             )
    //           ) {
    //             console.error(
    //               `Value ${condition.value} not found in question ${condition.questionId}`
    //             );
    //           }
    //         }
    //       }
    //     });
    //   });
    // });
  }
}

export interface LCResult {
  conditions: Answer[];
  url: string
}

export interface LCResultWithVisibility extends LCResult {
  visible: boolean;
}
