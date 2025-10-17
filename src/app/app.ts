import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {EventComponent} from './components/eventns/event-component/event-component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink

  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EventApplication-frontend');
}
