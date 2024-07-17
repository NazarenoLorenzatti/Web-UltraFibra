import { Component, OnInit, inject } from '@angular/core';
import { UserAreaComponent } from '../user-area.component';
import { Contrato, Cuenta, Client } from 'src/app/modules/templates/models/customer.model';
import { SigninService } from 'src/app/modules/services/signin/signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent {

  changeKpi1 = false;
  changeKpi2 = false;
  changeKpi3 = false;
  private router = inject(Router);
  public client: any;
  private signinService = inject(SigninService);

  constructor(){    
    this.signinService.customer$.subscribe({
      next: (data: any) => {
        if(data.metadata[0].codigo == "00"){
          console.log(data.clientResponse.clients[0])
          this.client = data.clientResponse.clients[0];
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }   
    });

    setInterval(() => {
      setTimeout(() => {
        this.changeKpi1 = ! this.changeKpi1;
        if(this.changeKpi3 === true){
          this.changeKpi3 = ! this.changeKpi3;
        }
      }, 2000);
      setTimeout(() => {
        this.changeKpi2 = ! this.changeKpi2;
        this.changeKpi1 = ! this.changeKpi1;
      }, 4000); 
      setTimeout(() => {
        this.changeKpi3 = ! this.changeKpi3;
        this.changeKpi2 = ! this.changeKpi2;
      }, 6000);      
    }, 7000); 
  } 

  nav(nav: string) {
    this.router.navigate([nav]);
  }
}
