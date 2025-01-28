import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SigninService } from 'src/app/modules/services/signin/signin.service';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  public activeTabIndex: number = 0; 
  public isDialogVisible: boolean = false; 
  public clientData: any;
  public dialogStyles: any; 
  public isOfficialClient: boolean = true; 
  private signinService = inject(SigninService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private ANIMATION_DURATION = 10000; 

  animationClass = 'slide-in-elliptic-top-fwd'; // Clase de animación inicial

  @HostListener('window:resize', ['$event'])
  handleWindowResize(event: any): void {
    this.updateDialogStyles(window.innerWidth);
  }

  ngOnInit(): void {
    this.updateDialogStyles(window.innerWidth);
    this.subscribeToCustomerData();
  }

  ngOnDestroy(): void {
    this.triggerExitAnimation();
  }

  private updateDialogStyles(screenWidth: number): void {
    if (screenWidth <= 799) {
      this.dialogStyles = { width: '95vw' };
    } else if (screenWidth > 800 && screenWidth <= 1024) {
      this.dialogStyles = { width: '70vw' };
    } else {
      this.dialogStyles = { width: '50vw' };
    }
  }

  private subscribeToCustomerData(): void {
    this.signinService.customer$.subscribe({
      next: (response: any) => this.handleCustomerData(response),
      error: (error: any) => console.error('Error fetching customer data:', error),
    });
  }

  private handleCustomerData(data: any): void {
    if (data?.metadata?.[0]?.codigo === '00') {
      this.clientData = data.clientResponse.clients[0];
      this.determineClientType();
    }
  }

  private determineClientType(): void {
    const isSpecialPortfolio = this.clientData.cartera === '003';
    const hasNonOfficialInvoices = this.clientData.cuentas?.invoices?.some(
      (invoice: { tipo: string }) => invoice.tipo === 'FX'
    );
    this.isOfficialClient = !(isSpecialPortfolio || hasNonOfficialInvoices);
  }


  private triggerExitAnimation(): void {
    this.animationClass = 'slide-out';
    setTimeout(() => {
    }, this.ANIMATION_DURATION);
  }


  logout(): void {
    this.signinService.logout().subscribe();
    this.router.navigate(['app/home']);
  }


  navigateTo(route: string): void {
    this.router.navigate([route]);
  }


  downloadInvoice(link: string): void {
    this.openLinkInNewTab(link);
  }


  redirectToPayment(link: string): void {
    this.openLinkInNewTab(link);
  }

  private openLinkInNewTab(link: string): void {
    window.open(link, '_blank');
  }

  showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
  }

  showError(message: string): void {
    this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: message });
  }
}

