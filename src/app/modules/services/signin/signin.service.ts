import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Client} from '../../templates/models/customer.model';

const base_url = "http://localhost:8080/api/gr"

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private customerSubject = new BehaviorSubject<Client | null>(null);
  customer$ = this.customerSubject.asObservable();

  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  signIn(formData: FormData){
    const endpoint = `${base_url}/signin`;
    return this.http.post(endpoint, formData);
  }

  getClient(formData: FormData) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/get-client`;
    return this.http.post(endpoint, formData, { headers });
  }

  fetchCustomer(formData: FormData): Observable<Client> {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/get-client`;
    return this.http.post<Client>(endpoint, formData, { headers }).pipe(
      tap(customer => this.customerSubject.next(customer))
    );
  }

  getCurrentCustomer(): Client | null {
    return this.customerSubject.value;
  }

}
