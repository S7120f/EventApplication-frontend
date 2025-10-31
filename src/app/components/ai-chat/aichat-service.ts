import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AiChatService {

  private readonly apiUrl = `${environment.apiBaseUrl}/api/chat`;
  private readonly http = inject(HttpClient);

  sendChatMessage(message: string): Observable<string> {
    console.log("Data som hämtas från serven", message)
    return this.http.post(this.apiUrl, {prompt: message}, {
      responseType: "text"
    });
  }


}
