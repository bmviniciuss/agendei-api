export interface Encrypter {
  encrypt(plaintext: string): Promise<string>
}

export interface Decrypter {
  decrypt(digest: string): Promise<any>
}
