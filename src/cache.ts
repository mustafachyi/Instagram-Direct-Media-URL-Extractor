interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class InMemoryCache<T> {
  private readonly cache = new Map<string, CacheEntry<T>>();
  private readonly ttlMilliseconds: number;

  constructor(ttlSeconds: number) {
    this.ttlMilliseconds = ttlSeconds * 1000;
  }

  private isEntryExpired(entry: CacheEntry<T>): boolean {
    return Date.now() > entry.expiresAt;
  }

  public get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      return undefined;
    }

    if (this.isEntryExpired(entry)) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  public set(key: string, value: T): void {
    const expiresAt = Date.now() + this.ttlMilliseconds;
    this.cache.set(key, { value, expiresAt });
  }
}