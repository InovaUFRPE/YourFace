import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }
  
  postApi(UrlApi, data) {
    return new Promise((resolve, reject) => {
      this.http.post(UrlApi, data, this.createRequestOptions()).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getApi(UrlApi) {
    return new Promise(resolve => {
      this.http.get(UrlApi, this.createRequestOptions()).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  private createRequestOptions() {
    let headers = new Headers();
    headers.append("Authorization", 'JWT '+ localStorage.getItem("token"));
    headers.append("Content-Type", "application/json");
    return new RequestOptions({ headers: headers });
  }

}
