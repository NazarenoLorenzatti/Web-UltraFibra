import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-up-payment',
  templateUrl: './btn-up-payment.component.html',
  styleUrls: ['./btn-up-payment.component.css']
})
export class BtnUpPaymentComponent {

  showDiv: boolean = true;

  ngOnInit() {
    this.toggleDiv();
  }

  toggleDiv() {
    setInterval(() => {
      this.showDiv = !this.showDiv;
    }, 10000); 
  }
}
