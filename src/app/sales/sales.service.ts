import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private api = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  listSales(): Observable<any> {
    return this.http.get<any>(`${this.api}/sales`);
  }

  saveSale(sale: any): Observable<any> {
    return this.http.post<any>(`${this.api}/sales`, sale);
  }

  listCustomers(): Observable<any> {
    return this.http.get<any>(`${this.api}/customers`);
  }

  listProducts(): Observable<any> {
    return this.http.get<any>(`${this.api}/products`);
  }
}
