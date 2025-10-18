import { Routes } from '@angular/router';
import {App} from './app';
import {TicketComponent} from './components/ticket-component/ticket-component';
import {EventComponent} from './components/eventns/event-component/event-component';

export const routes: Routes = [

  {
    path: '',
    component: EventComponent,
  },
  {
    path: 'ticket/:id',
    component: TicketComponent,
  },
];
