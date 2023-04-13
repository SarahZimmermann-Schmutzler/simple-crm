import { Component } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
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
  loading = false;

  constructor(
    public firestore: Firestore, 
    public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  cancel() {
    this.dialogRef.close();
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('current user is', this.user);
    this.loading = true;
    // setDoc(doc(this.coll), this.user.toJSON()).then((result:any) => {
    //   console.log('Adding user finished', result);
    // });
    // lieber mit addDoc arbeiten
    addDoc(this.coll, this.user.toJSON()).then((result:any) => {
      this.loading = false;
      console.log('Adding user finished', result);
      this.dialogRef.close();
    });
    // muss mit toJSON() in ein JSON umgewandelt werden, da firebase nur JSONS und keine Objekte speichern kann
  }
}
