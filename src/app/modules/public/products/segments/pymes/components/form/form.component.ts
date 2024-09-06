import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FormsService } from 'src/app/modules/services/forms/forms.service';
import { SectionService } from 'src/app/modules/services/sections/section.service';

@Component({
  selector: 'app-form-pymes',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormPymesComponent {

  public formulario!: FormGroup;
  private fb = inject(FormBuilder);
  public visible: boolean = false;
  private formService = inject(FormsService);
  private messageService = inject(MessageService);
  private sectionServices = inject(SectionService);
  public section: any;
  
  constructor(){
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      localidad: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
     this.sectionServices.getSection('products-pymes').subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          if (data.sectionsWebResponse.sectionsWeb[0]) {
          this.section = data.sectionsWebResponse.sectionsWeb[0];
        } 
      }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  //Envio del Formulario
  onSubmit() {
    if (this.formulario.valid) {
      let body = `
      <h3><strong>CONTACTO PYME</strong></h3>
      <ul>
        <li><strong>Nombre:</strong> ${this.formulario.get('nombre')?.value} </li>
        <li><strong>Localidad:</strong> ${this.formulario.get('localidad')?.value}</li>
        <li><strong>Telefono:</strong> ${this.formulario.get('telefono')?.value}</li>
        <li><strong>Email:</strong> ${this.formulario.get('email')?.value}</li>
      </ul>
      <p><strong>CONTACTO PYME</strong></p>
      <p>Datos de contacto para para Plan Comercio! Contactarse</p>
    `;

      const formData = new FormData();
      formData.append('emailClient', this.formulario.get('email')?.value);
      formData.append('affair', 'Formulario de Contacto Web')
      formData.append('body', body);

      console.log(formData);

      this.formService.sendForm(formData).subscribe({
        next: (data: any) => {
          this.showSuccess();
          this.formulario.get('nombre')?.setValue('');
          this.formulario.get('localidad')?.setValue('');
          this.formulario.get('telefono')?.setValue('');
          this.formulario.get('email')?.setValue('');
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
