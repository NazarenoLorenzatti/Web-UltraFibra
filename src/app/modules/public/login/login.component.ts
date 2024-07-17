import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { SigninService } from '../../services/signin/signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formulario!: FormGroup;
  private fb = inject(FormBuilder);
  public visible: boolean = false;
  private messageService = inject(MessageService);
  private signinService = inject(SigninService);
  private router = inject(Router);
  public correct = true;
  messages1: Message[];

  constructor() {
    this.formulario = this.fb.group({
      documentNumber: ['', 
      Validators.required,
      ],
    });
    this.messages1 = [
      { severity: 'error', summary: 'Error', detail: 'El dni ingresado no existe en el Sistema' },
    ];
  }

  //Envio del Formulario
  onSubmit() {
    if (this.formulario.valid) {

      const dni = this.formulario.get('documentNumber')?.value;
      const formData = new FormData();
      formData.append('documentNumber', dni)

      this.signinService.signIn(formData).subscribe({
        next: (data: any) => {
          const token = data.jwtResponse.jwt[0].token;
          const expirationDate = data.jwtResponse.jwt[0].expires;  
          localStorage.setItem('dni', dni)
          localStorage.setItem('expires', expirationDate);
          localStorage.setItem('token', token);
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['/user/home']);
          }, 1000);
        },
        error: (error: any) => {
          console.log("Error", error);
          this.showError();
        }
      });
    }
  }

  // Mensaje Ok
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bienvenido' });
  }

  // Mensaje Error
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El DNI/CUIL/CUIT ingresado no posee un servicio asociado' });
  }

}
