import { AuthService } from './../../providers/api/authService';
import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Email } from '../../providers/api/emailService';
import { database } from 'firebase';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//  Injectable()
@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signInForm: FormGroup;
  signInError: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private storage: Storage,
    private auth: AuthService,
    fb: FormBuilder
  ) {
    this.signInForm = fb.group({
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menu');
  }

  login(){
    let data = this.signInForm.value;

    if(!data.email){
      return;
    }
    let credentials = {
      email: data.email,
      password: data.password
    };

    this.auth.signInWithEmail(credentials).then(
      // kalau login berhasil maka setRoot berganti ke halaman Homepage user yang telah login
      ()=> this.navCtrl.setRoot(HomePage),
      error => this.signInError = error.message
    );
  }

  signUp(){
    this.navCtrl.push(SignupPage);
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle().then(
      () => this.navCtrl.setRoot(HomePage),
      error => console.log(error.message)
    );
  }





  // doLogin(event: Event) {
  //   event.preventDefault();
  //   const username = this.loginForm.value.username;
  //   const password = this.loginForm.value.password;
  //   if(username == "kenny" && password == "123456"){
  //     console.log(username, password);
  //     const user = JSON.stringify(username);
  //     this.storage.set('user', user);
  //     this.navCtrl.setRoot('HomePage', {
  //       user: username
  //     });
  //   }else{
  //     const alert = this.alertCtrl.create({
  //       title: 'Data tidak valid',
  //       subTitle: 'Periksa data anda',
  //       buttons: ['OK']
  //     });
  //     alert.present();
  //   }

  // }

  // private makeLoginForm() {
  //   return this.formBuilder.group({
  //     username: ['', [Validators.required, Validators.minLength(4)]],
  //     password: ['', [Validators.required, Validators.minLength(6)]]
  //   });
  // }
}

