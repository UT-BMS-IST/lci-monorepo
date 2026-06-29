import { Component, inject, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { Answer, AnswerService } from '../../services/answer.service';
import { Question, QuestionsService } from '../../services/questions.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-your-results-step',
  templateUrl: './your-results-step.component.html',
  styleUrls: ['./your-results-step.component.scss'],
  imports: [NgForOf],
})
export class YourResultsStepComponent implements OnInit {
  answerService = inject(AnswerService);
  questionsService = inject(QuestionsService);

  results: Result[] = [];
  routeCode = '...';

  ngOnInit() {
    combineLatest([
      this.answerService.getAnswers(),
      this.questionsService.getSteps(),
    ])
      .pipe(
        map(([answers, steps]) => {
          const allQuestions = steps.flatMap((step) => step.questions);
          this.results = allQuestions
            .filter((question) => this.isQuestionVisible(question, answers))
            .map((question) => {
              const answer = answers.find((a) => a.questionId === question.id);
              const answerText =
                question.type === 'checkbox'
                  ? this.questionsService.getLabelForValues(
                      question,
                      answer?.values
                    )
                  : this.questionsService.getLabelForValue(
                      question,
                      answer?.value
                    );

              return {
                question: question.questionSubtitle || '',
                answer: answerText,
              };
            });

          this.routeCode = this.buildRouteCode(answers);
        })
      )
      .subscribe();
  }

  private isQuestionVisible(question: Question, answers: Answer[]): boolean {
    if (!question.condition) {
      return true;
    }

    const conditionAnswer = answers.find(
      (answer) => answer.questionId === question.condition?.id
    );

    if (conditionAnswer?.value) {
      return question.condition.value.includes(conditionAnswer.value);
    }

    if (conditionAnswer?.values) {
      return conditionAnswer.values.some((value) =>
        question.condition?.value.includes(value)
      );
    }

    return false;
  }

  private buildRouteCode(answers: Answer[]): string {
    const route = answers.find((answer) => answer.questionId === 'route')?.value;
    const scenario = answers.find(
      (answer) => answer.questionId === `scenario_${route?.toLowerCase()}`
    )?.value;
    const audience = answers.find((answer) => answer.questionId === 'audience')
      ?.value;

    if (!route || !scenario || !audience) {
      return '...';
    }

    return `${route}${scenario}${audience}`;
  }
}

export interface Result {
  question: string;
  answer: string;
}
