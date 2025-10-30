import {Component, OnInit} from '@angular/core';
import {EventItem} from '../../eventns/event.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../eventns/event-service';
import {NgIf} from '@angular/common';
import {StripeCheckoutService} from '../../checkout/stripeCheckout-service';
import {TicketReservationService} from '../ticketReservation-service';
import {switchMap} from 'rxjs';
import {CheckoutStateService} from '../../../service/checkoutStateService';

@Component({
  selector: 'app-ticket-component',
  imports: [
    NgIf
  ],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css'
})
export class TicketComponent implements OnInit {

  totalTickets: number = 1;
  totalPrice: number = 0;
  event: EventItem | null = null;


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private stripeCheckoutService: StripeCheckoutService,
    private ticketReservationService: TicketReservationService,
    private checkoutState: CheckoutStateService
  ) {
  }

  increment() {
    if (this.event && this.totalTickets <= this.event?.ticketAvailable) {
      this.totalTickets++;
      console.log("Quantity tickets: ", this.totalTickets)
      console.log("Event id: ", this.event.id)
      this.totalPrice = this.event?.price * this.totalTickets;
    }
  }

  decrement() {
    if (this.event && this.totalTickets >= 1) {
      this.totalTickets--;
      console.log("Quantity tickets: ", this.totalTickets)
      console.log("Event id: ", this.event.id)
      this.totalPrice = this.event?.price * this.totalTickets;
    } else {
      console.log("Cant get lower then 0")
    }
  }


  // Hämta total pris
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // get id from URL

    if (id) {
      this.eventService.getEventById(id).subscribe((data) => {
        this.event = data;
        this.totalPrice = this.event.price * this.totalTickets;
      });
    }
  }

  goToCheckoutPage(): void {
    if (!this.event) return;


    this.ticketReservationService
      .createTicketReservation(this.event!.id, this.totalTickets)
      .subscribe({
        next: (res) => {
          console.log("Reservation skapad:", res);

          //save data in shared state so checkout page knows what data to use
          this.checkoutState.setState({
            eventId: this.event!.id,
            totalTickets: this.totalTickets,
            totalPrice: this.totalPrice,
            reservationId: res.id
          });

          // navigate to checkout-page when reservation is done
          this.router.navigate(['/checkout-page']);
        },
        error: (err) => {
          console.error("Could not crate reservation", err)
        }
      });

  }
}
