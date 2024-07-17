
export interface Metadata {
  codigo: string;
  informacion: string;
  respuesta: string;
}

export interface Conexiones {
  cantidad_conexiones: number;
}

export interface Contrato {
  adicional: any[];
  autorenovable: string;
  baja: string;
  conexiones: Conexiones;
  domicilio: string;
  id: string;
  inicio: string;
  lat: string;
  lng: string;
  localidad: string;
  nombre: string;
  periodicidad_detalle: string;
  provincia: string;
  vencimiento: string;
}

export interface Cuenta {
  debt: string;
  debt_uss: any;
  duedebt: string;
  noduedebt: string;
  invoices_qty: string;
  invoices: Invoice[];
}

export interface Invoice {
  fecha: string;
  fecha_vto: string;
  importe: number;
  moneda: string;
  numero: string;
  payments_url: any[];
  saldo: number;
  sucursal: string;
  tipo: string;
  url_pdf: string;
}

export interface Client {
  a_status: string;
  address: string;
  casos_abiertos: string;
  city: string;
  contratos: Contrato[];
  cuentas: Cuenta;
  email: string;
  idcustomer: string;
  name: string;
  national_id: string;
  phone: string;
  phone_mobile: string;
  state: string;
}

export interface ClientResponse {
  clients: Client[];
}

export interface ApiResponse {
  metadata: Metadata[];
  clientResponse: ClientResponse;
}