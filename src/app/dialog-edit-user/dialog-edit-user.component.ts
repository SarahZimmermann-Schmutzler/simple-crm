import { Component } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user: User;
  userId: string;
  loading = false;
  birthDate!: Date;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  cancel() {
    this.dialogRef.close();
  }

  saveChanges() {
    let coll = collection(this.firestore, 'users');
    let docRef = doc(coll, this.userId);
    // this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    updateDoc(docRef, this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });

  }
}
