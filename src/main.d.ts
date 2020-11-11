export declare function box<T>(
  initialValue?: T,
  onChange?: (currentValue?: T, previousValue?: T) => void
): [() => T, (nextValue?: T) => void];

export declare function sel<T>(body: () => T): [() => T, () => void];

export declare function expr<T>(
  body: () => T,
  updater?: () => void
): [() => T, () => void];
