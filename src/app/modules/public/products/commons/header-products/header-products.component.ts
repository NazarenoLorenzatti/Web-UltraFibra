import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-products',
  templateUrl: './header-products.component.html',
  styleUrls: ['./header-products.component.css']
})
export class HeaderProductsComponent {
  
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() backgroundImg: string = '';

  constructor() { }
}
