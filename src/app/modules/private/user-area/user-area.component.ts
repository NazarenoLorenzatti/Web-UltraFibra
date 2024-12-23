import { Component, DoCheck, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
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
export class UserAreaComponent implements OnDestroy, OnInit {

  smallScreen: MediaQueryList;
  pantallaCeluListener: () => void;
  isSmallScreen: boolean = false;
  isSideBarActive: boolean = false;
  oculto: boolean = false;
  private router = inject(Router);
  private signinService = inject(SigninService);
  private messageService = inject(MessageService);
  public client: any;
  scrolled: boolean = false;
  applyScrollEffect: boolean = false;
  kpiSelected!: string;

  constructor(media: MediaMatcher) {
    this.smallScreen = media.matchMedia('(max-width: 1249px)');
    this.pantallaCeluListener = () => {
      this.detectarCambioPantalla();
    };
    this.smallScreen.addEventListener('change', this.pantallaCeluListener);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.kpiSelected = this.animateRandomKPI();
    }, 3000);

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
                this.applyScrollEffect = false;
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

  animateRandomKPI(): string {
    const stringArrayKpis = ["kpi1", "kpi2", "kpi3"];
    const randomIndex = Math.floor(Math.random() * stringArrayKpis.length);
    return stringArrayKpis[randomIndex];
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
    this.applyScrollEffect = true;
    if (this.isSmallScreen && !nav.includes('profile')) {
      this.toggleSideBarVisibility();
    } else if(this.isSmallScreen && nav.includes('profile-alt')){
      this.toggleSideBarVisibility();
      nav = 'user/profile';
    }
    this.router.navigate([nav]).then(() => {
      if (this.applyScrollEffect) {
        const routerContainer = document.getElementById('routerContainer');
        if (routerContainer) {
          const rect = routerContainer.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

          // Ajustar desplazamiento para una distancia fija desde arriba
          const fixedOffset = 100; // Distancia fija (puedes ajustar este valor según necesites)
          const targetScroll = scrollTop + rect.top - fixedOffset;

          // Desplazar el scroll
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }
    });

  }

  update() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.scrolled = scrollPosition > 96; // 6rem = 96px
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



