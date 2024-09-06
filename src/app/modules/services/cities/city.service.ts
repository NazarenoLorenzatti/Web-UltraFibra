import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*const base_url = 'http://localhost:8001/api/uf';*/
const base_url = 'https://ultrafibra.com.ar:8001/api/uf';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { 
    /*this.token = localStorage.getItem('token');*/
  }

  listCities(){
    const endpoint = `${base_url}/get-cities`;
    return this.http.get(endpoint);
  }
}
