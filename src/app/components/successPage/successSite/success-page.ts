import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';
import {SuccessPageService} from '../successPage-service';

@Component({
  selector: 'app-success-page',
  imports: [
    NgIf
  ],
  templateUrl: './success-page.html',
  styleUrl: './success-page.css'
})
export class SuccessPage implements OnInit {

  sessionId: string | null = null;
  message = 'Verifierar betalning...';

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private successPageService: SuccessPageService ) {}

  ngOnInit() {
    // read session_id from URL
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (this.sessionId) {
      // send to backend to verify payment
      this.successPageService.getSessionVerification(this.sessionId).subscribe({
          next: (res) => {
            if (res.status === "success") {
              this.message = "Betalningen är genomförd! Tack för ditt köp";
            } else {
              this.message = "Kunde inte bekräfta betalning";
            }
          },
          error: () => {
            this.message = "Kunde inte bekräfta betalning"
          }
        });
    }
  }
}
