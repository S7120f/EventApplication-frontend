import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

interface CheckoutState {
  eventId: number | null;
  totalTickets: number;
  totalPrice: number;
  reservationId?: number |null;
}

@Injectable({
  providedIn: 'root'
})

export class CheckoutStateService {
  private stateSource = new BehaviorSubject<CheckoutState>({
    eventId: null,
    totalTickets: 0,
    totalPrice: 0
  });

  state$ = this.stateSource.asObservable();

 // uppdatera state med nytt värde
  setState(newState: CheckoutState): void {
    this.stateSource.next(newState); // skickar nytt värde till alla som subscribat
  }

  // Hämtar nuvarande state ( Senate värdet i BehaviorSubject)
  getState(): CheckoutState {
    return this.stateSource.value;
  }

  clear() {
    this.stateSource.next({ eventId: null, totalTickets: 0, totalPrice: 0});
  }


}
