import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  shareReplay,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { load as yamlLoad } from 'js-yaml';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private http = inject(HttpClient);
  // questionsGistUrl = `https://gist.githubusercontent.com/shantd9/710aea7543e1358204a79a2a9699d5fb/raw/questions.json?v=${Date.now()}`;
  // private questionnaireSteps$: Observable<QuestionnaireStep[]> = this.http
  //   .get<QuestionnaireStep[]>(this.questionsGistUrl)
  //   .pipe(
  //     catchError(() => of([])),
  //     shareReplay({ bufferSize: 1, refCount: true })
  //   );
  questionsYamlUrl =
    `questions.yaml`;
  private questionnaireSteps$: Observable<QuestionnaireStep[]> = this.http
    .get(this.questionsYamlUrl, { responseType: 'text' })
    .pipe(
      map((yamlText) => yamlLoad(yamlText) as QuestionnaireStep[]),
      catchError((err) => {
        console.error('Failed to load YAML', err);
        return of([] as QuestionnaireStep[]);
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  private currentStepSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  private flattenedQuestions = this.questionnaireSteps$.pipe(
    map((steps) => steps.flatMap((step) => step.questions))
  );

  constructor() {
    this.flattenedQuestions.subscribe((questions) => {
      questions.forEach((question) => {
        if (question.condition) {
          const conditionQuestion = questions.find(
            (q) => q.id === question.condition?.id
          );
          //we need to log an error if the condition question has a value in the value object which is not in the question options
          if (conditionQuestion && conditionQuestion.configuration.options) {
            question.condition.value.forEach((value) => {
              if (
                !conditionQuestion.configuration.options?.find(
                  (option) => option.value === value
                )
              ) {
                console.error(
                  `Question ${question.id} has a condition on question ${conditionQuestion.id} with a value ${value} which is not in the options of the condition question.`
                );
              }
            });
          }
        }
      });
    });
  }

  getSteps(): Observable<QuestionnaireStep[]> {
    return this.questionnaireSteps$;
  }

  getFlattenedQuestions(): Observable<Question[]> {
    return this.flattenedQuestions;
  }

  getCurrentStep(): Observable<number> {
    return this.currentStepSubject.asObservable();
  }

  setCurrentStep(index: number) {
    this.currentStepSubject.next(index);
  }

  getLabelForValue(question: Question, value: string | undefined): string {
    if (question.type !== 'text') {
      const option = question.configuration.options?.find(
        (option) => option.value === value
      );
      return option ? option.label : 'Niet beantwoord.';
    } else {
      return value ?? 'Niet beantwoord.';
    }
  }

  getLabelForValues(question: Question, values?: string[]): string {
    return (
      values
        ?.map((value) => this.getLabelForValue(question, value))
        .join(', ') ?? 'Niet beantwoord.'
    );
  }
}

export interface QuestionnaireStep {
  stepperTitle: string | null;
  questions: Question[];
  title?: string;
  questionExplanation?: string;
  completed: boolean;
}

export interface Question {
  id: string
  type: 'text' | 'radio' | 'checkbox'
  configuration: QuestionConfiguration
  questionSubtitle?: string
  condition?: QuestionCondition
  isHidden?: boolean
}

export interface QuestionCondition {
  id: string //id of the question which is the condition
  value: string[] //possible values which will trigger the condition
}

export interface QuestionConfiguration {
  options?: QuestionOption[]
}

export interface QuestionOption {
  value: string
  label: string
  optionExplanation?: string
  iconUrl?: string
  color?: 'color1' | 'color2' | 'color3' | 'color4' | 'color5' | 'color6' //todo: add real colors
}
