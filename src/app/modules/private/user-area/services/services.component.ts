import { Component, HostListener, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SigninService } from 'src/app/modules/services/signin/signin.service';
import { TableService } from 'src/app/modules/services/tables/table.service';
import { TicketService } from 'src/app/modules/services/tickets/ticket.service';

interface TypeContract {
  id: number;
  name: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  public visible: boolean = false;
  public dialogStyles: any = { width: '30vw' };
  public client: any;
  private signinService = inject(SigninService);
  public typeContract: TypeContract[] = [];
  public selectedTypeContract: any | undefined;
  public selectedEditContract!: any;
  public formulario!: FormGroup;
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private tableService = inject(TableService);
  private ticketService = inject(TicketService);
  private router = inject(Router);
  
  constructor(){
    this.formulario = this.fb.group({
      typesContracts: ['', Validators.required],
    });
    this.getTableTickets();
    this.signinService.customer$.subscribe({
      next: (data: any) => {
        if(data.metadata[0].codigo == "00"){
          this.client = data.clientResponse.clients[0];
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }   
    });
  }

  getTableTickets() {
    this.tableService.getTable("tipos_contratos").subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          if (data.referenceTableResponse.table[0].error == "0") {
            let tableData = data.referenceTableResponse.table[0].tabla;
            for (const key in tableData) {
              if (tableData.hasOwnProperty(key) && !tableData[key].toLowerCase().includes('débito')) {
                this.typeContract.push({
                  id: parseInt(key, 10),
                  name: tableData[key]
                });
              }
            }
            console.log("CONTRATOS",this.typeContract)
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDialogStyles(window.innerWidth);
  }

  setDialogStyles(width: number) {
    if (width <= 799) {
      this.dialogStyles = { width: '95vw' };
    } else {
      this.dialogStyles = { width: '30vw' };
    }
  }

  onSubmit() { let body = {
    cliente_id: this.client.idcustomer,
    contrato_id: this.selectedEditContract.id,
    tipo_caso_id: 37,
    descripcion: "Cambio de Plan al contrato numero: "+ this.selectedEditContract.id 
    + " Domicilio: " + this.selectedEditContract.domicilio + " " +this.selectedEditContract.localidad
    + " Cambio de plan de " + this.selectedEditContract.nombre + " a " +  this.formulario.get('typesContracts')?.value.name,
  }
  if (this.formulario.valid) {
    this.ticketService.createTicket(body).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          const formData = new FormData();
          let dni: any = '"sin Dni"';
          if (localStorage.getItem('dni') !== null) {
            dni = localStorage.getItem('dni');
            formData.append('documentNumber', dni);
            this.signinService.fetchCustomer(formData).subscribe();
            this.formulario.reset();
            this.showSuccess("Ya procesamos tu Solicitud para el cambio de Plan");
            this.visible = false;
          } else {
            this.showError("Sesion Expirada")
            this.logout();
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
        this.showError("No se pudo procesar tu solicitud para el cambio de plan")
      }
    });
  }
  }

    showDialog(contract: any) {
      this.selectedEditContract = contract;
      this.visible = true;
    }
  
  // Mensaje Ok
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  // Mensaje Error
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('dni');
    this.router.navigate(['app/home']);
  }
}
