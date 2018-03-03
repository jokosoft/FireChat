import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';
import { Mensaje } from '../../interface/mensaje.interface';
import { AdminService } from '../../providers/admin.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})

export class PerfilComponent implements OnInit {

public esAdmin: boolean = false;

  constructor(
    public _cs: ChatService,
    public _as: AdminService
  ) { }

  ngOnInit() {

    this.esAdministrador(this._cs.usuario.uid);
  }

public esMismoUsuario(): boolean {
  return this._cs.detalleMensaje.uid === this._cs.usuario.uid;
}

  eliminarMensaje( mensaje: Mensaje ) {
    this._cs.eliminarMensaje(mensaje)
        .then( () => this._cs.quitarDatosDetalle() )
        .catch( (err) => console.log('Error al eliminar: ', err) );
  }

  borradoFisicoMensaje(mensaje: Mensaje) {
    this._cs.borradoFisicoMensaje(mensaje)
        .then( () => this._cs.quitarDatosDetalle() )
        .catch( (err) => console.log('Error en el borrado físico: ', err) );
  }

  esAdministrador(uid: string) {
    this._as.esAdministrador(uid)
      .subscribe( (esAdmin: boolean) => {
        this.esAdmin = esAdmin;
      });

  }

}
