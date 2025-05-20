export interface ShortenUrlRequest {
  maxClick: number | null;
  originalUrl: string;
  password: string;
  expirationDate: Date | null;
}

export interface UpdateUrlRequestDto extends ShortenUrlRequest {
  id: number;
}
