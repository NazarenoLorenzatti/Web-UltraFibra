import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent implements OnInit {
  showDiv: boolean = true;

  ngOnInit() {
    this.toggleDiv();
  }

  toggleDiv() {
    setInterval(() => {
      this.showDiv = !this.showDiv;
    }, 5000); // Cambia 5000 por el tiempo en milisegundos que deseas entre cada aparición del div
  }

}
