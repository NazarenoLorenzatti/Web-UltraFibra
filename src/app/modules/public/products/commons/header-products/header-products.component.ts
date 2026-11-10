import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-products',
  templateUrl: './header-products.component.html',
  styleUrls: ['./header-products.component.css']
})
export class HeaderProductsComponent {
  
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() backgroundImg: string = '';


  @Output() scrollPlans = new EventEmitter<void>();

    onScrollToPlans(): void {
    this.scrollPlans.emit();
  }
  
  constructor() { }
}
