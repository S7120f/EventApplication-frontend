import {EventItem} from '../eventns/event.model';

export interface TicketReservationMode {
  id: number,
  event: EventItem,
  quantity: number,
  reservedUntil: string,
  status: string

}
