import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { SigninService } from 'src/app/modules/services/signin/signin.service';
import { TableService } from 'src/app/modules/services/tables/table.service';
import { TicketService } from 'src/app/modules/services/tickets/ticket.service';

interface MessageTicket {
  summary: string;
  detail: string;
  severity: string;
  icon: string;
}
interface TypeTicket {
  id: number;
  name: string;
}

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  public formulario!: FormGroup;
  public visible: boolean = false;
  public messagesTickets: MessageTicket[] = [];
  public client: any;
  public selectedContracts: any | undefined;
  public typeTickets: TypeTicket[] = [];
  public selectedTypeTickets: any | undefined;
  public serviceOrders: any[] = [];
  private router = inject(Router);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);
  private signinService = inject(SigninService);
  private ticketService = inject(TicketService);
  private tableService = inject(TableService);


  constructor() {
    this.formulario = this.fb.group({
      contract: ['', Validators.required],
      ticket: ['', Validators.required],
      text: ['', [Validators.required]],
    });
    this.getClient();
    this.getTableTickets();
  }

  ngOnInit(): void {
    this.getOrderClient();
  }

  //Obtener Ordenes de Servicio por Cliente
  getOrderClient() {
    const formData = new FormData();
    formData.append('filter', "cliente_id");
    formData.append('value', this.client.idcustomer);

    this.ticketService.getOrder(formData).subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo = "00") {
          this.serviceOrders = data.serviceOrderResponse.serviceOrders;
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  countOrders(): number {
    let excludedStatuses = ['CERR', 'ANUL'];
    return this.serviceOrders.filter(order => !excludedStatuses.includes(order.estado)).length;
  }

  // Obtener tabla de referencia "Tipo de CASOS(TICKETS)"
  getTableTickets() {
    this.tableService.getTable("casos").subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          if (data.referenceTableResponse.table[0].error == "0") {
            let tableData = data.referenceTableResponse.table[0].tabla;
            for (const key in tableData) {
              if (tableData.hasOwnProperty(key)) {
                this.typeTickets.push({
                  id: parseInt(key, 10),
                  name: tableData[key]
                });
              }
            }
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  // Obtener Cliente
  getClient() {
    this.signinService.customer$.subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.client = data.clientResponse.clients[0];
          if (this.client.casos_abiertos < 4) {
            this.messagesTickets = [{ severity: 'success', summary: 'Puede Crear Tickets', detail: 'Usted tiene ' + this.client.casos_abiertos + ' tickets abiertos', icon: 'pi pi-check' }];
          } else {
            this.messagesTickets = [{ severity: 'warn', summary: 'De momento no puede crear mas tickets', detail: 'Usted tiene ' + this.client.casos_abiertos + ' tickets abiertos, hasta que no se resuelvan no puede crear mas tickets', icon: 'pi pi-times-circle' }];
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
    let body = {
      cliente_id: this.client.idcustomer,
      contrato_id: this.formulario.get('contract')?.value.id,
      tipo_caso_id: this.formulario.get('ticket')?.value.id,
      descripcion: this.formulario.get('text')?.value,
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
              this.getClient();
              this.formulario.reset();
              this.showSuccess("Su reclamo fue registrado, Sera atendido a la brevedad");
            } else {
              this.showError("Sesion Expirada")
              this.logout();
            }
          }
        },
        error: (error: any) => {
          console.log("Error", error);
          this.showError("No se pudo Crear el RECLAMO")
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


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('dni');
    this.router.navigate(['app/home']);
  }
}
