import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';
import {SuccessPageService} from '../successPage-service';


@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './success-page.html',
  styleUrl: './success-page.css'
})
export class SuccessPage implements OnInit {

  sessionId: string | null = null;
  message = 'Verifierar betalning...';

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private successPageService: SuccessPageService,
              private router: Router) {}

  ngOnInit() {
    console.log('SuccessPage laddad');
    // read session_id from URL
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (this.sessionId) {
      // skicka till backend för att verifiera betalning
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

  goHome() {
    console.log("klickad på tillbaka hem knappen")
    this.router.navigate(['/']);
  }
}
