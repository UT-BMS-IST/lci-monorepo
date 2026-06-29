import { Component, inject, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { Answer, AnswerService } from '../../services/answer.service';
import { Question, QuestionsService } from '../../services/questions.service';
import { NgForOf } from '@angular/common';
import { buildRouteCode } from '../../services/route-code';

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

          this.routeCode = buildRouteCode(answers);
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

}

export interface Result {
  question: string;
  answer: string;
}
