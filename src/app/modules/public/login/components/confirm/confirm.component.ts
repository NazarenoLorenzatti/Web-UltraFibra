import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SigninService } from 'src/app/modules/services/signin/signin.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private signinService = inject(SigninService);
  private messageService = inject(MessageService);
  public email: string = '';

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token') || 'Token Invalido';
    if (token !== 'Token Invalido') {
      this.signinService.confirmEmail(token).subscribe({
        next: (data: any) => {
          if (data.metadata[0].codigo === "00") {
            this.showSuccess(data.metadata[0].informacion);
            this.email = data.userResponse.users[0].email;
          } else {
            this.showError(data.metadata[0].informacion);
          }
        },
        error: (error: any) => {
          console.log("Error", error);
          this.showError(error.error.metadata[0].informacion);
        }
      });
    } else {
      this.showError(token);
      this.router.navigate(['app/login']);
    }


  }


  // Mensaje Ok
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }


  // Mensaje Error
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


  return() {
    this.router.navigate(['app/login']);
  }
}
