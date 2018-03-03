import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class AdminService {

  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore

  ) { }

  esAdministrador(uid: string) {

    return this.afs.collection('Admin')
      .valueChanges()
      .map(
        (Admins: any[] ) => {
          console.log(Admins);
          for ( let admin of Admins) {
            if ( uid === admin.uid && admin.activo) {
                return true;
            }
          }
          return false;
        }
      );

  }

}
