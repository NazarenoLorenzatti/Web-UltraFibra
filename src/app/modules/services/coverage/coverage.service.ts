import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CoverageResponse {
  covered: boolean;
  tenant?: string;
  city?: string;
  province?: string;
  neighborhood?: string;
  zone?: string;
  commercial_conditions?: string;
  neighborhood_id?: string;
  zone_coverage_id?: string;
  zone_id?: string;
  zone_api_id?: string;
  city_api_id?: string;
  province_api_id?: string;
  neighborhood_api_id?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  reason?: string;
  waitlist_enabled?: boolean;
  waitlist_available_date?: string;
  waitlist_days?: number;
}

@Injectable({ providedIn: 'root' })
export class CoverageService {
  /**
   * IMPORTANT:
   * El token de OIC NO debe vivir en Angular ni viajar desde el navegador.
   * Este endpoint relativo debe ser un proxy propio de UltraFibra que agregue
   * Authorization, X-Tenant y X-Client-Id del lado servidor.
   */
  //private readonly endpoint = 'http://localhost:8002/api/public/coverage/check';
  private readonly endpoint = 'https://ultrafibra.com.ar:8002/api/public/coverage/check';

  constructor(private readonly http: HttpClient) {}

  checkCoverage(latitude: number, longitude: number): Observable<CoverageResponse> {
    const conversationId = this.getConversationId();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Conversation-ID': conversationId
    });

    return this.http.post<CoverageResponse>(
      this.endpoint,
      { latitude, longitude },
      { headers }
    );
  }

  private getConversationId(): string {
    const storageKey = 'ultrafibra-coverage-conversation-id';
    const existing = sessionStorage.getItem(storageKey);
    if (existing) return existing;

    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;

    sessionStorage.setItem(storageKey, id);
    return id;
  }
}
