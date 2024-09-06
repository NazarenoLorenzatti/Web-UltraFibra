import { Component, DoCheck, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { SigninService } from '../../services/signin/signin.service';
import { MediaMatcher } from '@angular/cdk/layout';

interface btnNav {
  label: string;
  nav: string;
  icon: string;
}

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent implements OnDestroy, OnInit{

  smallScreen: MediaQueryList;
  pantallaCeluListener: () => void;
  isSmallScreen: boolean = false;
  isSideBarActive: boolean = false;
  oculto: boolean = false;
  public listBtnNav: btnNav[];
  private router = inject(Router);
  private signinService = inject(SigninService);
  private messageService = inject(MessageService);
  public client: any;

  constructor(media: MediaMatcher) {
    this.smallScreen = media.matchMedia('(max-width: 1249px)');
    this.pantallaCeluListener = () => {
      this.detectarCambioPantalla();
    };
    this.smallScreen.addEventListener('change', this.pantallaCeluListener);

    this.listBtnNav = [
      {
        label: "Inicio",
        nav: '/user/home',
        icon: "pi pi-home"
      },
      {
        label: "Mis Facturas",
        nav: '/user/invoices',
        icon: "pi pi-file-pdf"
      },
      {
        label: "Mis Servicios",
        nav: '/user/services',
        icon: "pi pi-building"
      },
      {
        label: "Reclamo",
        nav: '/user/tickets',
        icon: "pi pi-ticket"
      }
    ];
  }

  ngOnInit(): void {
    this.detectarCambioPantalla();
    let dni: any = sessionStorage.getItem('dni') || '"sin Dni"';    
    if (dni === '"sin Dni"') {
      this.logout();
    } else {
      let body = {
        identityNumber: dni,
      }
      if (sessionStorage.getItem('token')) {
        //this.signinService.getClient(body).subscribe({
        this.signinService.fetchCustomer(body).subscribe({
          next: (data: any) => {
            if (data && data.metadata && data.metadata[0].codigo === "00") {
              this.client = data.clientResponse.clients[0];
              if (this.client) {
                this.router.navigate(['user/home']);
              }
            }
          },
          error: (error: any) => {
            console.log("Error", error);
          }
        });
      } else {
        this.logout();
      }
    }
  }
  
  ngOnDestroy() {
   this.signinService.logout().subscribe();
    this.smallScreen.removeEventListener('change', this.pantallaCeluListener);
  }


  detectarCambioPantalla() {
    this.isSmallScreen = this.smallScreen.matches;
  }

  toggleSideBarVisibility() {
    this.isSideBarActive = !this.isSideBarActive;
  }

  logout() {
    this.signinService.logout().subscribe();
    this.router.navigate(['app/home']);
  }

  nav(nav: string) {
    if(this.isSmallScreen){
      this.toggleSideBarVisibility();
    }
    this.router.navigate([nav]);
  }

  update() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }
}




