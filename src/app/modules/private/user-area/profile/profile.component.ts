import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SigninService } from 'src/app/modules/services/signin/signin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public formulario!: FormGroup;
  private signinService = inject(SigninService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  public user: any;
  public email: string = '';
  public password: string = '';
  public editMail: boolean = false;
  public editPass: boolean = false;
  public client: any;

  ngOnInit(): void {
    this.getUser();
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

  getUser() {
    let body = {
      identityNumber: sessionStorage.getItem('dni')
    }
    //this.signinService.getClient(body).subscribe({
    this.signinService.findUser(body).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.user = data.userResponse.users[0];
          this.email = this.user.email;
          this.password = this.user.password;
        }
      },
      error: (error: any) => {
        console.log("Error", error);
        this.logout();
      }
    });
  }



  confirmEditEmail(event: Event, id:number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro que desea editar su Email',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.editEmail(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'Accion Cancelada' });
      }
    });
  }

  editEmail(id: number) {
    let body = {
      id: id,
      email: this.email,
    }
    this.signinService.editEmail(body).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo === "00") {
          this.showSuccess("Email Actualiazado");
          this.editVisibleEmail();
          this.getUser();
        } else {
          this.showError(data.metadata[0].informacion);
        }
      },
      error: (error: any) => {
        console.log("Error", error);
        this.showError(error.error.metadata[0].informacion);
      }
    });
  }

  confirmEditPassword(event: Event, id:number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta seguro que desea editar su contraseña',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.editPassword(id);
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'Accion Cancelada' });
      }
    });
  }

  editPassword(id: number) {
    let body = {
      id: id,
      password: this.password,
    }
    this.signinService.editPassword(body).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo === "00") {
          this.showSuccess("Password Actualizado");
          this.editVisiblePass();
          this.getUser();
        } else {
          this.showError(data.metadata[0].informacion);
        }
      },
      error: (error: any) => {
        console.log("Error", error);
        this.showError(error.error.metadata[0].informacion);
      }
    });
  }

  logout() {
    this.signinService.logout().subscribe();
    this.router.navigate(['app/home']);
  }

  editVisibleEmail() {
    this.editMail = !this.editMail;
  }

  editVisiblePass() {
    this.editPass = !this.editPass;
  }

  // Mensaje Ok
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  // Mensaje Error
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
