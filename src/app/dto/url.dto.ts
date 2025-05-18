export interface ShortenUrlRequest {
  originalUrl: string;
}

export interface UpdateUrlRequestDto {
  id: number;
  updatedUrl: string;
}
