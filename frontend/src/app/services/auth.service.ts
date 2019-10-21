import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ToastrService} from './toastr.service';
import {of as observableOf} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {isArray} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    uid = this.afAuth.authState.pipe(
        map(authState => {
            if (!authState) {
                return null;
            } else {
                return authState.uid;
            }
        })
    );
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;
  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private router: Router,
              private toastr: ToastrService) { }
  getUser() {
    return this.afAuth.authState;
  }
  getRole(uid) {
      return this.db.collection('Users').doc(uid).snapshotChanges();
  }
    addFavourite(uid, id) {
      return this.db.collection('Users').doc(uid).update({
         favorites: firebase.firestore.FieldValue.arrayUnion(id)
      });
    }
    removeFavourite(uid, id) {
      return this.db.collection('Users').doc(uid).update({
         favorites: firebase.firestore.FieldValue.arrayRemove(id)
      });
    }
  doRegister(value) {
    this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then(userCredential => {
          this.newUser = value;
          userCredential.user.updateProfile({
            displayName: value.fullname
          });
          this.insertUserData(userCredential)
              .then(() => {
                this.toastr.success('Sign up successful!');
                this.router.navigate(['/movies']);
              });
        }).catch(error => {
          this.eventAuthError.next(error);
    });
  }
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      name: this.newUser.fullname,
      role: false
    });
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          this.eventAuthError.next(error);
        }).then(userCredential => {
          if (userCredential) {
            this.toastr.success('Logged in successful!');
            this.router.navigate(['/movies']);
          }
    });
  }
}
