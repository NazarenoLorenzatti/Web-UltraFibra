import { Component, DoCheck, OnDestroy, OnInit, inject } from '@angular/core';
import { UserAreaComponent } from '../user-area.component';
import { Contrato, Cuenta, Client } from 'src/app/modules/templates/models/customer.model';
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

      //this.signinService.getClient(body).subscribe({
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

  constructor() {
    setInterval(() => {
      setTimeout(() => {
        this.changeKpi1 = !this.changeKpi1;
        if (this.changeKpi3 === true) {
          this.changeKpi3 = !this.changeKpi3;
        }
      }, 2000);
      setTimeout(() => {
        this.changeKpi2 = !this.changeKpi2;
        this.changeKpi1 = !this.changeKpi1;
      }, 4000);
      setTimeout(() => {
        this.changeKpi3 = !this.changeKpi3;
        this.changeKpi2 = !this.changeKpi2;
      }, 6000);
    }, 7000);
  }

  nav(nav: string) {
    this.router.navigate([nav]);
  }

  cleanString(input: string): string {
    let cleanedString = input.replace(/\[.*?\]\s*/, '').replace(/\s*-\s*.*/, '');

    switch (true) {
      case cleanedString.includes("Mega"):
        if (this.client.city.includes("Beltran") || this.client.city.includes("Baigorria") || this.client.city.includes("Bermudez")) {
          cleanedString += " 50Mb";
          break;
        } else {
          cleanedString += " 25Mb";
          break;
        }
      case cleanedString.includes("Super"):
        if (this.client.city.includes("Beltran") || this.client.city.includes("Baigorria") || this.client.city.includes("Bermudez")) {
          cleanedString += " 100Mb";
          break;
        } else {
          cleanedString += " 50Mb";
          break;
        }
      case cleanedString.includes("Ultra"):
        if (this.client.city.includes("Beltran") || this.client.city.includes("Baigorria") || this.client.city.includes("Bermudez")) {
          cleanedString += " 200Mb";
          break;
        } else {
          cleanedString += " 100Mb";
          break;
        }
    }

    if (cleanedString.includes("Plus")) {
      cleanedString += " + Tv HD";
    }

    return cleanedString;
  }
}
