import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { ContratacionService } from 'src/app/modules/services/contratacion/contratacion.service';
import { CoverageResponse, CoverageService } from 'src/app/modules/services/coverage/coverage.service';


export interface PlanContratacion {
  id: string;
  nombre: string;
  velocidad: string;
  extra?: string;
  descripcion?: string;
  precio: number;
  mesesPromocion?: number;
}

export interface ContratacionPayload {
  plan: PlanContratacion;
  datosPersonales: {
    nombreApellido: string;
    dni: string;
    telefono: string;
    email: string;
    preferenciaContacto: 'WHATSAPP' | 'TELEFONO';
    comentario?: string;
  };
  domicilio: {
    direccion: string;
    referencia?: string;
    latitude: number;
    longitude: number;
    city?: string;
    province?: string;
    neighborhood?: string;
    zone?: string;
    covered: boolean;
    waitlistEnabled?: boolean;
    waitlistAvailableDate?: string;
    neighborhoodId?: string;
    zoneId?: string;
    zoneCoverageId?: string;
    zoneApiId?: string;
    cityApiId?: string;
    provinceApiId?: string;
    neighborhoodApiId?: string;
  };
}

type Paso = 1 | 2 | 3;

@Component({
  selector: 'app-contratar-plan',
  templateUrl: './contratar-plan.component.html',
  styleUrls: ['./contratar-plan.component.css']
})
export class ContratarPlanComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() plan: PlanContratacion = {
    id: 'combo-super',
    nombre: 'COMBO SUPER',
    velocidad: '400 MB',
    extra: '+ TV HD',
    descripcion: 'Conectividad para disfrutar, navegar y mirar TV desde todos tus dispositivos.',
    precio: 25000,
    mesesPromocion: 3
  };

  @Output() solicitudConfirmada = new EventEmitter<ContratacionPayload>();

  @ViewChild('mapContainer') mapContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('direccionInput') direccionInput?: ElementRef<HTMLInputElement>;

  pasoActual: Paso = 1;

  
readonly pasos: {
  id: Paso;
  titulo: string;
  subtitulo: string;
}[] = [
  {
    id: 1,
    titulo: 'Tus datos',
    subtitulo: 'Completá la información'
  },
  {
    id: 2,
    titulo: 'Dirección',
    subtitulo: 'Verificamos cobertura'
  },
  {
    id: 3,
    titulo: 'Confirmación',
    subtitulo: '¡Listo!'
  }
];

  form = {
    nombreApellido: '',
    dni: '',
    telefono: '',
    email: '',
    preferenciaContacto: 'WHATSAPP' as 'WHATSAPP' | 'TELEFONO',
    comentario: '',
    direccion: '',
    referencia: '',
    terminos: false
  };

  map?: L.Map;
  marker?: L.Marker;
  selectedCoordinates: { latitude: number; longitude: number } | null = null;

  coverage: CoverageResponse | null = null;
  coverageLoading = false;
  locationLoading = false;
  submitted = false;
  validationAttempted = false;
  addressLookupLoading = false;
  ticketNumber: any;

  submitting = false;
submitError = '';


  private mapReady = false;
  private routeSub: any;
  private resizeHandler = () => this.map?.invalidateSize();

  constructor(
    private readonly coverageService: CoverageService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly contratacionService: ContratacionService
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.queryParamMap.subscribe(params => {
      const planId = params.get('plan');
      const speed = params.get('speed');
      const price = Number(params.get('price'));
      const name = params.get('name');
      const extra = params.get('extra');
      const description = params.get('description');
      const promoMonths = Number(params.get('promoMonths'));

      if (planId || speed || price || name || extra || description) {
        this.plan = {
          ...this.plan,
          ...(planId ? { id: planId } : {}),
          ...(speed ? { velocidad: speed } : {}),
          ...(name ? { nombre: name } : {}),
          ...(extra ? { extra } : {}),
          ...(description ? { descripcion: description } : {}),
          ...(price > 0 ? { precio: price } : {}),
          ...(promoMonths > 0 ? { mesesPromocion: promoMonths } : {})
        };
      }
    });

    window.addEventListener('resize', this.resizeHandler);
  }

  ngAfterViewInit(): void {
    if (this.pasoActual === 2) {
      this.queueMapInit();
    }
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe?.();
    this.map?.remove();
    window.removeEventListener('resize', this.resizeHandler);
  }

  irAPlanes(): void {
    this.router.navigate(['/app/products/homelike'], { fragment: 'planes-hogar' });
  }

irAlPaso(paso: number): void {
  if (paso === 1) {
    this.pasoActual = 1;
    return;
  }

  if (paso === 2 && this.validarDatos()) {
    this.pasoActual = 2;
    this.queueMapInit();
    return;
  }

  if (paso === 3 && this.coberturaEsValida()) {
    this.pasoActual = 3;
  }
}

  continuarDesdeDatos(): void {
    this.validationAttempted = true;
    if (!this.validarDatos()) return;

    this.pasoActual = 2;
    this.queueMapInit();
  }

  continuarDesdeDireccion(): void {
    if (!this.coberturaEsValida()) return;
    this.pasoActual = 3;
  }

  volverDesdeDireccion(): void {
    this.pasoActual = 1;
  }

  volverDesdeConfirmacion(): void {
    this.pasoActual = 2;
  }

  seleccionarPreferencia(valor: 'WHATSAPP' | 'TELEFONO'): void {
    this.form.preferenciaContacto = valor;
  }

  onMapClick(event: L.LeafletMouseEvent): void {
    this.setMapLocation(event.latlng.lat, event.latlng.lng, true);
  }

  onMarkerDragEnd(): void {
    if (!this.marker) return;
    const position = this.marker.getLatLng();
    this.setMapLocation(position.lat, position.lng, true);
  }

  usarMiUbicacion(): void {
    if (!navigator.geolocation) {
      this.coverage = {
        covered: false,
        reason: 'Tu navegador no permite obtener la ubicación automáticamente.'
      };
      return;
    }

    this.locationLoading = true;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.locationLoading = false;
        this.setMapLocation(position.coords.latitude, position.coords.longitude, true, true);
      },
      () => {
        this.locationLoading = false;
        this.coverage = {
          covered: false,
          reason: 'No pudimos acceder a tu ubicación. Podés seleccionar el punto manualmente en el mapa.'
        };
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  async buscarDireccion(): Promise<void> {
    const query = this.form.direccion.trim();
    if (!query) return;

    this.addressLookupLoading = true;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ar&q=${encodeURIComponent(query)}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );
      const items = await response.json();
      const first = items?.[0];

      if (!first) {
        this.coverage = {
          covered: false,
          reason: 'No encontramos esa dirección. Probá con calle, altura y localidad.'
        };
        this.addressLookupLoading = false;
        return;
      }

      this.setMapLocation(Number(first.lat), Number(first.lon), true, false);
    } catch {
      this.coverage = {
        covered: false,
        reason: 'No pudimos ubicar la dirección en este momento. Seleccioná el punto directamente en el mapa.'
      };
    } finally {
      this.addressLookupLoading = false;
    }
  }

  consultarCobertura(): void {
    if (!this.selectedCoordinates || !this.form.direccion.trim()) return;

    this.coverageLoading = true;
    this.coverage = null;

    this.coverageService
      .checkCoverage(
        this.selectedCoordinates.latitude,
        this.selectedCoordinates.longitude
      )
      .subscribe({
        next: response => {
          this.coverage = response;
          this.coverageLoading = false;
        },
        error: error => {
          this.coverageLoading = false;
          this.coverage = {
            covered: false,
            reason: error?.error?.error?.message || 'No pudimos consultar la cobertura. Intentá nuevamente.'
          };
        }
      });
  }

confirmarSolicitud(): void {

  if (!this.terminosAceptados() || !this.coberturaEsValida()) {
    this.validationAttempted = true;
    return;
  }

  this.submitting = true;
  this.submitError = '';

  const payload = this.buildPayload();

  this.contratacionService
    .enviarSolicitud(payload)
    .subscribe({
      next: (response) => {

        this.submitting = false;

        if (!response.success) {
          this.submitError =
            response.message || 'No fue posible registrar la solicitud.';
          return;
        }

        this.ticketNumber =
          response.ticketNumber ?? null;

        this.submitted = true;
      },

      error: (error) => {

        this.submitting = false;

        console.error(
          'Error al enviar la solicitud de contratación',
          error
        );

        this.submitError =
          error?.error?.message ||
          'No pudimos enviar tu solicitud. Intentá nuevamente.';
      }
    });
}

  nuevaSolicitud(): void {
    this.submitted = false;
    this.pasoActual = 1;
    this.form = {
      nombreApellido: '',
      dni: '',
      telefono: '',
      email: '',
      preferenciaContacto: 'WHATSAPP',
      comentario: '',
      direccion: '',
      referencia: '',
      terminos: false
    };
    this.selectedCoordinates = null;
    this.coverage = null;
    this.marker?.remove();
    this.marker = undefined;
  }

  get precioFormateado(): string {
    return new Intl.NumberFormat('es-AR').format(this.plan.precio);
  }

  get tienePromocion(): boolean {
    return !!this.plan.mesesPromocion;
  }

  get coordenadasSeleccionadas(): string {
    if (!this.selectedCoordinates) return 'Todavía no seleccionaste una ubicación';
    return `${this.selectedCoordinates.latitude.toFixed(6)}, ${this.selectedCoordinates.longitude.toFixed(6)}`;
  }

  coberturaEsValida(): boolean {
    return !!this.coverage?.covered && !!this.selectedCoordinates;
  }

  terminosAceptados(): boolean {
    return this.form.terminos;
  }

 validarDatos(): boolean {
    return !!(
      this.form.nombreApellido.trim() &&
      this.form.dni.trim() &&
      this.form.telefono.trim() &&
      this.form.email.trim() &&
      this.form.preferenciaContacto
    );
  }

  private setMapLocation(
    latitude: number,
    longitude: number,
    triggerCoverage: boolean,
    centerMap = true
  ): void {
    this.selectedCoordinates = { latitude, longitude };

    if (this.map && centerMap) {
      this.map.setView([latitude, longitude], Math.max(this.map.getZoom(), 16), {
        animate: true
      });
    }

    if (this.map) {
      if (!this.marker) {
        this.marker = L.marker([latitude, longitude], { draggable: true }).addTo(this.map);
        this.marker.on('dragend', () => this.onMarkerDragEnd());
      } else {
        this.marker.setLatLng([latitude, longitude]);
      }
    }

    if (triggerCoverage) {
      this.consultarCobertura();
    }
  }

  private queueMapInit(): void {
    setTimeout(() => this.initMap());
  }

  private initMap(): void {
    if (!this.mapContainer || this.map) return;

    this.map = L.map(this.mapContainer.nativeElement, {
      zoomControl: false,
      attributionControl: true,
      minZoom: 6,
      maxZoom: 19
    }).setView([-32.95, -60.66], 12);

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => this.onMapClick(event));
    this.mapReady = true;

    setTimeout(() => this.map?.invalidateSize(), 100);
  }

  private buildPayload(): ContratacionPayload {
    return {
      plan: this.plan,
      datosPersonales: {
        nombreApellido: this.form.nombreApellido.trim(),
        dni: this.form.dni.trim(),
        telefono: this.form.telefono.trim(),
        email: this.form.email.trim(),
        preferenciaContacto: this.form.preferenciaContacto,
        comentario: this.form.comentario.trim() || undefined
      },
      domicilio: {
        direccion: this.form.direccion.trim(),
        referencia: this.form.referencia.trim() || undefined,
        latitude: this.selectedCoordinates!.latitude,
        longitude: this.selectedCoordinates!.longitude,
        city: this.coverage?.city,
        province: this.coverage?.province,
        neighborhood: this.coverage?.neighborhood,
        zone: this.coverage?.zone,
        covered: !!this.coverage?.covered,
        waitlistEnabled: this.coverage?.waitlist_enabled,
        waitlistAvailableDate: this.coverage?.waitlist_available_date,
        neighborhoodId: this.coverage?.neighborhood_id,
        zoneId: this.coverage?.zone_id,
        zoneCoverageId: this.coverage?.zone_coverage_id,
        zoneApiId: this.coverage?.zone_api_id,
        cityApiId: this.coverage?.city_api_id,
        provinceApiId: this.coverage?.province_api_id,
        neighborhoodApiId: this.coverage?.neighborhood_api_id
      }
    };
  }
}
