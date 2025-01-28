import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SigninService } from 'src/app/modules/services/signin/signin.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private signinService = inject(SigninService);
  private messageService = inject(MessageService);
  public email: string = '';

  ngOnInit(): void {
    const token = this.getTokenFromRoute();
    if (this.isTokenValid(token)) {
      this.confirmEmailWithToken(token);
    } else {
      this.handleInvalidToken();
    }
  }

  // Obtiene el token desde los parámetros de la ruta
  private getTokenFromRoute(): string {
    return this.route.snapshot.paramMap.get('token') || 'Token Invalido';
  }

  // Verifica si el token es válido
  private isTokenValid(token: string): boolean {
    return token !== 'Token Invalido';
  }

  // Lógica para confirmar el email utilizando el token
  private confirmEmailWithToken(token: string): void {
    this.signinService.confirmEmail(token).subscribe({
      next: (response: any) => this.handleEmailConfirmationResponse(response),
      error: (error: any) => this.handleEmailConfirmationError(error)
    });
  }

  // Maneja la respuesta exitosa del servicio de confirmación de email
  private handleEmailConfirmationResponse(response: any): void {
    const metadata = response.metadata[0];
    if (metadata.codigo === "00") {
      this.showSuccess(metadata.informacion);
      this.email = response.userResponse.users[0].email;
    } else {
      this.showError(metadata.informacion);
    }
  }

  // Maneja el error al confirmar el email
  private handleEmailConfirmationError(error: any): void {
    const errorMessage = error.error?.metadata[0]?.informacion || 'Ocurrió un error inesperado';
    console.error("Error:", error);
    this.showError(errorMessage);
  }

  // Maneja el caso de un token inválido
  private handleInvalidToken(): void {
    this.showError('Token Invalido');
    this.navigateToLogin();
  }

  // Muestra un mensaje de éxito
  private showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
  }

  // Muestra un mensaje de error
  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  // Navega al login
  public navigateToLogin(): void {
    this.router.navigate(['app/login']);
  }
}
