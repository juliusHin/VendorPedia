import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/observable/fromPromise'
// import {HttpClient, HttpParams} from "@angular/common/http"
import { Api } from '../api/api';

// AUTHOR: Julius Tanuwijaya (juliustanuwijaya.indonesian@gmail.com)
// untuk user melakukan login, sign-up

// secara default mengembalikan objek JSON

/**
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 */

@Injectable()
export class User{
    _user: any;

    constructor(public api: Api){   }
    
    /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    //   TOLONG DICEK KENAPA 'share()' nya error. TERIMA KASIH
    let seq = this.api.post('login',accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}