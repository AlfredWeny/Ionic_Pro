import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactCollection: AngularFirestoreCollection<Contact>;
  private contact:Observable<Contact[]>;

  constructor(db:AngularFirestore) { 
    this.contactCollection = db.collection<Contact>('contacts');
    this.contact = this.contactCollection
    .snapshotChanges()
    .pipe(
      map(
        actions=>{
          return actions.map(x=>{
            const data = x.payload.doc.data();
            const id = x.payload.doc.id;
            return {id, ...data}
          });
        }
      )
    );
  }

  getContacts(){
    return this.contact;
  }

  getContact(id:string){
    return this.contactCollection.doc<Contact>(id).valueChanges();
  }

  update(contact:Contact, id:string){
    return this.contactCollection.doc(id).update(contact);
  }

  addContact(contact:Contact){
    return this.contactCollection.add(contact);

  }

  removeContact(id:string){
    return this.contactCollection.doc(id).delete();
  }

}
