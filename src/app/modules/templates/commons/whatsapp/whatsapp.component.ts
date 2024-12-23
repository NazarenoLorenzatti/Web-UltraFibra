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
    }, 10000); 
  }

  whatsapp(){
    const whatsappUrl = 'https://wa.me/5493476585985?text=Hola%20Lucio';
    window.open(whatsappUrl, '_blank');
  }
}
