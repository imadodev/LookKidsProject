import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { retry } from 'rxjs/operators/retry';
import { User } from '../Model/user.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  withCredentials: false
  
  
  
};


  
 
@Injectable()
export class LookKidsService {
  private heroesUrl = 'http://localhost:58292/api/Test/AddUser';  // URL to web api
  constructor(private http: HttpClient) { 
  }
  getAllProduct(): Observable<any[]> {
    return this.http.get<any[]>('../../assets/GetAllProduct/Product.json')
  }
  getFlashProduct(): Observable<any[]> {
    return this.http.get<any[]>('../../assets/GetAllProduct/FlashProduct.json')
  }
  getToMorrowProduct(): Observable<any[]> {
    return this.http.get<any[]>('../../assets/GetAllProduct/ToMorrowProduct.json')
  }
  getFutureSale(): Observable<any[]> {
    return this.http.get<any[]>('../../assets/GetAllProduct/FutureProduct.json')
  }
  getAllSubUniver(): Observable<any[]> {
    return this.http.get<any[]>('../../assets/GetAllSubUniver/-1.json')
  }
  getSubUniver(id: number): Observable<any[]> {
    var url='../../assets/GetAllSubUniverByProductId/'+id;   
     var data=this.http.get<any[]>(url+'.json')
     return data;
    }
   getProductDetail(id: number): Observable<any> {
      var url='../../assets/GetProductDetailBySubUniverId/'+id;   
       var data=this.http.get(url+'.json')
       return data;
      }
  /** POST: add a new hero to the server */
  addUser (user: User): Observable<User> {
   var tt= this.http.post<User>(this.heroesUrl,user);
    tt.subscribe(pp=>console.log("pp",pp));
    return tt;
  }
}