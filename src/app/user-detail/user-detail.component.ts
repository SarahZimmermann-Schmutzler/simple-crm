import { Component, OnInit } from '@angular/core';
import { collectionData, doc, docData } from '@angular/fire/firestore';
import { Firestore, collection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user$: Observable<any>;
  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, private firestore: Firestore) { }

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
}
