import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventItem} from './event.model';


@Injectable({
providedIn: 'root'
})
export class EventService {

  private readonly apiUrl = 'http://localhost:8080/api/events';
  private readonly http = inject(HttpClient);


  getAllEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.apiUrl}`);
  }




}


