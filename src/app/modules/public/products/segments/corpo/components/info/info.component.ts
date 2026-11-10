import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  @Input() title = '';
  @Input() article = '';
  @Input() img = '';
  @Input() reverse = false;
  @Input() index = 1;
}
