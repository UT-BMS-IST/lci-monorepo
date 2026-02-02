import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import {
  MatStep,
  MatStepContent,
  MatStepLabel,
  MatStepper,
} from '@angular/material/stepper';
import { map, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import {
  QuestionnaireStep,
  QuestionsService,
} from '../../services/questions.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ProgressButtonsService } from '../../services/progress-buttons.service';
import { AnswerService } from '../../services/answer.service';
import { QuestionTitleComponent } from '../question-wrapper/question-title/question-title.component';
import { QuestionWrapperComponent } from '../question-wrapper/question-wrapper.component';
import { YourAnswersStepComponent } from '../results-step/your-answers-step.component';
import { YourResultsStepComponent } from '../your-results-step/your-results-step.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  imports: [
    MatStep,
    AsyncPipe,
    MatStepper,
    MatStepContent,
    NgIf,
    NgForOf,
    QuestionTitleComponent,
    QuestionWrapperComponent,
    MatStepLabel,
    YourAnswersStepComponent,
    YourResultsStepComponent,
  ],
})
export class StepperComponent implements OnInit, OnDestroy {
  progressButtonsService = inject(ProgressButtonsService);
  questionService = inject(QuestionsService);
  answersService = inject(AnswerService);
  @Output() afterStepperSelectionChanged = new EventEmitter<number>();
  @ViewChild('stepper') stepper: MatStepper | undefined;
  selectedIndex$ = this.questionService.getCurrentStep();
  configurationLength$: Observable<number> = this.questionService
    .getSteps()
    .pipe(map((x) => x.length));
  configuration$: Observable<QuestionnaireStep[]> = this.answersService
    .getAnswers()
    .pipe(
      switchMap((answers) => {
        return this.questionService.getSteps().pipe(
          map((steps) => {
            const allQuestions = steps.flatMap((step) => step.questions);
            steps.forEach((step) => {
              step.questions.forEach((question) => {
                let isHidden = true;

                if (!question.condition) {
                  isHidden = false;
                }
                if (question.condition) {
                  const condition = question.condition;
                  const quest = allQuestions.find((q) => q.id === condition.id);

                  if (quest) {
                    if (quest.type !== 'checkbox') {
                      const answer = answers.find(
                        (a) => a.questionId === quest.id
                      );
                      if (answer) {
                        isHidden = !condition.value.includes(
                          answer.value ?? ''
                        );
                      }
                    } else {
                      const answer = answers.find(
                        (a) => a.questionId === quest.id
                      );
                      if (answer) {
                        isHidden = !answer.values?.some((a) =>
                          condition.value.includes(a)
                        );
                      }
                    }
                  }
                }
                question.isHidden = isHidden;
              });
              const answersForNonHiddenQuestionsInStep = answers.filter((a) => {
                const question = step.questions.find(
                  (q) => q.id === a.questionId
                );
                return question && !question.isHidden;
              });

              if (
                answersForNonHiddenQuestionsInStep.length ===
                step.questions.filter((q) => !q.isHidden).length
              ) {
                step.completed = true;
              } else {
                step.completed = false;
              }
            });

            return steps;
          })
        );
      })
    );
  // configuration$: Observable<QuestionnaireStep[]> = this.questionService.getSteps()
  unsubscribe$: Subject<void> = new Subject();
  protected readonly length = length;

  ngOnInit(): void {
    this.progressButtonsService
      .getNextClicked()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((x) => {
        this.stepper?.next();
      });

    this.progressButtonsService
      .getPreviousClicked()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((x) => {
        this.stepper?.previous();
      });
  }

  stepperSelectionChanged(event: StepperSelectionEvent) {
    this.configurationLength$
      .pipe(
        switchMap((len) => {
          const value = event.selectedIndex / len;
          this.afterStepperSelectionChanged.emit(value);
          this.questionService.setCurrentStep(event.selectedIndex);
          return of();
        })
      )
      .subscribe();
  }

  getVisibleQuestions(questions: QuestionnaireStep['questions']) {
    return questions.filter((q) => !q.isHidden);
  }

  getVisibleQuestionsLength(questions: QuestionnaireStep['questions']) {
    return questions.filter((q) => !q.isHidden).length;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
