import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { SigninService } from '../../services/signin/signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
  formSignUp!: FormGroup;
  visible = false;
  visibleModal = false;
  correct = true;
  forward = false;
  dniForEmailForward = '';
  recoveryPasswordEmail!: string;
  recoveryPasswordDni!: string;
  loading = false;
  messages: Message[] = [];
  dialogStyles: any;

  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private signinService = inject(SigninService);
  private router = inject(Router);

  constructor() {
    this.initializeForms();
    this.setInitialMessages();
    this.updateDialogStyles(window.innerWidth);
  }

  ngOnInit() {
    this.updateDialogStyles(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateDialogStyles(event.target.innerWidth);
  }

  private initializeForms() {
    this.form = this.fb.group({
      documentNumber: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.formSignUp = this.fb.group(
      {
        documentNumber: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        emailConfirm: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      { validator: this.mustMatchValidator() }
    );
  }

  private setInitialMessages() {
    this.messages = [
      {
        severity: 'error',
        summary: 'Error',
        detail: 'El DNI ingresado no existe en el sistema',
      },
    ];
  }

  private updateDialogStyles(width: number) {
    if (width <= 799) this.dialogStyles = { width: '95vw' };
    else if (width <= 1024) this.dialogStyles = { width: '70vw' };
    else this.dialogStyles = { width: '50vw' };
  }

  onSubmitLogin() {
    if (!this.form.valid) return;

    const body = this.getLoginFormData();
    this.signinService.signIn(body).subscribe({
      next: (data: any) => this.handleLoginSuccess(data),
      error: (error: any) => this.handleError(error, true),
    });
  }

  private getLoginFormData() {
    return {
      identityNumber: this.form.get('documentNumber')?.value,
      password: this.form.get('password')?.value,
    };
  }

  private handleLoginSuccess(data: any) {
    if (data.metadata[0].codigo === '00') {
      this.storeSessionData(data.jwtResponse.jwt[0]);
      this.clearForm(this.form);
      this.showSuccess('Bienvenido!');
      this.router.navigate(['user/home']);
    } else {
      this.forward = true;
      this.showError(data.metadata[0].informacion);
    }
  }

  forwardEmail() {
    if (!this.form.valid) return;

    this.signinService.forwaredEmailByDni(this.dniForEmailForward).subscribe({
      next: (data: any) => this.handleForwardEmailSuccess(data),
      error: (error: any) => this.handleError(error, false),
    });
  }

  private handleForwardEmailSuccess(data: any) {
    if (data.metadata[0].codigo === '00') {
      this.showSuccess(data.metadata[0].informacion);
      this.forward = false;
      this.clearForm(this.form);
    } else {
      this.showError(data.metadata[0].informacion);
    }
  }

  onSubmitSignUp() {
    if (!this.formSignUp.valid) return;

    const body = this.getSignUpFormData();
    this.loading = true;

    this.signinService.signUp(body).subscribe({
      next: (data: any) => this.handleSignUpSuccess(data, body.identityNumber),
      error: (error: any) => this.handleError(error, false),
    });
  }

  private getSignUpFormData() {
    return {
      identityNumber: this.formSignUp.get('documentNumber')?.value,
      password: this.formSignUp.get('passwordConfirm')?.value,
      email: this.formSignUp.get('emailConfirm')?.value,
    };
  }

  private handleSignUpSuccess(data: any, dni: string) {
    if (data.metadata[0].codigo === '00') {
      this.showSuccess('El usuario se creó correctamente');
      this.clearForm(this.formSignUp);
      this.visibleModal = false;
      this.router.navigate(['warning', { dni }]);
    } else {
      this.showError(data.metadata[0].informacion);
    }
    this.loading = false;
  }

  recoveryPassword() {
    if (!this.isRecoveryPasswordDataValid()) return;

    this.signinService
      .recoveryPassword(this.recoveryPasswordEmail, this.recoveryPasswordDni)
      .subscribe({
        next: (data: any) => this.handleRecoveryPasswordSuccess(data),
        error: (error: any) => this.handleError(error, false),
      });
  }

  private isRecoveryPasswordDataValid() {
    return (
      this.recoveryPasswordEmail &&
      this.recoveryPasswordEmail.length > 9 &&
      this.recoveryPasswordDni
    );
  }

  private handleRecoveryPasswordSuccess(data: any) {
    if (data.metadata[0].codigo === '00') {
      this.showSuccess(data.metadata[0].informacion);
      this.visibleModal = false;
    } else {
      this.showError(data.metadata[0].informacion);
    }
  }

  private handleError(error: any, allowForward: boolean) {
    console.error('Error', error);
    this.showError(error.error.metadata[0].informacion);

    if (allowForward && error.error.metadata[0].informacion === 'El Mail aún no está verificado') {
      this.forward = true;
      this.dniForEmailForward = error.error.metadata[0].respuesta;
    }
  }

  private storeSessionData(jwtData: any) {
    sessionStorage.setItem('token', jwtData.token);
    sessionStorage.setItem('expirationDate', jwtData.expires);
    sessionStorage.setItem('dni', jwtData.idClient);
  }

  private clearForm(form: FormGroup) {
    form.reset();
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  mustMatchValidator() {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls['password'];
      const passwordConfirmControl = formGroup.controls['passwordConfirm'];
      const emailControl = formGroup.controls['email'];
      const emailConfirmControl = formGroup.controls['emailConfirm'];

      this.validateFieldMatch(passwordControl, passwordConfirmControl);
      this.validateFieldMatch(emailControl, emailConfirmControl);
    };
  }

  private validateFieldMatch(control: any, confirmControl: any) {
    if (confirmControl.errors && !confirmControl.errors['mustMatch']) return;

    confirmControl.setErrors(
      control.value !== confirmControl.value ? { mustMatch: true } : null
    );
  }

  disablePaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  showDialog() {
    this.visibleModal = true;
  }







  /*public formulario!: FormGroup;
  public formularioSignUp!: FormGroup;
  private fb = inject(FormBuilder);
  public visible: boolean = false;
  public visibleModal: boolean = false;
  private messageService = inject(MessageService);
  private signinService = inject(SigninService);
  private router = inject(Router);
  public correct = true;
  public forward: boolean = false;
  public dniForEmailForwared: string = '';
  public recoveryPasswordEmail!: string;
  public recoveryPasswordDni!: string;
  public loading: boolean = false;
  messages1: Message[];
  dialogStyles: any;

  constructor() {
    this.setDialogStyles(window.innerWidth);
    this.formulario = this.fb.group({
      documentNumber: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formularioSignUp = this.fb.group({
      documentNumber: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      emailConfirm: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    }, {
      validator: this.MustMatch('password', 'passwordConfirm', 'email', 'emailConfirm'),
    },
  );
    this.messages1 = [
      { severity: 'error', summary: 'Error', detail: 'El dni ingresado no existe en el Sistema' },
    ];
  }

  ngOnInit() {
    this.setDialogStyles(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDialogStyles(window.innerWidth);
  }
  onSubmit() {
    if (this.formulario.valid) {
      let body = {
        identityNumber: this.formulario.get('documentNumber')?.value,
        password: this.formulario.get('password')?.value,
      }
      this.signinService.signIn(body).subscribe({
        next: (data: any) => {
          if (data.metadata[0].codigo === "00") {
            const token = data.jwtResponse.jwt[0].token;
            const expirationDate = data.jwtResponse.jwt[0].expires;
            const dni = data.jwtResponse.jwt[0].idClient;
  
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('expirationDate', expirationDate);
            sessionStorage.setItem('dni', dni);
  
            // Limpiar el formulario
            this.formulario.get('documentNumber')?.setValue('');
            this.formulario.get('password')?.setValue('');
            this.showSuccess("Bienvenido!");
  
            // Redirigir al área protegida
            this.router.navigate(['user/home']);
          } else {
            this.forward = true;
            this.showError(data.metadata[0].informacion);
          }
        },
        error: (error: any) => {
          console.log("Error", error);
          this.showError(error.error.metadata[0].informacion);
          if (error.error.metadata[0].informacion === "El Mail aún no está verificado") {
            this.forward = true;
            this.dniForEmailForwared = error.error.metadata[0].respuesta;
          }
        }
      });
    }
  }

  forwardEmail() {
    if (this.formulario.valid) {
      this.signinService.forwaredEmailByDni(this.dniForEmailForwared).subscribe({
        next: (data: any) => {
          if (data.metadata[0].codigo === "00") {
            this.showSuccess(data.metadata[0].informacion);
            this.forward = false;
            this.formulario.get('documentNumber')?.setValue('');
          } else {
            this.showError(data.metadata[0].informacion);
          }
        },
        error: (error: any) => {
          console.log("Error", error);
          this.showError(error.error.metadata[0].informacion);
          this.forward = false;
        }
      });
    }
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

  // Envio de formulario para crear usuario
  onSubmitSignUp() {
    this.loading = true;
    if (this.formularioSignUp.valid) {
      let body = {
        identityNumber: this.formularioSignUp.get('documentNumber')?.value,
        password: this.formularioSignUp.get('passwordConfirm')?.value,
        email: this.formularioSignUp.get('emailConfirm')?.value
      }

      this.signinService.signUp(body).subscribe({
        next: (data: any) => {
          if (data.metadata[0].codigo === "00") {
            this.showSuccess("El usuario se creo Correctamente");
            this.formularioSignUp.get('documentNumber')?.setValue('');
            this.formularioSignUp.get('passwordConfirm')?.setValue('');
            this.formularioSignUp.get('password')?.setValue('');
            this.formularioSignUp.get('email')?.setValue('');
            this.formularioSignUp.get('emailConfirm')?.setValue('');
            this.visibleModal = false;
            this.router.navigate(['warning', { dni: body.identityNumber }]);
            this.loading = false;
          } else {
            this.showError(data.metadata[0].informacion);
            this.loading = false;
          }
        },
        error: (error: any) => {
          console.log("Error", error);
          this.loading = false;
          this.showError(error.error.metadata[0].informacion);
          this.formularioSignUp.get('documentNumber')?.setValue('');
          this.formularioSignUp.get('passwordConfirm')?.setValue('');
          this.formularioSignUp.get('password')?.setValue('');
          this.formularioSignUp.get('email')?.setValue('');
        }
      });
    }
  }

  recoveryPassword(){
    if (this.recoveryPasswordEmail && this.recoveryPasswordEmail !== '' && this.recoveryPasswordEmail.length > 9 && this.recoveryPasswordDni !== null) {
      this.signinService.recoveryPassword(this.recoveryPasswordEmail, this.recoveryPasswordDni).subscribe({
        next: (data: any) => {
          if (data.metadata[0].codigo === "00") {
            this.showSuccess(data.metadata[0].informacion);
            this.visibleModal = false;
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
  }


  // Mensaje Ok
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  // Mensaje Error
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showDialog() {
    this.visibleModal = true;
  }


MustMatch(password: string, passwordConfirm: string, email: string, emailConfirm: string) {
    return (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls[password];
        const passwordConfirmControl = formGroup.controls[passwordConfirm];
        const emailControl = formGroup.controls[email];
        const emailConfirmControl = formGroup.controls[emailConfirm];

        // Comprobación de contraseñas
        if (passwordConfirmControl.errors && !passwordConfirmControl.errors['mustMatch']) {
            return;
        }

        // Comprobación de emails
        if (emailConfirmControl.errors && !emailConfirmControl.errors['mustMatch']) {
            return;
        }

        // Validar si las contraseñas coinciden
        if (passwordControl.value !== passwordConfirmControl.value) {
            passwordConfirmControl.setErrors({ mustMatch: true });
        } else {
            passwordConfirmControl.setErrors(null);
        }

        // Validar si los emails coinciden
        if (emailControl.value !== emailConfirmControl.value) {
            emailConfirmControl.setErrors({ mustMatch: true });
        } else {
            emailConfirmControl.setErrors(null);
        }
    };
}

disablePaste(event: ClipboardEvent) {
  event.preventDefault();
}*/

}
