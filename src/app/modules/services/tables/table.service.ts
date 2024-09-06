import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*const base_url = "http://localhost:8080/api/gr";*/ 
const base_url = "https://ultrafibra.com.ar:8002/api/gr";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  public token: any;

  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('token');
  }

    getTable(body: string){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/get-table`;
    return this.http.post(endpoint, body, { headers });
  }
}
