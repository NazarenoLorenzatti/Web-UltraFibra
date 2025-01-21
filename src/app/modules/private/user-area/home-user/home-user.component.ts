import { Component, OnInit, inject } from '@angular/core';
import { SigninService } from 'src/app/modules/services/signin/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit{

  changeKpi1 = false;
  changeKpi2 = false;
  changeKpi3 = false;
  private router = inject(Router);
  public client: any;
  private signinService = inject(SigninService);
  public official = true;

  ngOnInit(): void {
    let dni: any = sessionStorage.getItem('dni') || '"sin Dni"';
    if (dni === '"sin Dni"') {
      this.logout();
    } else {
      let body = {
        identityNumber: dni,
      }
      this.signinService.customer$.subscribe({
        next: (data: any) => {
          if (data && data.metadata && data.metadata[0].codigo === "00") {
            this.client = data.clientResponse.clients[0];
            if (this.client.cartera === "003") {
              this.official = false;
            }

            if (this.client.cuentas.invoices) {
              if (this.client.cuentas.invoices.some((fact: { tipo: string; }) => fact.tipo === "FX")) {
                this.official = false;
              }
            }
          }
        },
        error: (error: any) => {
          console.log("Error", error);
        }
      });
    }
  }


  logout() {
    this.signinService.logout().subscribe();
    this.router.navigate(['app/home']);
  }

  nav(nav: string) {
    this.router.navigate([nav]);
  }

}
