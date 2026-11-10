import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-up-payment',
  templateUrl: './btn-up-payment.component.html',
  styleUrls: ['./btn-up-payment.component.css']
})
export class BtnUpPaymentComponent implements OnInit, OnDestroy {
  showDiv = true;
  private labelInterval?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.toggleDiv();
  }

  toggleDiv(): void {
    this.labelInterval = setInterval(() => {
      this.showDiv = !this.showDiv;
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.labelInterval) {
      clearInterval(this.labelInterval);
    }
  }
}
