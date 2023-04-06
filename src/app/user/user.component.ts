import { Component } from '@angular/core';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
