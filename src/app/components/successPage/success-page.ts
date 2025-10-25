import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';

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

  constructor(private route: ActivatedRoute, private http: HttpClient ) {}

  ngOnInit() {
    // read session_id from URL
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (this.sessionId) {
      // send to backend to verify payment
      this.http.get<{ status: string }>(`http://localhost:8080/api/stripe/verify?session_id=${this.sessionId}`)
        .subscribe({
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
