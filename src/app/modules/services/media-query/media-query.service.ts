import { MediaMatcher } from '@angular/cdk/layout';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaQueryService  implements OnDestroy{
  private media = inject(MediaMatcher);
  private movileScreen: MediaQueryList;
  private movileScreenListener: () => void;
  public isSmallScreen: boolean = false;

   // Observable que emite el estado de la pantalla
   private smallScreenSubject = new BehaviorSubject<boolean>(false);
   pantallaPequena$ = this.smallScreenSubject.asObservable();

  constructor() { 
    this.movileScreen = this.media.matchMedia('(max-width: 768px)');
    this.smallScreenSubject.next(this.movileScreen.matches);
    this.movileScreenListener = () => {
      this.smallScreenSubject.next(this.movileScreen.matches);
    };
    this.movileScreen.addEventListener('change', this.movileScreenListener);
  }

  ngOnDestroy() {
    this.movileScreen.removeEventListener('change', this.movileScreenListener);
  }
}
