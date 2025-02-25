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
  public user: any;
  public client: any;
  public email: string = '';
  public password: string = '';
  public editMail: boolean = false;
  public editPass: boolean = false;

  private signinService = inject(SigninService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.loadUserData();
    this.subscribeToClientUpdates();
  }

  private loadUserData(): void {
    const identityNumber = sessionStorage.getItem('dni');
    if (!identityNumber) {
      this.handleSessionError();
      return;
    }

    const body = { identityNumber };
    this.signinService.findUser(body).subscribe({
      next: (response) => this.handleUserResponse(response),
      error: () => this.handleSessionError()
    });
  }

  private handleUserResponse(data: any): void {
    if (data.metadata[0].codigo === '00') {
      this.user = data.userResponse.users[0];
      this.email = this.user.email;
      this.password = this.user.password;
    } else {
      this.handleSessionError();
    }
  }

  private subscribeToClientUpdates(): void {
    this.signinService.customer$.subscribe({
      next: (data: any) => {
        if (data?.metadata?.[0]?.codigo === '00') {
          this.client = data.clientResponse.clients[0];
        }
      },
      error: (error) => console.error('Error fetching client data:', error)
    });
  }

  public confirmEdit(action: 'email' | 'password', event: Event, id: number): void {
    const messages = {
      email: 'Esta seguro que desea editar su Email',
      password: 'Esta seguro que desea editar su contraseña'
    };

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: messages[action],
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.editUserProperty(action, id),
      reject: () => this.showMessage('warn', 'Acción Cancelada')
    });
  }

  private editUserProperty(action: 'email' | 'password', id: number): void {
    const body = {
      id,
      [action]: action === 'email' ? this.email : this.password
    };
    const serviceCall = action === 'email' ? this.signinService.editEmail(body) : this.signinService.editPassword(body);
    serviceCall.subscribe({
      next: (data: any) => this.handleEditResponse(data, action),
      error: (error) => this.handleEditError(error)
    });
  }

  private handleEditResponse(data: any, action: 'email' | 'password'): void {
    if (data.metadata[0].codigo === '00') {
      this.showMessage('success', `${action === 'email' ? 'Email' : 'Password'} actualizado`);
      this.toggleEditVisibility(action);
      this.loadUserData();
    } else {
      this.showMessage('error', data.metadata[0].informacion);
    }
  }

  private handleEditError(error: any): void {
    console.error('Error:', error);
    const errorMessage = error?.error?.metadata?.[0]?.informacion || 'Error desconocido';
    this.showMessage('error', errorMessage);
  }

  public toggleEditVisibility(action: 'email' | 'password'): void {
    if (action === 'email') {
      this.editMail = !this.editMail;
    } else if (action === 'password') {
      this.editPass = !this.editPass;
    }
  }

  private handleSessionError(): void {
    console.error('Session error: logging out.');
    this.logout();
  }

  public logout(): void {
    this.signinService.logout();
    this.router.navigate(['app/home']);
  }

  private showMessage(severity: string, detail: string): void {
    const summary = severity === 'success' ? 'Success' : severity === 'warn' ? 'Aviso' : 'Error';
    this.messageService.add({ severity, summary, detail });
  }
}
