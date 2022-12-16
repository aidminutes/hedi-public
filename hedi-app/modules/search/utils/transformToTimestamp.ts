export function transformToTimestamp(value: string | undefined) {
  if (!!!value) return null;
  const date = new Date(value);

  return date.getTime();
}
