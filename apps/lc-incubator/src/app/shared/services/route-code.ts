import { Answer } from './answer.service';

export function buildRouteCode(answers: Answer[]): string {
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

export function buildRoutePageUrl(routeCode: string): string {
  return `https://publish.obsidian.md/lci/${routeCode}`;
}
