import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TicketReservationMode} from './ticketReservation-mode';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class TicketReservationService {

  private readonly apiUrl = `${environment.apiBaseUrl}/api/reservations`;
  private readonly http = inject(HttpClient);

  createTicketReservation(eventId: number, quantity: number): Observable<TicketReservationMode> {
    return this.http.post<TicketReservationMode>(`${this.apiUrl}`, {eventId, quantity});
  }

  getReservationStatus(reservationId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${reservationId}/status`, {
      responseType: 'text'
    });
  }

  cancelReservation(reservationId: number) {
    return this.http.post(`${this.apiUrl}/${reservationId}/cancel`, {});
  }

}

