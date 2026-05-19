export function logNonBlockingError(message: string, ...details: unknown[]): void {
  if (process.env.NODE_ENV === 'production') {
    console.warn(message, ...details);
    return;
  }

  console.error(message, ...details);
}
