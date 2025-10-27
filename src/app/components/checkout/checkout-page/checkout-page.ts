import {Component, OnInit} from '@angular/core';
import {CheckoutStateService} from '../../../service/checkoutStateService';
import {EventItem} from '../../eventns/event.model';
import {EventService} from '../../eventns/event-service';
import {NgIf} from '@angular/common';
import {TicketReservationService} from '../../ticket/ticketReservation-service';
import {StripeCheckoutService} from '../stripeCheckout-service';

@Component({
  selector: 'app-checkout-page',
  imports: [
    NgIf
  ],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css'
})
export class CheckoutPage implements OnInit{

  eventId: number | null = null;
  totalTickets: number = 0;
  totalPrice: number = 0;
  event: EventItem | null = null;



  constructor(private checkoutState: CheckoutStateService,
              private eventService: EventService,
              private ticketReservationService: TicketReservationService,
              private stripeCheckoutService: StripeCheckoutService) {}

  ngOnInit() {
    const state = this.checkoutState.getState();

    this.totalTickets = state.totalTickets;
    this.totalPrice = state.totalPrice;
    console.log('Event ID:', state.eventId);
    console.log('Antal biljetter:', state.totalTickets);
    console.log('Totalpris:', state.totalPrice);

    if(state.eventId) {
      this.eventService.getEventById(state.eventId).subscribe((data) => {
        this.event = data;
      })
    }
  }

  checkoutStripe() {
    const state = this.checkoutState.getState();

    console.log("id är !!!!! -->> ", state.reservationId);

    if (state.reservationId) {
      this.stripeCheckoutService
        .createCheckoutSession(state.reservationId)
        .subscribe({
          next: (response) => {
            window.location.href = response.url; // redirect till stripe
          },

          error: (err) => {
            console.error('Stripe error', err);
            alert('Kunde inte starta betalning.');
          }
        });
    }

  }

}
