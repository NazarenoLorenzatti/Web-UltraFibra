import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { SigninService } from 'src/app/modules/services/signin/signin.service';

@Component({
  selector: 'app-up-payment',
  templateUrl: './up-payment.component.html',
  styleUrls: ['./up-payment.component.css']
})
export class UpPaymentComponent {

  public client: any;
  public file!: File;
  private signinService = inject(SigninService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  ngOnInit() {
   this.getClient();
  }

  getClient(){
    this.signinService.customer$.subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          this.client = data.clientResponse.clients[0];
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

  create() {
    const formData = new FormData();
    formData.append('id', this.client.idcustomer);
    formData.append('file', this.file)
    formData.append('name', this.client.name)

    this.signinService.generatePaymentCommitment(formData).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
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
