import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

@Injectable()
export class ServiceProvider {
  UrlServer:any = 'http://localhost:3000/';

  constructor(public http: Http) {
    console.log('Teste de Provaider APIRestFull');
  }

  postApi(UrlApi, data) {
    return new Promise((resolve, reject) => {
      UrlApi= this.UrlServer+UrlApi;
      this.http.post(UrlApi, data, this.createRequestOptions()).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getApi(UrlApi) {
    UrlApi= this.UrlServer+UrlApi;
    return new Promise(resolve => {
      this.http.get(UrlApi, this.createRequestOptions()).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }


  deleteApi(UrlApi) {
    UrlApi= this.UrlServer+UrlApi;
    return new Promise(resolve => {
      this.http.delete(UrlApi, this.createRequestOptions()).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  putApi(UrlApi, data) {
    UrlApi= this.UrlServer+UrlApi;
    return new Promise((resolve, reject) => {
      this.http.put(UrlApi, data, this.createRequestOptions()).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  posLogintApi(UrlApi, data) {
    UrlApi= this.UrlServer+UrlApi;
    return new Promise((resolve, reject) => {
      this.http.post(UrlApi, data, this.createRequestOptions()).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getApiFrequencia(UrlApi) {
    UrlApi= this.UrlServer+UrlApi;
    return new Promise(resolve => {
      this.http.get(UrlApi).subscribe(data => {
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
