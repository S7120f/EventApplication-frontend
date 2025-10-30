import {Component, Input, input} from '@angular/core';
import {AiChatService} from '../aichat-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-ai-chat',
  imports: [
    FormsModule
  ],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css'
})
export class AiChat {

  userMessage = '';
  aiResponse = '';

  constructor( private aiChatService: AiChatService) {}

  send() {
    if (!this.userMessage.trim()) return;


    this.aiChatService.sendChatMessage(this.userMessage).subscribe({
      next: (res) => this.aiResponse = res,
      error: (err) => this.aiResponse = "Fel" + err.message,
    });

    this.userMessage = "";
  }

}
