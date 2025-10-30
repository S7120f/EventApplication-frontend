import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CheckoutStateService} from '../../../service/checkoutStateService';
import {EventItem} from '../../eventns/event.model';
import {EventService} from '../../eventns/event-service';
import {NgIf} from '@angular/common';
import {TicketReservationService} from '../../ticket/ticketReservation-service';
import {StripeCheckoutService} from '../stripeCheckout-service';
import {CheckoutFlowService} from '../../../service/checkoutFlow-service';
import {TimerComponent} from '../../timer-component/timer-component';
import {TicketReservationMode} from '../../ticket/ticketReservation-mode';

@Component({
  selector: 'app-checkout-page',
  imports: [
    NgIf,
    TimerComponent
  ],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css'
})
export class CheckoutPage implements OnInit, OnDestroy{

  totalTickets: number = 0;
  totalPrice: number = 0;
  event: EventItem | null = null;
  reservationStatus!: string;
  reservationId?: number;


  isGoingToStripe = false;
  countDownSeconds = 60;



  constructor(private checkoutState: CheckoutStateService,
              private eventService: EventService,
              private ticketReservationService: TicketReservationService,
              private stripeCheckoutService: StripeCheckoutService,
              private checkoutFlowService: CheckoutFlowService,) {}

  ngOnInit() {
    const state = this.checkoutState.getState();

    this.totalTickets = state.totalTickets;
    this.totalPrice = state.totalPrice;
    this.reservationId = state.reservationId!;
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
    this.isGoingToStripe = true;

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
          window.location.href = response.url; // redirectar till Stripe
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

  /**
   * Lyssnar på webbläsarens "beforeunload"-händelse.
   * Den triggas när användaren försöker:
   * -uppdatera sidan
   * -stänga fliken/fönstret,
   * -navigera bort från sidan helt
   *
   * Om vi navigera bort från sidan innan checkout sätts event.returnValue = true
   * vilket får webbläsaren att visa en varning som säger
   * "Är du säker på att du vill lämnas sidan?
   */
  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(evet: Event){
    if (!this.isGoingToStripe) {
      this.cancelReservation();
    }
  }

  ngOnDestroy(): void {
    if (!this.isGoingToStripe) { // Körs när komponenten förstörs
      this.cancelReservation();
    }
  }


  //metoden som pratar med backend
  private cancelReservation(): void{
    if (this.reservationId) {
      this.ticketReservationService.cancelReservation(this.reservationId).subscribe({
        next: () => console.log("Reservationen avbruten automatiskt"),
        error: err => console.warn("Kunde inte avbryta reservationen", err)

      })
    }
  }
}
