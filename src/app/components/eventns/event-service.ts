import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventItem} from './event.model';
import {environment} from '../../environments/environment';


@Injectable({
providedIn: 'root'
})
export class EventService {

  private readonly apiUrl = `${environment.apiBaseUrl}/api/events`;
  private readonly http = inject(HttpClient);


  getAllEvents(): Observable<EventItem[]> {
    return this.http.get<EventItem[]>(`${this.apiUrl}`);
  }


  getEventById(id: number): Observable<EventItem> {
    return this.http.get<EventItem>(`${this.apiUrl}/${id}`)

  }
}


