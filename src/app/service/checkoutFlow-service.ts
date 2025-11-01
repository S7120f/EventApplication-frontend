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

/**
 *  Startar checkout-flödet för en reservation.
 *
 * Steg:
 * Hämtar reservationens status från backend.
 * Om status är "ACTIVE" – startar Stripe-checkout-sessionen.
 * Om status är "EXPIRED" – kastar ett fel och stoppar processen.
 * Hanterar eventuella fel (t.ex. utgången eller ogiltig reservation).
 */
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
