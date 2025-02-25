import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MediaQueryService } from 'src/app/modules/services/media-query/media-query.service';
import { SigninService } from 'src/app/modules/services/signin/signin.service';
import { TableService } from 'src/app/modules/services/tables/table.service';
import { TicketService } from 'src/app/modules/services/tickets/ticket.service';
import { plans, zones } from 'src/app/modules/templates/models/plans.model';

interface TypeContract {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit, OnDestroy {
  public visible: boolean = false;
  public dialogStyles: any = { width: '30vw' };
  public client: any;
  public typeContract: TypeContract[] = [];
  public selectedTypeContract: any | undefined;
  public selectedEditContract!: any;
  public form!: FormGroup;
  public isOfficialClient = true;
  public hover: boolean = false;
  public isSmallScreen: boolean = false;
  private subscription!: Subscription;
  private priceMapping = new Map<string, Map<string, number>>();
  private zonesMapping = new Map<string, string>();

  //Injecciones de Servicios
  private signinService = inject(SigninService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private tableService = inject(TableService);
  private ticketService = inject(TicketService);
  private router = inject(Router);
  private mediaQueryService = inject(MediaQueryService)

  ngOnInit(): void {
    this.subscription = this.mediaQueryService.pantallaPequena$.subscribe(
      (isSmallScreen) => {
        this.isSmallScreen = isSmallScreen;
      }
    );
    this.getClient();
    this.setDialogStyles(window.innerWidth);
    this.initForm();
    this.getTableContracts();
    this.initializePriceMapping();
    this.initilizeZoneMapping();
  }

  getClient() {
    this.signinService.customer$.subscribe({
      next: (data: any) => {
        if (data && data.metadata && data.metadata[0].codigo === "00") {
          this.client = data.clientResponse.clients[0];
          if (this.client.cartera === "003") {
            this.isOfficialClient = false;
          }
          if (this.client.cuentas.invoices) {
            if (this.client.cuentas.invoices.some((fact: { tipo: string; }) => fact.tipo === "FX")) {
              this.isOfficialClient = false;
            }
          }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      typesContracts: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTableContracts() {
    this.tableService.getTable("tipos_contratos").subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00" && data.referenceTableResponse.table[0].error == "0") {
          let tableData = data.referenceTableResponse.table[0].tabla;
          for (const key in tableData) {
            const cleanedName = this.cleanString(tableData[key]);
            let zoneString = this.zonesMapping.get(this.client.city) ?? "DefaultZone";
            if (zoneString == "Zona Sur" && !cleanedName.includes("Plus")) {
              continue;
            }

            if (cleanedName.includes("Mega") || cleanedName.includes("Super") || cleanedName.includes("Ultra") || cleanedName.includes("Cable")) {
              const nameExists = this.typeContract.some(contract => contract.name === cleanedName);
              if (!nameExists) {
                this.typeContract.push({
                  id: parseInt(key, 10),
                  name: cleanedName,
                  price: this.setPrice(tableData[key])
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
    if (this.form.valid) {
      this.ticketService.createTicket(this.getBodyForm()).subscribe({
        next: (data: any) => {
          if (data.metadata[0].codigo === "00") {
            this.form.reset();
            this.showSuccess("Ya procesamos tu Solicitud para el cambio de Plan");
            this.visible = false;
          } else {
            this.showError("Sesión Expirada");
            this.logout();
          }
        },
        error: (error: any) => {
          console.log("Error", error);
          this.showError("No se pudo procesar tu solicitud para el cambio de plan");
        }
      });
    }
  }

  getBodyForm(): any {
    let body = {
      cliente_id: this.client.idcustomer,
      contrato_id: this.selectedEditContract.id,
      tipo_caso_id: 37,
      grupo_id: 455,
      descripcion: "Cambio de Plan al contrato numero: " + this.selectedEditContract.id
        + " Domicilio: " + this.selectedEditContract.domicilio + " " + this.selectedEditContract.localidad
        + " Cambio de plan de " + this.selectedEditContract.nombre + " a " + this.form.get('typesContracts')?.value.name,
    }
    return body;
  }

  showForm(contract: any) {
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
    const specialMappings: Record<string, Record<string, string>> = {
      Comercio: {
        "25Mbps": " 25Mb",
        "50Mbps": " 50Mb",
        "100Mbps": " 100Mb",
      },
      Corpo: {
        "30Mbps": " 30Mb",
        "50Mbps": " 50Mb",
      },
      Inalámbrico: {
        "4MB": " 4Mb",
        "5MB": " 5Mb",
        "10MB": " 10Mb",
      },
    };
    if (specialMappings[cleanedString]) {
      for (const [key, value] of Object.entries(specialMappings[cleanedString])) {
        if (input.includes(key)) {
          cleanedString += value;
          break;
        }
      }
    }
    const speedMapping: Record<string, string> = {
      Mega: "100Mb",
      Super: "200Mb",
      Ultra: "300Mb",
    };
    for (const [key, value] of Object.entries(speedMapping)) {
      if (cleanedString.includes(key)) {
        cleanedString += ` ${value}`;
        break;
      }
    }
    if (cleanedString.includes("Plus")) {
      cleanedString += " + Tv HD";
    }
    return cleanedString;
  }

  private initializePriceMapping(): void {
    plans.forEach(plan => {
      const zoneMap = new Map<string, number>();
      plan.prices.forEach(price => {
        zoneMap.set(price.zone, price.price);
      });
      this.priceMapping.set(plan.name, zoneMap);
    });
  }

  initilizeZoneMapping(): void {
    zones.forEach(zone => {
      this.zonesMapping.set(zone.city, zone.zone);
    });
  }

  setPrice(input: string): number {
    const specialZones = ["Andino Casco", "Tarifa Congelada"];
    const defaultZones = ["Inalámbrico", "Comercio", "Corpo"];

    let zoneString = this.zonesMapping.get("DefaultZone") ?? "DefaultZone";
    if (specialZones.some((zone) => input.includes(zone))) {
      zoneString = specialZones.find((zone) => input.includes(zone)) ?? "DefaultZone";
    } else if (!defaultZones.some((keyword) => input.includes(keyword))) {
      zoneString = this.zonesMapping.get(this.client.city) ?? "DefaultZone";
    }
    return this.priceMapping.get(input)?.get(zoneString) ?? 0;
  }

  isDbto(name: string, price: number): number {
    if (name.includes("5%")) {
      return price * 0.95;
    } else if (name.includes("10%")) {
      return price * 0.90;
    } else {
      return price;
    }
  }
}
