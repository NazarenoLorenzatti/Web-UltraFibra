import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/gr/form"

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) {}

  sendForm(formData: FormData){
    const endpoint = `${base_url}/send`;
    return this.http.post(endpoint, formData);
  }

  sendFormCv(formData: FormData){
    const endpoint = `${base_url}/send-cv`;
    return this.http.post(endpoint, formData);
  }

}
