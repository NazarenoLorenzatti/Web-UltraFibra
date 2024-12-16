import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { SigninService } from 'src/app/modules/services/signin/signin.service';
interface invoices {
  invoice: string;
  number: string;
  expiration: string;
  mount: number;
  url: string;
}
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
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

  constructor() {
    
  }

  ngOnInit() {
    this.setDialogStyles(window.innerWidth);
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

  downloadInvoice(link: string) {
    window.open(link, '_blank');
  }

  pay(link: string) {
    window.open(link, '_blank');
  }

  nav(nav: string) {
    this.router.navigate([nav]);
  }

  create(){
    const formData = new FormData();
    formData.append('id', this.client.idcustomer);
    formData.append('file', this.file)
    formData.append('name', this.client.name)
    
    this.signinService.generatePaymentCommitment(formData).subscribe({
      next: (data: any) => {
        if(data.metadata[0].codigo == "00"){
          this.showSuccess(data.metadata[0].informacion)
        } else {
          console.log(data)
          this.showError(data.metadata[0].informacion)
        }
      },
      error: (error: any) => {
        console.log(error)
        this.showError(error.metadata[0].informacion)
      }
    });
  }

  //Subir archivo Excel de respuesta Macroclick
  onUpload(event: FileUploadEvent) {
    const formData = new FormData();
    if (event.files && event.files.length > 0) {
      this.file = event.files[0];
    }
  }

  isFileDefined(): boolean {
    return this.file !== undefined;
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


