// import { SigninPage } from './../pages/signin/signin';
import { AuthService } from './../providers/api/authService';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// angular & firebase
import {AngularFireModule} from 'angularfire2'
import {AngularFireAuth} from 'angularfire2/auth';
import { firebaseConfig } from './../providers/api/firebaseConfig';
import { SigninPage } from '../pages/signin/signin';
import {NgxErrorsModule} from '@ultimate/ngxerrors';
import {GooglePlus} from '@ionic-native/google-plus';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // codingan ada di dalam folder /src/providers/api/firebaseConfig.ts
    AngularFireModule.initializeApp(firebaseConfig.fire),
    NgxErrorsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService,
  ]
})
export class AppModule {}
