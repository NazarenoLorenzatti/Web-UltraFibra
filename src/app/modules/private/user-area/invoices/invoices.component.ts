import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/modules/services/signin/signin.service';
interface invoices {
  invoice: string;
  number: string;
  expiration: string;
  mount: number;
  url: string;
}
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit{
  public activeIndex: number = 0;
  public visible: boolean = false;
  public client: any;
  private signinService = inject(SigninService);
  private router = inject(Router);
  public display: boolean = false;
  public dialogStyles: any;

  ngOnInit() {
    this.setDialogStyles(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDialogStyles(window.innerWidth);
  }

  setDialogStyles(width: number) {
    if (width <= 799) {
      this.dialogStyles = { width: '95vw' };
    } else if (width > 800 && width <= 1024) {
      this.dialogStyles = { width: '70vw' };
    } else {
      this.dialogStyles = { width: '50vw' };
    }
  }
  
  constructor(){
    this.signinService.customer$.subscribe({
      next: (data: any) => {
        if(data.metadata[0].codigo == "00"){
          console.log(data.clientResponse.clients[0])
          this.client = data.clientResponse.clients[0];
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }   
    });
  }


  downloadInvoice(link: string){
    window.open(link, '_blank');
  }

  pay(link: string){
    window.open(link, '_blank');
  }

  nav(nav: string) {
    this.router.navigate([nav]);
  }
}


