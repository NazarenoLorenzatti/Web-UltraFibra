import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SigninService } from 'src/app/modules/services/signin/signin.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private signinService = inject(SigninService);
  public dni: string = '';
  private router = inject(Router);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const dni = params.get('dni');
      this.dni = dni || "email invalido";
    });
  }

  forwardEmail() {
    this.signinService.forwaredEmailByDni(this.dni).subscribe({
      next: (data: any) => {
        if(data.metadata[0].codigo === "00") {
          this.showSuccess("Se reenvio el email");
        }else {
          this.showError( data.metadata[0].informacion);
        }
      },
      error: (error: any) => {
        console.log("Error", error);
        this.showError(error.error.metadata[0].informacion);
      }
    });
  }

  return(){
    this.router.navigate(['app/login']);
  }

   // Mensaje Ok
   showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  // Mensaje Error
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
