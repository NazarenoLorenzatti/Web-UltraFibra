import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContratacionService {

  //private readonly endpoint = 'http://localhost:8002/api/public/contractations/submit';

  private readonly endpoint = 'https://ultrafibra.com.ar:8002/api/public/contractations/submit';

  constructor(
    private readonly http: HttpClient
  ) {}

  enviarSolicitud(
    request: ContratacionRequest
  ): Observable<ContratacionResponse> {

    return this.http.post<ContratacionResponse>(
      this.endpoint,
      request
    );
  }
}


export interface ContratacionRequest {
  plan: {
    id: string;
    nombre: string;
    velocidad: string;
    extra?: string;
    precio: number;
    mesesPromocion?: number;
  };

  datosPersonales: {
    nombreApellido: string;
    dni: string;
    telefono: string;
    email: string;
    preferenciaContacto: string;
    comentario?: string;
  };

  domicilio: {
    direccion: string;
    referencia?: string;
    latitude: number;
    longitude: number;
    city?: string;
    province?: string;
    neighborhood?: string;
    zone?: string;
  };
}

export interface ContratacionResponse {
  success: boolean;
  message: string;
  ticketNumber?: string;
}