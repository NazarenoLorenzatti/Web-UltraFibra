import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Client} from '../../templates/models/customer.model';

const base_url = "http://localhost:8002/api/gr";
//const base_url = "https://ultrafibra.com.ar:8002/api/gr";

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private customerSubject = new BehaviorSubject<Client | null>(null);
  customer$ = this.customerSubject.asObservable();

  public token: any;
  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
  }

  getAllUsers(){
    const endpoint = `${base_url}/get-users`;
    return this.http.get(endpoint);
  }

  signUp(body: any){
    const endpoint = `${base_url}/signup`;
    return this.http.post(endpoint, body);
  }

  editPassword(body: any){
    const token = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    const endpoint = `${base_url}/edit-password`;
    return this.http.put(endpoint, body , { headers });
  }

  editEmail(body: any){
    const token = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    const endpoint = `${base_url}/edit-email`;
    return this.http.put(endpoint, body , { headers });
  }
  
  logout(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('dni')
  }

  forwaredEmail(email: string){
    const endpoint = `${base_url}/forward-email/${email}`;
    return this.http.get(endpoint);
  }

  forwaredEmailByDni(dni: string){
    const endpoint = `${base_url}/forward-email-dni/${dni}`;
    return this.http.get(endpoint);
  }

  recoveryPassword(email: string, dni: string){
    const endpoint = `${base_url}/recovery-password/${email}/${dni}`;
    return this.http.get(endpoint);
  }

  confirmEmail(token: string){
    const endpoint = `${base_url}/confirm/${token}`;
    return this.http.get(endpoint);
  }

  signIn(body: any){
    const endpoint = `${base_url}/signin`;
    return this.http.post(endpoint, body);
  }

  findUser(body: any) {
    const token = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    const endpoint = `${base_url}/find`;
    return this.http.post(endpoint, body, { headers });
  }


  getClient(body: any) {
    const token = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    const endpoint = `${base_url}/get-client`;
    return this.http.post(endpoint, body, { headers });
  }

  fetchCustomer(body: any): Observable<Client> {
    const token = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    const endpoint = `${base_url}/get-client`;
    return this.http.post<Client>(endpoint, body, { headers }).pipe(
      tap(customer => this.customerSubject.next(customer))
    );
  }

  getCurrentCustomer(): Client | null {
    return this.customerSubject.value;
  }

  generatePaymentCommitment(formData: FormData){
    const token = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    const endpoint = `${base_url}/generate-cp`;
    return this.http.post(endpoint, formData, { headers });
  }


  getCurrentAccount(idClient : string){
    const token = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    const endpoint = `${base_url}/current-account/${idClient}`;
    return this.http.get(endpoint, {headers});
  }
}
