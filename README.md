#  EventApplication Frontend

Detta är frontend-delen av **EventApplication**, en webbapplikation för att visa event, reservera biljetter och genomföra betalningar via **Stripe**.

Frontend är byggd i **Angular** och kommunicerar med backend byggd i **Spring Boot**.

---

##  Funktionalitet

- Visa alla tillgängliga event  
- Reservera biljetter  
- Betala med **Stripe Checkout**  
- Bekräftelsesida efter betalning  
- Realtidsuppdatering av biljetter via **WebSocket**

---

##  Teknologier

- **Angular 17+**
- **TypeScript**
- **RxJS / HttpClient**
- **Stripe.js**
- **WebSocket (SockJS / STOMP)**

---

##  Installation & körning (lokalt)

### 1️ Klona projektet

```bash
git clone https://github.com/S7120f/EventApplication-frontend.git
cd EventApplication-frontend
2️. Installera beroenden
bash
Kopiera kod
npm install
3️. Starta utvecklingsservern
bash
Kopiera kod
ng serve
Frontend startar då på:
 http://localhost:4200

Se till att backend (Spring Boot) körs samtidigt på http://localhost:8080.

 Miljöinställningar
Frontend använder backend-API:t som anges i filen:

ts
Kopiera kod
// src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api'
};
För produktion (om du bygger för test på server):

ts
Kopiera kod
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://din-produktions-url/api'
};
 Tester
Kör enhetstester med:

bash
Kopiera kod
ng test

backend -> https://github.com/S7120f/EventApplication-backend-.git
