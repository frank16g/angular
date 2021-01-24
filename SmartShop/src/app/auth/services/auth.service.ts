import { Injectable } from '@angular/core';
//import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
//import { User } from 'firebase';
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public afAuth: AngularFireAuth) { }

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string){
    try{
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email, 
        password
        );
        return result;
    }
    catch(error ){
      console.log(error);
    }
    
  }

  async logout(){
    return this.afAuth.signOut();
  }

  GetCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  hasUser(){
    return this.afAuth.authState;
  }
}

