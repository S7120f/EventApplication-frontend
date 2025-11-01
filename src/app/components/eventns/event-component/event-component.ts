import {Component, OnInit} from '@angular/core';
import {EventService} from '../event-service';
import {EventItem} from '../event.model';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {WebSocketService} from '../../../service/WebSocketService';
import {filter} from 'rxjs';
import {AiChat} from '../../ai-chat/aichat-component/ai-chat';

@Component({
  selector: 'app-event-component',
  imports: [
    NgForOf,
    AiChat
  ],
  templateUrl: './event-component.html',
  styleUrl: './event-component.css'
})
export class EventComponent implements OnInit{

  events: EventItem[] = [];
  constructor(
    private eventService: EventService,
    private router: Router,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {

    // Hämta alla event första gången
    this.eventService.getAllEvents().subscribe((data: EventItem[]) => {
      this.events = data
      console.log("min data", data)
    });

    this.webSocketService.connectionReady$.subscribe((isReady) => {
      if (isReady) {
        this.webSocketService.subscribeToAllEvents();
      }
    });


    //Lyssna på inkommande meddelande
    this.webSocketService.eventUpdates$
      .pipe(filter(event => !!event)) // släpp endast genom värden som inte är null eller undefined - !!event omvandlar värdet till true eller false
      .subscribe(updateEvent => {
        // gå genom alla events i listan, ersätt det som har samma ID
        this.events = this.events.map(e =>
          e.id === updateEvent.id ? updateEvent : e)
      });
  }

  goToTicketPage(eventId: number): void{
    this.router.navigate(['/ticket', eventId], {queryParams: { id: eventId}});
    console.log("id:", eventId)
  }

}
