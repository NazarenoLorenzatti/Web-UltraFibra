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

  public form!: FormGroup;
  private fb = inject(FormBuilder);
  private routeActivate = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private formService = inject(FormsService);
  private router = inject(Router);
  public question!: string;
  public city!: string;

  constructor() {
    this.getRouteParams();
    this.initForm();
  }

  //Obtener los parametros guardados en el Url 
  getRouteParams() {
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
  }

  //Iniciar Formularios
  initForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required]],
      localidad: [this.city, [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      consulta: [this.question],
    });
  }
  
  //Envio del Formulario
  onSubmit() {
    if (this.form.valid) {     
      this.formService.sendForm(this.constructFormData()).subscribe({
        next: () => {
          this.showSuccess("Su consulta fue Recibida");
          /*setTimeout(() => {
            this.router.navigate(['/app/home']);
          }, 1000);*/
        },
        error: (error: any) => {
          console.log("Error", error);
          this.showError("No se pudo enviar su consulta, pruebe mas tarde");
        }
      });
    }
  }

  constructBody(): string {
    let body = `
    <ul>
      <li><strong>Nombre:</strong> ${this.form.get('nombre')?.value} ${this.form.get('apellido')?.value}</li>
      <li><strong>Localidad:</strong> ${this.form.get('localidad')?.value}</li>
      <li><strong>Telefono:</strong> ${this.form.get('telefono')?.value}</li>
      <li><strong>Email:</strong> ${this.form.get('email')?.value}</li>
    </ul>
    <p><strong>Consulta</strong></p>
    <p>${this.form.get('consulta')?.value}</p>`;
    return body;
  }

  constructFormData(): FormData{
    const formData = new FormData();
    formData.append('emailClient', this.form.get('email')?.value);
    formData.append('affair', 'Formulario de Contacto Web')
    formData.append('body', this.constructBody());
    return formData;
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
