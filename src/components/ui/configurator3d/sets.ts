export function isSubset<T>(subset: Set<T>, superset: Set<T>): boolean {
  for (const value of subset) {
    if (!superset.has(value)) return false;
  }
  return true;
}

export function setDifferenceSize<T>(a: Set<T>, b: Set<T>): number {
  let count = 0;
  for (const value of a) {
    if (!b.has(value)) count += 1;
  }
  return count;
}

export function areSetsEqual<T>(a: Set<T>, b: Set<T>): boolean {
  return a.size === b.size && isSubset(a, b);
}

export function setFromArray<T>(items: T[]): Set<T> {
  return new Set(items);
}
