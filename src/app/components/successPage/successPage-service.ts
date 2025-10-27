import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuccessPageService{

  private readonly apiUrl = 'http://localhost:8080/api/stripe/verify';
  private readonly http = inject(HttpClient);


  getSessionVerification(sessionId: string): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.apiUrl}?session_id=${sessionId}`);
  }
}
