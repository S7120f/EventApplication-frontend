import {Injectable} from '@angular/core';
import {Client, Message} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {BehaviorSubject} from 'rxjs';



@Injectable({ // Görs så service kan användas i hela appen
  providedIn: 'root'
})

export class WebSocketService {

  // Websocket-klienten för att prata med servern
  private client: Client;
  private isConnected = false;

  // skickar signal när WS är redo
  connectionReady$ = new BehaviorSubject<boolean>(false);

  //Håller senaste data som kommer från serven
  private eventUpdates = new BehaviorSubject<any>(null);
  //Gör data tillgänglig att lyssna på i andra komponenter
  eventUpdates$ = this.eventUpdates.asObservable();



  constructor() {
    // Skapa STOMP-klient och koppla till backendens WebSocket-endpoint
    this.client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"), // backend-url
      reconnectDelay: 5000,
    });

    // När anslutningen är klar
    this.client.onConnect = () => {
      console.log("Websocket connected");
      this.isConnected = true;
      // prenumerar direkt när anslutningen är klar
      this.connectionReady$.next(true); // Signalera till komponenter
    };


    //starta anslutningen till backend
    this.client.activate()}

  // Kalla efter att anslutningen är redo
   subscribeToAllEvents() {
    if (!this.isConnected) {
      console.warn("Försöker prenumerera innan anslutning är klar");
      return;
    }

    console.log(" Subscribing to /topic/events");
    this.client.subscribe('/topic/events', (message: Message) => {
      const updatedEvent = JSON.parse(message.body);
      console.log(' Received update:', updatedEvent);
      this.eventUpdates.next(updatedEvent);
    });
  }
}

