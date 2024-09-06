import { Component, HostListener, inject, OnInit } from '@angular/core';
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
export class ServicesComponent  implements OnInit{
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
  public official = true;

  constructor() {
    this.setDialogStyles(window.innerWidth);
    this.formulario = this.fb.group({
      typesContracts: ['', Validators.required],
    });
    this.getTableTickets();
  }
  
  ngOnInit(): void {
    let dni: any = sessionStorage.getItem('dni') || '"sin Dni"';
    if (dni === '"sin Dni"') {
      this.logout();
    } else {
      let body = {
        identityNumber: dni,
      }

    //this.signinService.getClient(body).subscribe({
    this.signinService.customer$.subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          this.client = data.clientResponse.clients[0];
          if(this.client.cartera === "003"){
            this.official = false;
          }
          if(this.client.cuentas.invoices){ 
            if(this.client.cuentas.invoices.some((fact: { tipo: string; }) => fact.tipo === "FX") ){
              this.official = false;
            }
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }
  }
  
  getTableTickets() {
    this.tableService.getTable("tipos_contratos").subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          if (data.referenceTableResponse.table[0].error == "0") {
            let tableData = data.referenceTableResponse.table[0].tabla;
            for (const key in tableData) {
              if (tableData.hasOwnProperty(key) && !tableData[key].toLowerCase().includes('débito')) {
                const cleanedName = this.cleanString(tableData[key]);

                // Verificar si el nombre ya existe en typeContract
                const nameExists = this.typeContract.some(contract => contract.name === cleanedName);

                if (!nameExists) {
                  if (this.client.city.includes("Beltran") || this.client.city.includes("Baigorria") || this.client.city.includes("Bermudez") || this.client.city.includes("Andino")){
                    if(cleanedName.includes("Plus"))
                      this.typeContract.push({
                        id: parseInt(key, 10),
                        name: cleanedName
                      });
                  } else {
                    if(cleanedName.includes("Mega") || cleanedName.includes("Super") || cleanedName.includes("Ultra") || cleanedName.includes("Cable"))
                      this.typeContract.push({
                        id: parseInt(key, 10),
                        name: cleanedName
                      });
                  }
                }
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


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDialogStyles(window.innerWidth);
  }

  setDialogStyles(width: number) {
    if (width <= 799) {
      this.dialogStyles = { width: '95vw' };
    } else {
      this.dialogStyles = { width: '40vw' };
    }
  }

  onSubmit() {
    let body = {
      cliente_id: this.client.idcustomer,
      contrato_id: this.selectedEditContract.id,
      tipo_caso_id: 37,
      descripcion: "Cambio de Plan al contrato numero: " + this.selectedEditContract.id
        + " Domicilio: " + this.selectedEditContract.domicilio + " " + this.selectedEditContract.localidad
        + " Cambio de plan de " + this.selectedEditContract.nombre + " a " + this.formulario.get('typesContracts')?.value.name,
    }
  
    if (this.formulario.valid) {
      this.ticketService.createTicket(body).subscribe({
        next: (data: any) => {
          if (data.metadata[0].codigo === "00") {
            const formData = new FormData();
            let dni = sessionStorage.getItem('dni') || '"sin Dni"'; 
  
            if (dni !== '"sin Dni"') {
              
                let body = {
                  identityNumber: dni,
                }
                //this.signinService.getClient(body).subscribe({
              this.signinService.fetchCustomer(body).subscribe({
                  next: (data: any) => {
                    if (data && data.metadata && data.metadata[0].codigo === "00") {
                      this.client = data.clientResponse.clients[0];
                      if(this.client.cartera === "003"){
                        this.official = false;
                      }
                      if(this.client.cuentas.invoices){ 
                        if(this.client.cuentas.invoices.some((fact: { tipo: string; }) => fact.tipo === "FX") ){
                          this.official = false;
                        }
                      }
                    }
                  },
                  error: (error: any) => {
                    console.log("Error", error);
                  }
                });
              this.formulario.reset();
              this.showSuccess("Ya procesamos tu Solicitud para el cambio de Plan");
              this.visible = false;
            } else {
              this.showError("Sesión Expirada");
              this.logout();
            }
          }
        },
        error: (error: any) => {
          console.log("Error", error);
          this.showError("No se pudo procesar tu solicitud para el cambio de plan");
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
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('dni');
    this.router.navigate(['app/home']);
  }

  cleanString(input: string): string {
    let cleanedString = input.replace(/\[.*?\]\s*/, '').replace(/\s*-\s*.*/, '');

    switch (true) {
      case cleanedString.includes("Mega"):
        if (this.client.city.includes("Beltran") || this.client.city.includes("Baigorria") || this.client.city.includes("Bermudez")) {
          cleanedString += " 50Mb";
          break;
        } else {
          cleanedString += " 25Mb";
          break;
        }
      case cleanedString.includes("Super"):
        if (this.client.city.includes("Beltran") || this.client.city.includes("Baigorria") || this.client.city.includes("Bermudez")) {
          cleanedString += " 100Mb";
          break;
        } else {
          cleanedString += " 50Mb";
          break;
        }
      case cleanedString.includes("Ultra"):
        if (this.client.city.includes("Beltran") || this.client.city.includes("Baigorria") || this.client.city.includes("Bermudez")) {
          cleanedString += " 200Mb";
          break;
        } else {
          cleanedString += " 100Mb";
          break;
        }
    }

    if (cleanedString.includes("Plus")) {
      cleanedString += " + Tv HD";
    }

    return cleanedString;
  }
}
