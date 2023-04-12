import { Component } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  allUsers$: Observable<any> | undefined
  allUsers: Array<any> | undefined
  

  constructor(public dialog: MatDialog, public firestore: Firestore) {
    const coll = collection(this.firestore, 'users');
    this.allUsers$ = collectionData(coll);
    this.allUsers$.subscribe ((newUsers) => {
      // console.log('Neue User sind:', newUsers);
      this.allUsers = newUsers;
    })
    // update aus Datenbank; collection abonniert
    // mit dem Array allUsers verknüpft
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
