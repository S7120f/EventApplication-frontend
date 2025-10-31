import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SuccessPageService{

  private readonly apiUrl = `${environment.apiBaseUrl}/api/stripe/verify`;
  private readonly http = inject(HttpClient);


  getSessionVerification(sessionId: string): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.apiUrl}?session_id=${sessionId}`);
  }
}
