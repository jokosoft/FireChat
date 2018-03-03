import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';
import { Mensaje } from '../../interface/mensaje.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje = '';
  elemento: any;

  constructor(
    public _cs: ChatService
  ) {
      this._cs.cargarMensajes()
          .subscribe( () => {

            setTimeout(() => {
              this.elemento.scrollTop = this.elemento.scrollHeight;
            }, 20);

          });

   }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje() {

    if ( this.mensaje.length === 0 ) {
      return;
    }

    this._cs.agregarMensaje( this.mensaje )
          .then( () => this.mensaje = '' )
          .catch( (err) => console.error('Error al enviar', err) );

  }

  chatClick(chat: Mensaje) {
    this._cs.establecerDatosDetalle(chat);
  }

}
