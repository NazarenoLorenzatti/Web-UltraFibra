import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/gr"

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public token: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  getOrder(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/get-order`;
    return this.http.post(endpoint, formData, { headers });
  }

  createTicket(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/create-ticket`;
    return this.http.post(endpoint, body, { headers });
  }
}
