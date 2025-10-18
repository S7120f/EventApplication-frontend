import {Component, OnInit} from '@angular/core';
import {EventItem} from '../eventns/event.model';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../eventns/event-service';
import {NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-ticket-component',
  imports: [
    NgIf
  ],
  templateUrl: './ticket-component.html',
  styleUrl: './ticket-component.css'
})
export class TicketComponent implements OnInit{

  event: EventItem | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // get id from URL

    if(id) {
      this.eventService.getEventById(id).subscribe((data) => {
        this.event =  data;
      });
    }
  }


}
