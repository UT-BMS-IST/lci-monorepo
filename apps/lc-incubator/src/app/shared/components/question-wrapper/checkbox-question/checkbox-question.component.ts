import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Question } from '../../../services/questions.service';
import { AnswerService } from '../../../services/answer.service';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox-question',
  templateUrl: './checkbox-question.component.html',
  styleUrls: ['./checkbox-question.component.scss'],
  imports: [NgForOf, NgIf, MatIconModule, MatTooltipModule, MatCheckboxModule],
})
export class CheckboxQuestionComponent {
  @Input() question?: Question;
  selectedValues: string[] = [];

  constructor(private answerService: AnswerService) {}

  checkboxSelected(event: MatCheckboxChange): void {
    const value = event.source.value;

    if (event.checked) {
      this.selectedValues.push(value);
    } else {
      const index = this.selectedValues.indexOf(value);
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      }
    }

    this.answerService.addOrUpdateAnswer({
      questionId: this.question?.id || '',
      values: this.selectedValues,
    });
  }

  getTooltip(q: any): string {
    return q;
  }
}
