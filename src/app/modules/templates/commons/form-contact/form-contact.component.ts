import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsService } from 'src/app/modules/services/forms/forms.service';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent {

  public formulario!: FormGroup;
  private fb = inject(FormBuilder);
  private routeActivate = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private formService = inject(FormsService);
  private router = inject(Router);
  public question!: string;
  public city!: string;

  constructor() {
    this.routeActivate.queryParams.subscribe(params => {
      const nombrePlan = params['nombrePlan'];
      const localidad = params['localidad'];
      this.city = params['localidad'];
      if (nombrePlan != null) {
        this.question = `Hola, estoy interesado en el plan ${nombrePlan}. Para la localidad: ${localidad}.`;
      } else {
        this.question = '';
      }

    });
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required]],
      localidad: [this.city, [Validators.required]],
      telefono: ['', [Validators.required]],
      email: [''],
      consulta: [this.question],
    });
  }

  //Envio del Formulario
  onSubmit() {
    if (this.formulario.valid) {
      let body = `
      <ul>
        <li><strong>Nombre:</strong> ${this.formulario.get('nombre')?.value} ${this.formulario.get('apellido')?.value}</li>
        <li><strong>Localidad:</strong> ${this.formulario.get('localidad')?.value}</li>
        <li><strong>Telefono:</strong> ${this.formulario.get('telefono')?.value}</li>
        <li><strong>Email:</strong> ${this.formulario.get('email')?.value}</li>
      </ul>
      <p><strong>Consulta</strong></p>
      <p>${this.formulario.get('consulta')?.value}</p>
    `;

      const formData = new FormData();
      formData.append('emailClient', this.formulario.get('email')?.value);
      formData.append('affair', 'Formulario de Contacto Web')
      formData.append('body', body);

      console.log(formData);

      this.formService.sendForm(formData).subscribe({
        next: (data: any) => {
          this.showSuccess();
          console.log(data);

          setTimeout(() => {
            this.router.navigate(['/app/home']);
          }, 1000);
        },
        error: (error: any) => {
          console.log("Error", error);
          this.showError();
        }
      });
    } else {
      console.error("El valor de 'username' es nulo en localStorage.");
    }

  }

  // Mensaje Ok
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se Envio el Formulario' });
  }

  // Mensaje Error
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo enviar el Formulario, Intente mas tarde' });
  }

}
