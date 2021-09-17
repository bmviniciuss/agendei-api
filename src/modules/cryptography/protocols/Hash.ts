export interface Hasher {
  hash(value: string): Promise<string>
}
export interface HashComparer {
  compare(plainText: string, digest: string): Promise<boolean>
}
