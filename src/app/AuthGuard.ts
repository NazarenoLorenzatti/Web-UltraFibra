// auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import {jwtDecode} from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = sessionStorage.getItem('token');
    const fechaString = sessionStorage.getItem('expirationDate');

    if (fechaString && token) {

      const meses = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];     
      const partesFecha = fechaString.split(" ");
      const dia = parseInt(partesFecha[2], 10);
      const mes = meses.indexOf(partesFecha[1]);
      const anio = parseInt(partesFecha[5], 10);
      const horaMinSeg = partesFecha[3].split(":");
      const hora = parseInt(horaMinSeg[0], 10);
      const minutos = parseInt(horaMinSeg[1], 10);
      const segundos = parseInt(horaMinSeg[2], 10);

      const fechaExpiracion = new Date(anio, mes, dia, hora, minutos, segundos);

      if(fechaExpiracion > new Date()){
        return true;
      } else {
        this.router.navigate(['/app/home']);
        return false;
      }

    } else {
      this.router.navigate(['/app/home']);
      return false;
    }
    
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}