import { Platform } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'
import AuthProvider = firebase.auth.AuthProvider
import {BehaviorSubject} from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable()

export class AuthService{
    private user: firebase.User;

    authenticationState = new BehaviorSubject(false);
    //AngularFire
    constructor(public angfAuth: AngularFireAuth, private storage: Storage, private plt: Platform){
        angfAuth.authState.subscribe(user =>{
            this.user = user;
        });
    }

    signInWithEmail(credentials){
        console.log('sign in with email');
        return this.angfAuth.auth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        );
    }

    signUp(credentials){
        return this.angfAuth.auth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
        );
    }

    // mengembalikan TRUE atau FALSE kalau sudah terotentifikasi
    get authenticated():boolean{
        return this.user !== null;
    }

    getEmail(){
        return this.user && this.user.email;
    }

    signOut(): Promise<void>{
        return this.angfAuth.auth.signOut();
    }

    signInWithGoogle(){
        console.log('sign in with google');
        return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    }

    private oauthSignIn(provider: AuthProvider){
        if(!(<any>window ).cordova){
            return this.angfAuth.auth.signInWithPopup(provider);
        } else{
            return this.angfAuth.auth.signInWithRedirect(provider).then(
                ()=>{
                    return this.angfAuth.auth.getRedirectResult().then(
                        result => {
                            //token untuk akses ke google
                            // TAPI BELUM TAHU KAYAKNYA ADA YANG SALAH yang providerId
                            // referensi
                            // https://github.com/appseed-io/ionic3-firebase-auth/blob/master/src/services/auth.service.ts
                            // result.credential.accessToken
                            let token = result.credential.providerId

                            let user = result.user;
                            console.log(token, user);
                        }
                    ).catch(function(error){
                        //untuk handle error di sini
                        alert(error.message);
                    });
                }
            );
        }
    }
}