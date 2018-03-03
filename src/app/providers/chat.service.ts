import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Mensaje } from '../interface/mensaje.interface';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats: Mensaje[] = [];

public usuario: any = {};
public detalleMensaje: Mensaje = null;

  constructor(
      private afs: AngularFirestore,
      public afAuth: AngularFireAuth
  ) {

      this.afAuth.authState.subscribe( user => {

        if ( !user ) {
          return;
        }

        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        this.usuario.foto = user.photoURL;
        this.usuario.email = user.email;

      });

   }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.usuario = {};
    this.quitarDatosDetalle();
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                          .limit(5) );

    return this.itemsCollection.valueChanges()
            .map( (mensajes: Mensaje[] ) => {

            this.chats = [];

            for ( let mensaje of mensajes ) {
              this.chats.unshift( mensaje );
            }

            return this.chats;

            } );
  }

  agregarMensaje( texto: string ) {

    let fecha = new Date().getTime();

    let mensaje: Mensaje = {
      uid: this.usuario.uid,
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: fecha,
      _id: this.usuario.uid + fecha,
      eliminado: false,
      email: this.usuario.email,
      foto: this.usuario.foto,
    };

    return this.itemsCollection.doc(mensaje._id).set(mensaje);

  }

  eliminarMensaje(mensaje: Mensaje) {
    // se actualiza el texto del campo mensaje a ..este mensaje ha sido eliminado
    return this.itemsCollection.doc(mensaje._id)
            .update({ eliminado: true });
  }

  borradoFisicoMensaje(mensaje: Mensaje) {
    return this.itemsCollection.doc(mensaje._id)
            .delete();
  }

  establecerDatosDetalle( chat: Mensaje ) {
    this.detalleMensaje = chat;
    this.detalleMensaje.fechaString = new Date(chat.fecha).toLocaleString();
  }

  quitarDatosDetalle() {
    this.detalleMensaje = null;
  }

}
