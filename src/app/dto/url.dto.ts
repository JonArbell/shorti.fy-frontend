export interface ShortenUrlRequest {
  originalUrl: string;
  password: string;
  expirationDate: Date | null;
}

export interface UpdateUrlRequestDto extends ShortenUrlRequest {
  id: number;
}
