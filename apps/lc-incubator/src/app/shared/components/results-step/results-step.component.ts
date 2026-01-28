import { Component, inject, OnInit } from '@angular/core'
import { map, switchMap } from 'rxjs'
import { Answer, AnswerService } from '../../services/answer.service'
import { QuestionsService } from '../../services/questions.service'
import { ResultsService, LCResultWithVisibility } from '../../services/results.service'
import { NgForOf, NgIf } from '@angular/common'
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-results-step',
  templateUrl: './results-step.component.html',
  styleUrls: ['./results-step.component.scss'],
  imports: [NgForOf, NgIf, TranslatePipe],
})
export class ResultsStepComponent implements OnInit {
  answerService = inject(AnswerService);
  questionsService = inject(QuestionsService);
  guidelinesService = inject(ResultsService);

  results: Result[] = [];
  guidelines: LCResultWithVisibility[] = [];

  ngOnInit() {
    this.answerService
      .getAnswers()
      .pipe(
        switchMap((answers) => {
          return this.questionsService.getSteps().pipe(
            map((steps) => {
              const allQuestions = steps.flatMap((step) => step.questions);
              this.results = [];
              allQuestions.forEach((question) => {
                const answer = answers.find(
                  (answer: Answer) => answer.questionId === question.id
                );
                let answerText = '';
                if (question.type == 'checkbox') {
                  answerText = this.questionsService.getLabelForValues(
                    question,
                    answer?.values
                  );
                } else {
                  answerText = this.questionsService.getLabelForValue(
                    question,
                    answer?.value
                  );
                }
                if (!question.isHidden) {
                  //probably fix the code below
                  const currentStep = steps.find((step) =>
                    step.questions.includes(question)
                  );
                  if (question.questionSubtitle) {
                    this.results.push({
                      question: question.questionSubtitle,
                      answer: answerText,
                    });
                  } else {
                    this.results.push({
                      question: currentStep?.title || '',
                      answer: answerText,
                    });
                  }
                }
              });
              console.log(this.results);

              return steps;
            })
          );
        })
      )
      .subscribe((x) => {
        // console.log(x)
      });

    this.guidelinesService.visibleResults$.subscribe((guidelines) => {
      this.guidelines = guidelines;
    });
  }

}

export interface Result {
  question: string
  answer: string
}
