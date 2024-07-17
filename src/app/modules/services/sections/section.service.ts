import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = 'http://localhost:8001/api/uf';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { 
    /*this.token = localStorage.getItem('token');*/
  }

  getSection(acceskey: string){
    const endpoint = `${base_url}/get-section/accesskey/${acceskey}`;
    return this.http.get(endpoint);
  }

  getSectionById(id: number){
    const endpoint = `${base_url}/get-section/id/${id}`;
    return this.http.get(endpoint);
  }

  editText(body: any){
    /*const headers = {
      Authorization: 'Bearer ' + this.token,
    };*/
    const endpoint = `${base_url}/edit-text`;
    return this.http.put(endpoint, body, /*{ headers }*/);
  }

  editImg(formData: FormData){
    /*const headers = {
      Authorization: 'Bearer ' + this.token,
    };*/
    const endpoint = `${base_url}/edit-img`;
    return this.http.put(endpoint, formData, /*{ headers }*/);
  }
}
