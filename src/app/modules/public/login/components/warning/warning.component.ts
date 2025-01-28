import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SigninService } from 'src/app/modules/services/signin/signin.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private signinService = inject(SigninService);
  private router = inject(Router);
  public dni: string = '';

  ngOnInit(): void {
    this.initializeDniFromRoute();
  }

  // Inicializa el DNI desde los parámetros de la ruta
  private initializeDniFromRoute(): void {
    this.route.paramMap.subscribe(params => {
      const dni = params.get('dni');
      this.dni = dni || 'Email inválido';
    });
  }

  // Lógica para reenviar el email
  public forwardEmail(): void {
    if (!this.isDniValid()) {
      this.showError('DNI inválido. No se puede reenviar el email.');
      return;
    }

    this.signinService.forwaredEmailByDni(this.dni).subscribe({
      next: (response: any) => this.handleForwardEmailResponse(response),
      error: (error: any) => this.handleForwardEmailError(error)
    });
  }

  // Verifica si el DNI es válido
  private isDniValid(): boolean {
    return this.dni !== 'Email inválido';
  }

  // Maneja la respuesta del servicio de reenviar email
  private handleForwardEmailResponse(response: any): void {
    const metadata = response.metadata[0];
    if (metadata.codigo === '00') {
      this.showSuccess('Se reenvió el email correctamente.');
    } else {
      this.showError(metadata.informacion);
    }
  }

  // Maneja el error del servicio de reenviar email
  private handleForwardEmailError(error: any): void {
    const errorMessage = error.error?.metadata[0]?.informacion || 'Ocurrió un error inesperado.';
    console.error('Error:', error);
    this.showError(errorMessage);
  }

  // Navega a la página de login
  public navigateToLogin(): void {
    this.router.navigate(['app/login']);
  }

  // Muestra un mensaje de éxito
  private showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
  }

  // Muestra un mensaje de error
  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
