import { Routes } from '@angular/router';
import {App} from './app';
import {TicketComponent} from './components/ticket/ticket-component/ticket-component';
import {EventComponent} from './components/eventns/event-component/event-component';
import {CheckoutStripeComponent} from './components/checkout/checkoutStripe-component/checkoutStripe-component';
import {SuccessPage} from './components/successPage/successSite/success-page';
import {CheckoutPage} from './components/checkout/checkout-page/checkout-page';

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
    path: 'checkout-page',
    component: CheckoutPage,
  },
  {
    path: 'success',
    component: SuccessPage,
  },

];
