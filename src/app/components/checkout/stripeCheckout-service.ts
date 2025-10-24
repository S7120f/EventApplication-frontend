import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StripeCheckoutService {

  private readonly baseUrl = 'http://localhost:8080/api/stripe';
  private readonly http = inject(HttpClient);


  createCheckoutSession(reservationId: number): Observable<{url: string}> {
    return this.http.post<{url: string}> (`${this.baseUrl}/checkout-session`, { reservationId });
  }
}
