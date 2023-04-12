import { Component, OnInit } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { initializeApp } from '@angular/fire/app';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  allUsers: Array<any> | undefined
  
  constructor(public dialog: MatDialog, public firestore: Firestore) {}

  ngOnInit(): void {
    const collectionRef = collection(this.firestore, 'users');
    collectionData(collectionRef, {idField: 'id'}).subscribe(newUsers => {
      console.log('Neue User sind', newUsers);
      this.allUsers = newUsers;
    })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
