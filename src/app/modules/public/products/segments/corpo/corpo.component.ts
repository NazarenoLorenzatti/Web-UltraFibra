import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';

interface info {
  title: string;
  article: string;
  img: string;
  reverse: boolean;
}

@Component({
  selector: 'app-corpo',
  templateUrl: './corpo.component.html',
  styleUrls: ['./corpo.component.css']
})
export class CorpoComponent {

  sectionsInfo: info[];
  private viewportScroller = inject(ViewportScroller);

  constructor() {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.sectionsInfo = [
      {
        title: "Internet para Empresas.",
        article: "Porque necesitás conectividad de alta calidad, para el uso seguro y confiable de Internet como"
        + "herramienta de trabajo empresarial. Proveemos servicio de internet por fibra óptica de máxima velocidad para grandes corporaciones,"
        + "Somos proveedores del cordon industrial desde Baigorria a Timbues,"
        + "Otorgando un servicio de primera calidad, con la ultima tecnologia y con soporte tecnico 100% dedicado",
        img: "./assets/images/products/info1.png",
        reverse: false,
      },
      {
        title: "Conexiones simétricas y asimetricas",
        article: "Instalacion completamente en fibra Optica, brindamos servicios de"
        + "IP publicas estaticas, Vlans ETC."
        + "Relevamiento, asesoramiento y soporte técnico con monitoreo de red 24x7x365.",
        img: "./assets/images/products/info2.png",
        reverse: true,
      },
      {
        title: "Camaras y centros de monitoreos",
        article: "Contamos con el personal mejor cualificado para el montaje, gestion y soporte de "
        + "centros de Monitoreos con la mas alta tecnologia.",
        img: "./assets/images/products/info3.png",
        reverse: false,
      },
      {
        title: "Desafiamos el límite de la comunicación.",
        article: "Somos pioneros en Otorgar conexion de "
        + "INTERNET SIMÉTRICO por Fibra Optica para grandes empresas. "
        + "Somos proveedores del cordon industrial desde Baigorria a Timbues,"
        + "Otorgando un servicio de primera calidad, con la ultima tecnologia y con soporte tecnico 100% dedicado",
        img: "./assets/images/products/info4.jpg",
        reverse: true,
      },
    ]
  }
}
