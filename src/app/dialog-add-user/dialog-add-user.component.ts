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
  @ViewChild('firstName') firstName!: ElementRef;
  @ViewChild('lastName') lastName!: ElementRef;
  @ViewChild('birth') birth!: ElementRef;
  @ViewChild('street') street!: ElementRef;
  @ViewChild('number') number!: ElementRef;
  @ViewChild('zipcode') zipcode!: ElementRef;
  @ViewChild('city') city!: ElementRef;
  @ViewChild('cancelbtn') cancelbtn!: ElementRef;
  @ViewChild('savebtn') savebtn!: ElementRef;

  constructor(public firestore: Firestore) {}

  cancel() {
    
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('current user is', this.user);
    this.loading = true;
    this.deactivateFields();
    // setDoc(doc(this.coll), this.user.toJSON()).then((result:any) => {
    //   console.log('Adding user finished', result);
    // });
    // lieber mit addDoc arbeiten
    addDoc(this.coll, this.user.toJSON()).then((result:any) => {
      this.loading = false;
      this.activateFields();
      console.log('Adding user finished', result);
    });
    // muss mit toJSON() in ein JSON umgewandelt werden, da firebase nur JSONS und keine Objekte speichern kann
  }

  deactivateFields() {
    let firstName = this.firstName.nativeElement
    let lastName = this.lastName.nativeElement
    let birth = this.birth.nativeElement
    let street = this.street.nativeElement
    let number = this.number.nativeElement
    let zipcode = this.zipcode.nativeElement
    let city = this.city.nativeElement
    let cancelbtn = this.cancelbtn.nativeElement
    let savebtn = this.savebtn.nativeElement

    firstName.disable = true;
    lastName.disable = true;
    birth.disable = true;
    street.disable = true;
    number.disable = true;
    zipcode.disable = true;
    city.disable = true;
    cancelbtn.disable = true;
    savebtn.disable = true;
  }

  activateFields() {
    let firstName = this.firstName.nativeElement
    let lastName = this.lastName.nativeElement
    let birth = this.birth.nativeElement
    let street = this.street.nativeElement
    let number = this.number.nativeElement
    let zipcode = this.zipcode.nativeElement
    let city = this.city.nativeElement
    let cancelbtn = this.cancelbtn.nativeElement
    let savebtn = this.savebtn.nativeElement

    firstName.disable = false;
    lastName.disable = false;
    birth.disable = false;
    street.disable = false;
    number.disable = false;
    zipcode.disable = false;
    city.disable = false;
    cancelbtn.disable = false;
    savebtn.disable = false;
  }
}
