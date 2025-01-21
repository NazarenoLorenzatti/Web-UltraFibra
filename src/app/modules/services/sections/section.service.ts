import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*const base_url = 'http://localhost:8001/api/uf';*/
const base_url = 'https://ultrafibra.com.ar:8001/api/uf';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { 
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
    const endpoint = `${base_url}/edit-text`;
    return this.http.put(endpoint, body);
  }

  editImg(formData: FormData){
    const endpoint = `${base_url}/edit-img`;
    return this.http.put(endpoint, formData);
  }
}
