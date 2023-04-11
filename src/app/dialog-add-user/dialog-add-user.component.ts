import { Component } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user= new User();
  birthDate!: Date;
  coll = collection(this.firestore, 'users')

  constructor(public firestore: Firestore) {}

  cancel() {
    
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('current user is', this.user);
    // setDoc(doc(this.coll), this.user.toJSON()).then((result:any) => {
    //   console.log('Adding user finished', result);
    // });
    // lieber mit addDoc arbeiten
    addDoc(this.coll, this.user.toJSON()).then((result:any) => {
      console.log('Adding user finished', result);
    });
    // muss mit toJSON() in ein JSON umgewandelt werden, da firebase nur JSONS und keine Objekte speichern kann
  }
}
