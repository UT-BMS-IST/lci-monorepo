export function formatOptionTooltip(value: string | null | undefined): string {
  if (!value) {
    return '';
  }

  const normalizedValue = value.trim().replace(/\r\n/g, '\n');

  if (normalizedValue.includes('\n') || hasExistingBulletList(normalizedValue)) {
    return normalizedValue;
  }

  const compactValue = normalizedValue.replace(/\s+/g, ' ');
  const introMatch = compactValue.match(/^([^:]{1,40}:)\s*(.+)$/);
  const intro = introMatch?.[1];
  const body = introMatch?.[2] ?? compactValue;
  const bulletItems = splitSentences(body);

  if (!intro && bulletItems.length < 2) {
    return compactValue;
  }

  return [intro, ...bulletItems.map((item) => `- ${stripTrailingPeriod(item)}`)]
    .filter(Boolean)
    .join('\n');
}

function hasExistingBulletList(value: string): boolean {
  return /^\s*[-*•]\s+/m.test(value);
}

function splitSentences(value: string): string[] {
  return (
    value
      .match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g)
      ?.map((sentence) => sentence.trim())
      .filter(Boolean) ?? [value]
  );
}

function stripTrailingPeriod(value: string): string {
  return value.replace(/\.$/, '');
}
