import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

 public email = 'contacto@ultrafibra.com.ar';


 openIntranet(){
  const url = 'https://ultrafibra.com.ar:444/#/login';
  window.open(url, '_blank'); 
 }
}
