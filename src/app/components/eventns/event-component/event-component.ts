import {Component, OnInit} from '@angular/core';
import {EventService} from '../event-service';
import {EventItem} from '../event.model';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-component',
  imports: [
    NgForOf
  ],
  templateUrl: './event-component.html',
  styleUrl: './event-component.css'
})
export class EventComponent implements OnInit{

  events: EventItem[] = [];
  constructor(
    private eventService: EventService,
    private router: Router // 👈 lägg till denna rad
  ) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data: EventItem[]) => {
      this.events = data
      console.log("min data", data)
    });
  }

  goToTicketPage(eventId: number): void{
    this.router.navigate(['/ticket'], {queryParams: { id: eventId}});
    console.log("id:", eventId)
  }

}
