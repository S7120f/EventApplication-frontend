import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-timer-component',
  imports: [
    NgIf
  ],
  templateUrl: './timer-component.html',
  styleUrl: './timer-component.css'
})
export class TimerComponent implements OnInit {

  @Input() seconds: number = 0;
  remaining = 0;

  constructor(private router: Router) {}


  ngOnInit(): void {
    this.remaining = this.seconds;

    const interval = setInterval(() => {
      this.remaining--;


      if(this.remaining <= 0) {
        clearInterval(interval); // stoppar när tiden är slut
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }

  goBack() {
    this.router.navigate(["/"]);
  }


}
