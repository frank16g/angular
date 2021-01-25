import { Injectable } from '@angular/core';
//import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
//import { User } from 'firebase';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public afAuth: AngularFireAuth) { }
  
  email:string="pepe";
  
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    }
    catch (error) {
      console.log(error);
    }

  }

  async logout() {
    return this.afAuth.signOut();
  }

  GetCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  hasUser() {
    return this.afAuth.authState;
  }

  usuarioLogeado() {
    
    this.afAuth.onAuthStateChanged((user) => {
      let correo;  
      if (user) {
        console.log("signin", user.email);
        this.email=user.email;
      } else {
        console.log("signout");
      }
      console.log("correo",correo);
      return correo;
    });
    
  }
}

