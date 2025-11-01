import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StripeCheckoutService {

  private readonly baseUrl = `${environment.apiBaseUrl}/api/stripe`;
  private readonly http = inject(HttpClient);


  createCheckoutSession(reservationId: number): Observable<{url: string}> {
    return this.http.post<{url: string}> (`${this.baseUrl}/checkout-session`,
      { reservationId },
      { responseType: 'json' as const}
    );
  }
}
