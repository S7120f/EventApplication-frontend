import {Injectable} from '@angular/core';
import {TicketReservationService} from '../components/ticket/ticketReservation-service';
import {StripeCheckoutService} from '../components/checkout/stripeCheckout-service';
import {catchError, of, switchMap, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CheckoutFlowService {

  constructor(
    private ticketReservationService: TicketReservationService,
    private stripeCheckoutService: StripeCheckoutService
  ) {}

  startCheckout(reservationId: number) {
    return this.ticketReservationService.getReservationStatus(reservationId).pipe(
      tap(status => {
        console.log("Status mottagen ", status);
        if (status === 'EXPIRED') throw new Error("EXPIRED");
      }),
      switchMap(status =>
        status === 'ACTIVE'
        ? this.stripeCheckoutService.createCheckoutSession(reservationId)
          : of(null)
      ),
      catchError(err => {
        if (err.message === 'EXPIRED') {
          return throwError(() => new Error("Din reservation har gått ut."));
        }
        console.error("Fel i checkoutflödet", err);
        return throwError(() => new Error("Ett oväntat fel"));
      })
    )
  }

}
