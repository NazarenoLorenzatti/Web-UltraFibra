import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SigninService } from '../../services/signin/signin.service';
import { MediaQueryService } from '../../services/media-query/media-query.service';
import { Subscription } from 'rxjs';
import { AdhesionDebitoService } from '../../services/adhesion-debito/adhesion-debito.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent implements OnInit, OnDestroy {

  // Dependency Injections
  private mediaQueryService = inject(MediaQueryService);
  private router = inject(Router);
  private signinService = inject(SigninService);
  private messageService = inject(MessageService);
  private debitoService = inject(AdhesionDebitoService);

  // State Variables
  public client: any = null;
  public isSmallScreen = false;
  public isSideBarActive = false;
  public scrolled = false;
  public applyScrollEffect = false;
  public kpiSelected!: string;

  // Subscriptions
  private subscription!: Subscription;

  // Constants
  private readonly KPI_OPTIONS = ["kpi1", "kpi2", "kpi3"];
  private readonly SCROLL_THRESHOLD = 96; // 6rem in pixels


  // Controles de Dialogs
  mostrarModalDebito: boolean = false;
  mostrarModalBaja: boolean = false;

  // Opciones de cuenta
  tiposCuenta = [
    { label: 'Caja de Ahorro', value: '01' },
    { label: 'Cuenta Corriente', value: '00' }
  ];

  // Formulario
  debitoForm = {
   
    clienteId: 0,    
    tipoCuenta: null,
    
    cbu: ''
  };

  // Abrir modal asignando el id customer actual
  abrirModalAlta() {
    this.debitoForm.clienteId = Number(this.client.idcustomer);
    this.mostrarModalDebito = true;
  }

  // Validar CBU (debe tener exactamente 22 dígitos numéricos) y tipo de cuenta seleccionado
  esFormularioValido(): boolean {
    const regexCbu = /^[0-9]{22}$/;
    return !!this.debitoForm.tipoCuenta && regexCbu.test(this.debitoForm.cbu);
  }

  // Guardar datos
  guardarDebito() {
    if (this.esFormularioValido()) {
      this.debitoForm.clienteId = this.client.idcustomer;

      console.log(this.debitoForm)
      this.debitoService.adherirCliente(this.debitoForm).subscribe({
        next: () => {
          this.showSuccess("Se procesó su Adhesión al Débito Automático de Ultrafibra");
          this.client.debito_automatico = 'Si'; // Actualización reactiva local
        },
        error: () => this.showError("No se pudo procesar la adhesión al débito automático")
      });

      this.mostrarModalDebito = false;
      this.debitoForm = { clienteId: 0, tipoCuenta: null,  cbu: '' };
    }
  }

  // Solicitar Baja (POST /baja)
  darDeBajaDebito() {
    const payload = {
      clienteId: Number(this.client.idcustomer),
      tipoCuenta: null,
      cbu: ''
    };

    this.debitoService.darDeBajaDebito(payload).subscribe({
      next: () => {
        this.showSuccess("Se solicitó la desadhesión al Débito Automático correctamente");
        this.client.debito_automatico = 'No'; // Actualización reactiva local
      },
      error: () => this.showError("No se pudo procesar la baja del débito automático")
    });

    this.mostrarModalBaja = false;
  }


  ngOnInit(): void {
    this.handleMediaQuery();
    this.startKPIAnimation();
    this.initializeClient();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.signinService.logout();
  }

  // Media Query Handling
  private handleMediaQuery(): void {
    this.subscription = this.mediaQueryService.pantallaPequena$.subscribe(
      (isSmallScreen) => this.isSmallScreen = isSmallScreen
    );
  }

  // Random KPI Animation
  private startKPIAnimation(): void {
    setInterval(() => {
      this.kpiSelected = this.getRandomKPI();
    }, 3000);
  }

  private getRandomKPI(): string {
    const randomIndex = Math.floor(Math.random() * this.KPI_OPTIONS.length);
    return this.KPI_OPTIONS[randomIndex];
  }

  // Initialize Client Data
  private initializeClient(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.fetchClientData();
    } else {
      this.logout();
    }
  }

  private fetchClientData(): void {
    const dni = this.getDniFromSession();
    if (!dni) return this.logout();

    const body = { identityNumber: dni };

    this.signinService.fetchCustomer(body).subscribe({
      next: (response) => this.handleClientResponse(response),
      error: () => this.logout()
    });
  }

  private handleClientResponse(response: any): void {
    if (response?.metadata?.[0]?.codigo === "00") {
      this.client = response.clientResponse.clients?.[0];
      console.log("Cliente",this.client)
      if (this.client) {
        this.applyScrollEffect = false;
        this.router.navigate(['user/home']);
      }
    }
  }

  private getDniFromSession(): string | null {
    const dni = sessionStorage.getItem('dni');
    if (!dni || dni === '"sin Dni"') {
      this.logout();
      return null;
    }
    return dni;
  }

  // Navigation
  toggleSideBar(): void {
    this.isSideBarActive = !this.isSideBarActive;
  }

  logout(): void {
    this.signinService.logout();
    this.router.navigate(['app/home']);
  }

  navigateTo(route: string): void {
    this.applyScrollEffect = true;
    if (this.isSmallScreen) {
      if (route.includes('profile-alt')) {
        this.toggleSideBar();
        route = 'user/profile';
      } else {
        this.toggleSideBar();
      }
    }

    this.router.navigate([route]).then(() => {
      if (this.applyScrollEffect) this.scrollToContent();
    });
  }

  private scrollToContent(): void {
    const routerContainer = document.getElementById('routerContainer');
    if (routerContainer) {
      const rect = routerContainer.getBoundingClientRect();
      const fixedOffset = 100;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetScroll = scrollTop + rect.top - fixedOffset;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }

  // Event Listeners
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.scrolled = scrollPosition > this.SCROLL_THRESHOLD;
  }

  // Utility Methods
  cleanString(input: string): string {
    let cleanedString = input.replace(/\[.*?\]\s*/, '').replace(/\s*-\s*.*/, '');

    const citiesWithHighSpeed = ["Beltran", "Baigorria", "Bermudez"];
    const isHighSpeedArea = citiesWithHighSpeed.some(city => this.client?.city?.includes(city));

    if (cleanedString.includes("Mega")) {
      cleanedString += isHighSpeedArea ? " 200Mb" : " 200Mb";
    } else if (cleanedString.includes("Super")) {
      cleanedString += isHighSpeedArea ? " 400Mb" : " 400Mb";
    } else if (cleanedString.includes("Ultra")) {
      cleanedString += isHighSpeedArea ? " 600Mb" : " 600Mb";
    }

    if (cleanedString.includes("Plus")) {
      cleanedString += " + Tv HD";
    }

    return cleanedString;
  }

  showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
