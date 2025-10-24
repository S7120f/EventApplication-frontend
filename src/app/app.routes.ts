import { Routes } from '@angular/router';
import {App} from './app';
import {TicketComponent} from './components/ticket/ticket-component/ticket-component';
import {EventComponent} from './components/eventns/event-component/event-component';
import {CheckoutComponent} from './components/checkout/checkout-component/checkout-component';

export const routes: Routes = [

  {
    path: '',
    component: EventComponent,
  },
  {
    path: 'ticket/:id',
    component: TicketComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
];
