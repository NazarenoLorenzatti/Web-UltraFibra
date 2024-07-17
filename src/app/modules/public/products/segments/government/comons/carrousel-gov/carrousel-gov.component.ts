import { Component, OnInit } from '@angular/core';


export interface slides{
  id: number;
  route: string;
  title: string;
  info: string;
}
@Component({
  selector: 'app-carrousel-gov',
  templateUrl: './carrousel-gov.component.html',
  styleUrls: ['./carrousel-gov.component.css']
})
export class CarrouselGovComponent implements OnInit {
  listSlides:  slides[];
  responsiveOptions!: any[];

  constructor(){
    const img1: slides = { 
      id: 0,
      route: "./assets/images/products/gov1.jpg",
      title: "Internet Ultra Veloz",
      info: "Internet de ultima generacion",
    };
    const img2: slides = { 
      id: 1,
      route: "./assets/images/products/gov2.jpg",
      title: "Vigilancia",
      info: "Centros de Monitoreos",
    };
    const img3: slides = { 
      id: 2,
      route: "./assets/images/products/gov3.jpg",
      title: "Servicios Corporativos",
      info: "Ip fija, Bridge, Vlans",
    };
    this.listSlides = [img1,img2,img3];
  }


  infoStyles = [
    {'background-color': '#e0e0e0c0', 'color': 'black'}, // Estilos para la imagen 1
    {'background-color': '#040624c0'}, // Estilos para la imagen 2
    {'background-color': '#e0e0e0c0', 'color': 'black'}, // Estilos para la imagen 3
    // Agrega más estilos según sea necesario
  ];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
