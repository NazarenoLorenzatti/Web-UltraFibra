import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObsService {

  private baseUrl = 'https://ultra-storage.obs.sa-argentina-1.myhuaweicloud.com/';

  constructor(private http: HttpClient) { }

  getImage(imagePath: string): Observable<Blob> {
    const url = `${this.baseUrl}/${imagePath}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
