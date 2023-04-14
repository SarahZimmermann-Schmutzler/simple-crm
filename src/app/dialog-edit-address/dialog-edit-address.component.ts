import { Component } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user: User;
  userId: string;
  loading = false;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditAddressComponent>) {}

  cancel() {
    this.dialogRef.close();
  }

  saveChanges() {
    let coll = collection(this.firestore, 'users');
    let docRef = doc(coll, this.userId);
    this.loading = true;
    updateDoc(docRef, this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
