import { Component, OnInit } from '@angular/core';
import { doc, docData } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user$: Observable<any>;
  userId = '';
  user: User = new User();

  constructor(
    private route: ActivatedRoute, 
    private firestore: Firestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      // console.log('Got Id', this.userId);
      this.getUser();
    })
  }

  getUser() {
    const coll = collection(this.firestore, 'users');
    const docRef = doc(coll, this.userId);
    this.user$ = docData(docRef);
    this.user$.subscribe(user => {
      this.user = new User(user);
      // console.log('Retrieved user', this.user)
    })
  }

  editAddressInfo() {
    this.dialog.open(DialogEditAddressComponent);
  }

  editUserInfo() {
    this.dialog.open(DialogEditUserComponent);
  }
}
