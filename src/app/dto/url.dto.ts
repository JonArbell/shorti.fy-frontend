import { VisitorsResponseDto } from './visit.dto';

export interface ShortenUrlRequest {
  maxClick: number | null;
  originalUrl: string;
  password: string;
  expirationDate: Date | null;
}

export interface UpdateUrlRequestDto extends ShortenUrlRequest {
  id: number;
}

export interface UrlResponseDto {
  id: number;

  shortUrl: string;

  password: string;

  expirationDate: Date | null;

  originalUrl: string;

  maxClick: number | null;

  totalClicked: number | null;

  active: boolean;

  visitorResponseDtoList: VisitorsResponseDto[];
}
