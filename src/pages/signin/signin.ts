import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public clientsService: ClientsService,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    this.loginForm = this.makeLoginForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menu');
  }

  doLogin(event: Event) {
    event.preventDefault();
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if(username == "kenny" && password == "123456"){
      console.log(username, password);
      const user = JSON.stringify(username);
      this.storage.set('user', user);
      this.navCtrl.setRoot('HomePage', {
        user: username
      }); 
    }else{
      const alert = this.alertCtrl.create({
        title: 'Data tidak valid',
        subTitle: 'Periksa data anda',
        buttons: ['OK']
      });
      alert.present();
    }
    
  }


  private makeLoginForm() {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}

