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
  public activeIndex: number = 0;
  public visible: boolean = false;
  public client: any;
  private signinService = inject(SigninService);
  private router = inject(Router);
  public file!: File;
  public display: boolean = false;
  public dialogStyles: any;
  public official = true;
  private messageService = inject(MessageService);

  animationClass = 'slide-in-elliptic-top-fwd';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDialogStyles(window.innerWidth);
  }

  setDialogStyles(width: number) {
    if (width <= 799) {
      this.dialogStyles = { width: '95vw' };
    } else if (width > 800 && width <= 1024) {
      this.dialogStyles = { width: '70vw' };
    } else {
      this.dialogStyles = { width: '50vw' };
    }
  }

  ngOnDestroy(): void {    
    this.animationClass = 'slide-out';
    setTimeout(() => {
      // Aquí Angular continuará destruyendo el componente automáticamente
    }, 10000); // La duración de la animación de salida en ms
  }

  ngOnInit() {
    this.setDialogStyles(window.innerWidth);
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

  logout() {
    this.signinService.logout().subscribe();
    this.router.navigate(['app/home']);
  }

  downloadInvoice(link: string) {
    window.open(link, '_blank');
  }

  pay(link: string) {
    window.open(link, '_blank');
  }

  nav(nav: string) {
    this.router.navigate([nav]);
  }

   // Mensaje Ok
   showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  // Mensaje Error
  showError(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: message });
  }
}


