import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http"

// AUTHOR: Julius Tanuwijaya (juliustanuwijaya.indonesian@gmail.com)
// untuk user melakukan login, sign-up

@Injectable()
export class User{
    // url diisi tipe data string untuk tembak ke alamat API
    url: string = '';

    constructor(public http: HttpClient){}

    get(endpoint: string, params?: any, reqOpts?: any) {
        if (!reqOpts) {
          reqOpts = {
            params: new HttpParams()
          };
        }
    
        // Support easy query params for GET requests
        if (params) {
          reqOpts.params = new HttpParams();
          for (let k in params) {
            reqOpts.params = reqOpts.params.set(k, params[k]);
          }
        }
    
        return this.http.get(this.url + '/' + endpoint, reqOpts);
      }
    
      post(endpoint: string, body: any, reqOpts?: any) {
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
      }
    
      put(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
      }
    
      delete(endpoint: string, reqOpts?: any) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
      }
    
      patch(endpoint: string, body: any, reqOpts?: any) {
        return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
      }
    
}