import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//const base_url = "http://localhost:8002/api/debito";
const base_url = "https://ultrafibra.com.ar:8002/api/debito";

@Injectable({
  providedIn: 'root'
})
export class AdhesionDebitoService {


  public token: any;

  constructor(private http: HttpClient) {
    this.token =   this.token = sessionStorage.getItem('token');
  }

  adherirCliente(formData: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/alta`;
    return this.http.post(endpoint, formData, { headers });
  }

  darDeBajaDebito(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/baja`;
    return this.http.post(endpoint, body, { headers });
  }
}
