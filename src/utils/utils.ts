export const isNotNum = (text: string | null): boolean =>
  isNaN(parseFloat(text as string)) || !isFinite(parseFloat(text as string));

export function typedKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
