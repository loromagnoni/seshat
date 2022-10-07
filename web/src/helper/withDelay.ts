export const withDelay = (delay: number, fn: () => void) => () =>
  setTimeout(fn, delay)
