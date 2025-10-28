import {Component, OnInit} from '@angular/core';
import {CheckoutStateService} from '../../../service/checkoutStateService';
import {EventItem} from '../../eventns/event.model';
import {EventService} from '../../eventns/event-service';
import {NgIf} from '@angular/common';
import {TicketReservationService} from '../../ticket/ticketReservation-service';
import {StripeCheckoutService} from '../stripeCheckout-service';
import {CheckoutFlowService} from '../../../service/checkoutFlow-service';
import {TimerComponent} from '../../timer-component/timer-component';

@Component({
  selector: 'app-checkout-page',
  imports: [
    NgIf,
    TimerComponent
  ],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css'
})
export class CheckoutPage implements OnInit{

  totalTickets: number = 0;
  totalPrice: number = 0;
  event: EventItem | null = null;
  reservationStatus!: string;

  countDownSeconds = 60;



  constructor(private checkoutState: CheckoutStateService,
              private eventService: EventService,
              private ticketReservationService: TicketReservationService,
              private stripeCheckoutService: StripeCheckoutService,
              private checkoutFlowService: CheckoutFlowService) {}

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

    if (!state.reservationId) {
      alert("Kunde inte hitta reservationen.");
      return;
    }

    this.checkoutFlowService.startCheckout(state.reservationId).subscribe({
      next: (response) => {
        if (response?.url) {
          console.log("Försöker redirecta till: ", response.url);
          window.location.href = response.url;
        } else {
          console.warn("ingen URL mottagen", response);
        }
      },
      error: (err) => {
        console.error("Checkout-fel:", err);
        alert(err.message || 'Kunde inte starta betalning.');
      }
    });
  }
}
