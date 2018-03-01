import { Component } from '@angular/core';

import { ChatComponent } from './components/chat/chat.component';
import { ChatService } from './providers/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    public _cs: ChatService
  ) {

  }

}
