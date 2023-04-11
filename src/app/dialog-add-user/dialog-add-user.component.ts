import { Component, ElementRef, ViewChild } from '@angular/core';
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
  loading = false;
  @ViewChild('fN') fN!: ElementRef;
  @ViewChild('lN') lN!: ElementRef;
  @ViewChild('birth') birth!: ElementRef;
  @ViewChild('str') str!: ElementRef;
  @ViewChild('nr') nr!: ElementRef;
  @ViewChild('code') code!: ElementRef;
  @ViewChild('ct') ct!: ElementRef;
  @ViewChild('cancelbtn') cancelbtn!: ElementRef;
  @ViewChild('savebtn') savebtn!: ElementRef;

  constructor(public firestore: Firestore) {}

  cancel() {
    
  }

  saveUser() {
    let fN = this.fN.nativeElement;
    let lN = this.lN.nativeElement;
    let birth = this.birth.nativeElement;
    let str = this.str.nativeElement;
    let nr = this.nr.nativeElement;
    let code = this.code.nativeElement;
    let ct = this.ct.nativeElement;
    let cancelbtn = this.cancelbtn.nativeElement;
    let savebtn = this.savebtn.nativeElement;

    this.user.birthDate = this.birthDate.getTime();
    console.log('current user is', this.user);
    this.loading = true;
    this.deactivateFields(fN, lN, birth, str, nr, code, ct, cancelbtn, savebtn);
    // setDoc(doc(this.coll), this.user.toJSON()).then((result:any) => {
    //   console.log('Adding user finished', result);
    // });
    // lieber mit addDoc arbeiten
    addDoc(this.coll, this.user.toJSON()).then((result:any) => {
      this.loading = false;
      this.activateFields(fN, lN, birth, str, nr, code, ct, cancelbtn, savebtn);
      console.log('Adding user finished', result);
    });
    // muss mit toJSON() in ein JSON umgewandelt werden, da firebase nur JSONS und keine Objekte speichern kann
  }

  deactivateFields(fN: any, lN: any, birth: any, str: any, nr: any, code: any, ct: any, cancelbtn: any, savebtn: any) {
    console.log('hallo')
    fN.disabled = true;
    lN.disabled = true;
    birth.disabled = true;
    str.disabled = true;
    nr.disabled = true;
    code.disabled = true;
    ct.disabled = true;
    cancelbtn.disabled = true;
    savebtn.disabled = true;
  }

  activateFields(firstName: any, lastName: any, birth: any, street: any, number: any, zipcode: any, city: any, cancelbtn: any, savebtn: any) {
    console.log('tschüss')
    // firstName.disabled = false;
    // lastName.disabled = false;
    // birth.disabled = false;
    // street.disabled = false;
    // number.disabled = false;
    // zipcode.disabled = false;
    // city.disabled = false;
    // cancelbtn.disabled = false;
    // savebtn.disabled = false;
  }
}
