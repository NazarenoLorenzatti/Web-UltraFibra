import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { FormsService } from 'src/app/modules/services/forms/forms.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-workus-btn',
  templateUrl: './workus.component.html',
  styleUrls: ['./workus.component.scss']
})
export class WorkusButtonComponent implements OnInit {

  visible: boolean = false;
  public formulario!: FormGroup;
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private formService = inject(FormsService);
  public file!: File;
  display: boolean = false;
  dialogStyles: any;

  ngOnInit() {
    this.setDialogStyles(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDialogStyles(window.innerWidth);
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

  constructor() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: [''],
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
    `;

      const formData = new FormData();
      formData.append('affair', 'Curriculum Vitae')
      formData.append('body', body);
      formData.append('file', this.file);
      console.log(formData);

      this.formService.sendFormCv(formData).subscribe({
        next: (data: any) => {
          this.showSuccess();
          console.log(data);
          this.visible = false;
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

  //Subir archivo Excel de respuesta Macroclick
  onUpload(event: FileUploadEvent) {
    const formData = new FormData();
    if (event.files && event.files.length > 0) {
      this.file = event.files[0];
    }
  }

  showDialog() {
    this.visible = true;
  }

  // Mensaje Ok
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Recibimos Tu curriculum Muchas gracias' });
  }

  // Mensaje Error
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al enviar tu Curriculum, por favor proba mas tarde!' });
  }

}
