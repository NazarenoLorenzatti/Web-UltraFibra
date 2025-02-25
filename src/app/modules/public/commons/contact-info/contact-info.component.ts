import { Component, inject, OnInit } from '@angular/core';
import { AnimationService } from 'src/app/modules/services/animations/animation.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
  private animationService = inject(AnimationService);
  
  ngOnInit(): void {
    this.animationService.setAnimation('tracking-element', 'bounce-in-top', 0.5);  
  }


}
