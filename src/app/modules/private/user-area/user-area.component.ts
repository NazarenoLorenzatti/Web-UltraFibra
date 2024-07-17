import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { SigninService } from '../../services/signin/signin.service';
import { HomeUserComponent } from './home-user/home-user.component';
import { Client } from '../../templates/models/customer.model';
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
export class UserAreaComponent implements OnDestroy, OnInit {

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
    this.init();
    this.smallScreen = media.matchMedia('(max-width: 1249px)');
    this.pantallaCeluListener = () => {
      this.detectarCambioPantalla();
    };
    this.smallScreen.addEventListener('change', this.pantallaCeluListener);

    this.signinService.customer$.subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.client = data.clientResponse.clients[0];
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });

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
  }

  ngOnDestroy() {
    this.smallScreen.removeEventListener('change', this.pantallaCeluListener);
  }


  detectarCambioPantalla() {
    this.isSmallScreen = this.smallScreen.matches;
  }

  toggleSideBarVisibility() {
    this.isSideBarActive = !this.isSideBarActive;
  }

  init() {
    let dni: any = '"sin Dni"';
    if (localStorage.getItem('dni') !== null) {
      dni = localStorage.getItem('dni');
      this.router.navigate(['user/home']);
    } else {
      this.logout();
    }
    const formData = new FormData();
    formData.append('documentNumber', dni)
    this.signinService.fetchCustomer(formData).subscribe();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('dni');
    this.router.navigate(['app/home']);
  }

  nav(nav: string) {
    this.router.navigate([nav]);
  }

  update() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }
}




