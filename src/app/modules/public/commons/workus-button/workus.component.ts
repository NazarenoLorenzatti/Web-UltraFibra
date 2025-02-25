import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { FormsService } from 'src/app/modules/services/forms/forms.service';


interface Department {
  name: string;
}

@Component({
  selector: 'app-workus-btn',
  templateUrl: './workus.component.html',
  styleUrls: ['./workus.component.scss'],
})
export class WorkusButtonComponent implements OnInit {
  visible = false;
  display = false;
  dialogStyles: any = {};
  departaments: Department[] = [];
  selectedDepartment: Department | null = null;
  formulario!: FormGroup;
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private formsService = inject(FormsService);
  public uploadedFile!: File;

  ngOnInit(): void {
    this.initializeForm();
    this.initializeDepartments();
    this.updateDialogStyles(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateDialogStyles(window.innerWidth);
  }

  initializeForm(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      localidad: ['', Validators.required],
      telefono: ['', Validators.required],
      email: [''],
      selectedDepartment: new FormControl<Department | null>(null, Validators.required),
      asunto: [''],
    });
  }

  initializeDepartments(): void {
    this.departaments = [
      { name: 'Técnico' },
      { name: 'Administrativo' },
      { name: 'Contable' },
    ];
  }

  updateDialogStyles(width: number): void {
    if (width <= 799) {
      this.dialogStyles = { width: '95vw' };
    } else if (width > 800 && width <= 1024) {
      this.dialogStyles = { width: '70vw' };
    } else {
      this.dialogStyles = { width: '50vw' };
    }
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.showError('Por favor complete todos los campos requeridos.');
      return;
    }

    const formData = this.buildFormData();
    this.formsService.sendFormCv(formData).subscribe({
      next: (response: any) => this.handleSuccess(response.metadata[0].informacion),
      error: (error: any) => this.handleError(error.error.metadata[0].informacion),
    });
  }

  buildFormData(): FormData {
    const formValues = this.formulario.value;
    const departmentName = formValues.selectedDepartment?.name || 'No especificado';

    const body = `
      <h3>CV para Departamento: ${departmentName}</h3>
      <h5><strong>Asunto:</strong> ${formValues.asunto}</h5>
      <ul>
        <li><strong>Nombre:</strong> ${formValues.nombre} ${formValues.apellido}</li>
        <li><strong>Localidad:</strong> ${formValues.localidad}</li>
        <li><strong>Teléfono:</strong> ${formValues.telefono}</li>
        <li><strong>Email:</strong> ${formValues.email || 'No especificado'}</li>
      </ul>
    `;

    const formData = new FormData();
    formData.append('affair', `CV ${departmentName} - ${formValues.asunto}`);
    formData.append('body', body);
    if (this.uploadedFile) {
      formData.append('file', this.uploadedFile);
    }

    return formData;
  }

  onFileUpload(event: FileUploadEvent): void {
    if (event.files && event.files.length > 0) {
      this.uploadedFile = event.files[0];
    }
  }

  showDialog(): void {
    this.visible = true;
  }

  handleSuccess(message: string): void {
    this.showSuccess(message);
    this.visible = false;
    this.formulario.reset();
  }

  handleError(message: string): void {
    this.showError(message);
  }

  showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: message });
  }

  showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  isFileUploaded(): boolean {
    return this.uploadedFile !== undefined;
  }

}
