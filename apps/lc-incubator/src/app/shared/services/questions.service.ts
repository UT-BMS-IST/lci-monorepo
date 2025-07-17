import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private questionnaireSteps: BehaviorSubject<QuestionnaireStep[]> = new BehaviorSubject<QuestionnaireStep[]>([
    {
      stepperTitle: 'Type LC',
      questions: [
        {
          id: 'q1',
          type: 'radio',
          questionSubtitle: 'Voor welk type learning community zoek je een ondersteuning? (1 antwoord)',
          configuration: {
            options: [
              {
                value: 'micro',
                label: 'Micro LC - Eén organisatie is leidend, bijv. een bedrijf of start-up',
                optionExplanation:
                  'Gericht op het oplossen van een concreet vraagstuk binnen een organisatie en deze oplossen',
              },
              {
                value: 'meso',
                label:
                  'Meso LC - Consortium is leidend, zoals bijv. een fieldlab, living lab, innovatiehub, lectoraat, of practoraat',
                optionExplanation:
                  'Gericht op het verkennen van praktijktoepassingen van nieuwe technologie en sociale impact en hiermee experimenteren',
              },
              {
                value: 'macro',
                label:
                  'Macro LC - Netwerkorganisatie is leidend, zoals bijv. een (regionaal) ecosysteem, of centre of expertise',
                optionExplanation: 'Gericht op strategische opgaven in ecosystemen en de vertaling naar uitvoering',
              },
            ],
          },
        },
        {
          id: 'q2',
          type: 'checkbox',
          questionSubtitle: 'Welke partijen zijn betrokken in de learning community? (meerdere antwoorden)',
          configuration: {
            options: [
              {
                value: 'bedrijfsleven',
                label: 'Bedrijfsleven',
              },
              {
                value: 'onderwijs',
                label: 'Onderwijs',
              },
              {
                value: 'overheid',
                label: 'Overheid',
              },
              {
                value: 'maatschappij',
                label: 'Maatschappij',
              },
            ],
          },
        },
      ],
      completed: false,
    },
    {
      stepperTitle: 'Uitdaging',
      questions: [
        {
          id: 'q3',
          type: 'radio',
          questionSubtitle: 'Voor welke uitdaging zoek je primair een instrument? (1 antwoord)',
          configuration: {
            options: [
              {
                value: 'uitdagingMainA',
                label: 'Uitdaging Option A',
              },
              {
                value: 'uitdagingMainB',
                label: 'Uitdaging Option B',
              },
              {
                value: 'uitdagingMainC',
                label: 'Uitdaging Option C',
              },
              {
                value: 'uitdagingMainD',
                label: 'Uitdaging Option D',
              },
            ],
          },
        },
        {
          id: 'q4',
          type: 'checkbox',
          questionSubtitle: 'Verdieping per uitdaging uit vorige vraag (KEUZE A) – meerdere antwoorden',
          configuration: {
            options: [
              {
                value: 'uitdagingMainAOption1',
                label: 'Uitdaging main A - option 1',
              },
              {
                value: 'uitdagingMainAOption2',
                label: 'Uitdaging main A - option 2',
              },
              {
                value: 'uitdagingMainCOption3',
                label: 'Uitdaging main A - option 3',
              },
              {
                value: 'uitdagingMainDOption4',
                label: 'Uitdaging main A - option 4',
              },
            ],
          },
          condition: {
            id: 'q3',
            value: ['uitdagingMainA'],
          },
          hiddenTitle: true,
        },
        {
          id: 'q5',
          type: 'checkbox',
          questionSubtitle: 'Verdieping per uitdaging uit vorige vraag (KEUZE B) – meerdere antwoorden',
          configuration: {
            options: [
              {
                value: 'uitdagingMainBOption1',
                label: 'Uitdaging main B - option 1',
              },
              {
                value: 'uitdagingMainBOption2',
                label: 'Uitdaging main B - option 2',
              },
              {
                value: 'uitdagingMainBOption3',
                label: 'Uitdaging main B - option 3',
              },
              {
                value: 'uitdagingMainBOption4',
                label: 'Uitdaging main B - option 4',
              },
            ],
          },
          condition: {
            id: 'q3',
            value: ['uitdagingMainB'],
          },
          hiddenTitle: true,
        },
        {
          id: 'q6',
          type: 'checkbox',
          questionSubtitle: 'Verdieping per uitdaging uit vorige vraag (KEUZE C) – meerdere antwoorden',
          configuration: {
            options: [
              {
                value: 'uitdagingMainCOption1',
                label: 'Uitdaging main C - option 1',
              },
              {
                value: 'uitdagingMainCOption2',
                label: 'Uitdaging main C - option 2',
              },
              {
                value: 'uitdagingMainCOption3',
                label: 'Uitdaging main C - option 3',
              },
              {
                value: 'uitdagingMainCOption4',
                label: 'Uitdaging main C - option 4',
              },
            ],
          },
          condition: {
            id: 'q3',
            value: ['uitdagingMainC'],
          },
          hiddenTitle: true,
        },
        {
          id: 'q7',
          type: 'checkbox',
          questionSubtitle: 'Verdieping per uitdaging uit vorige vraag (KEUZE D) – meerdere antwoorden',
          configuration: {
            options: [
              {
                value: 'uitdagingMainDOption1',
                label: 'Uitdaging main D - option 1',
              },
              {
                value: 'uitdagingMainDOption2',
                label: 'Uitdaging main D - option 2',
              },
              {
                value: 'uitdagingMainDOption3',
                label: 'Uitdaging main D - option 3',
              },
              {
                value: 'uitdagingMainDOption4',
                label: 'Uitdaging main D - option 4',
              },
            ],
          },
          condition: {
            id: 'q3',
            value: ['uitdagingMainD'],
          },
          hiddenTitle: true,
        },
      ],
      completed: false,
    },
    {
      stepperTitle: 'Voorwaarden',
      questions: [
        {
          id: 'q8',
          type: 'checkbox',
          questionSubtitle: 'Welk type instrument zoek je? (meerdere antwoorden)',
          configuration: {
            options: [
              {
                value: 'roadmap',
                label: 'Roadmap',
              },
              {
                value: 'quickscan',
                label: 'Quickscan',
              },
              {
                value: 'software',
                label: 'Software',
              },
              {
                value: 'raamwerk',
                label: 'Raamwerk',
              },
              {
                value: 'canvas',
                label: 'Canvas',
              },
              {
                value: 'kaartspel',
                label: 'Kaartspel',
              },
              {
                value: 'quiz',
                label: 'Quiz',
              },
              {
                value: 'checklistOfVragenlijst',
                label: 'Checklist of vragenlijst',
              },
              {
                value: 'all',
                label: 'Ik sta open voor alle opties', //
              },
            ],
          },
        },
        {
          id: 'q9',
          type: 'radio',
          questionSubtitle: 'Waar moet het instrument toepasbaar zijn? (1 optie)',
          configuration: {
            options: [
              {
                value: 'digitaal',
                label: 'Digitaal',
                optionExplanation: 'Explanation for the option Digitaal',
              },
              {
                value: 'fysiek',
                label: 'Fysiek',
                optionExplanation: 'Explanation for the option Fysiek',
              },
              {
                value: 'digitaalEnFysiek',
                label: 'Digitaal en fysiek',
                optionExplanation: 'Explanation for the option Digitaal en fysiek',
              },
            ],
          },
        },
        {
          id: 'q10',
          type: 'checkbox',
          questionSubtitle: 'Hoe gebruiksklaar moet het instrument zijn? (meerdere opties)',
          configuration: {
            options: [
              {
                value: 'option1',
                label: 'Ik wil hooguit enkele kleine aanpassingen doen voor gebruik in mijn situatie',
                optionExplanation: '< 2uur voorbereiding',
              },
              {
                value: 'option2', //todo: fix these??
                label: 'Ik wil er best tijd insteken in de verdere ontwikkeling van een instrument',
                optionExplanation: 'Tussen 2uur en 8 uur voorbereiding',
              },
              {
                value: 'option2', //todo: fix these??
                label: 'Ik wil er best tijd insteken in de verdere ontwikkeling van een instrument',
                optionExplanation: '> 8uur voorbereiding',
              },
            ],
          },
        },
      ],
      completed: false,
    },
  ])
  private currentStepSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  private flattenedQuestions = this.questionnaireSteps.pipe(map((steps) => steps.flatMap((step) => step.questions)))

  constructor() {
    this.flattenedQuestions.subscribe((questions) => {
      questions.forEach((question) => {
        if (question.condition) {
          const conditionQuestion = questions.find((q) => q.id === question.condition?.id)
          //we need to log an error if the condition question has a value in the value object which is not in the question options
          if (conditionQuestion && conditionQuestion.configuration.options) {
            question.condition.value.forEach((value) => {
              if (!conditionQuestion.configuration.options?.find((option) => option.value === value)) {
                console.error(
                  `Question ${question.id} has a condition on question ${conditionQuestion.id} with a value ${value} which is not in the options of the condition question.`,
                )
              }
            })
          }
        }
      })
    })
  }

  getSteps(): Observable<QuestionnaireStep[]> {
    return this.questionnaireSteps.asObservable()
  }

  setSteps(steps: QuestionnaireStep[]) {
    this.questionnaireSteps.next(steps)
  }

  getFlattenedQuestions(): Observable<Question[]> {
    return this.flattenedQuestions
  }

  getCurrentStep(): Observable<number> {
    return this.currentStepSubject.asObservable()
  }

  setCurrentStep(index: number) {
    this.currentStepSubject.next(index)
  }

  getLabelForValue(question: Question, value: string | undefined): string {
    if (question.type !== 'text') {
      const option = question.configuration.options?.find((option) => option.value === value)
      return option ? option.label : 'Not answered.'
    } else {
      return value ?? 'Not answered.'
    }
  }

  getLabelForValues(question: Question, values?: string[]): string {
    return values?.map((value) => this.getLabelForValue(question, value)).join(', ') ?? 'Not answered.'
  }
}

export interface QuestionnaireStep {
  stepperTitle: string | null
  title?: string
  questionExplanation?: string
  questions: Question[]
  completed: boolean
}

export interface Question {
  id: string
  type: 'text' | 'radio' | 'checkbox'
  configuration: QuestionConfiguration
  questionSubtitle?: string
  condition?: QuestionCondition
  isHidden?: boolean
  hiddenTitle?: boolean
  color?: 'color1' | 'color2' | 'color3' | 'color4' | 'color5' | 'color6' //todo: add real colors
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
