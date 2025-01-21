import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CompanyComponent } from "./company/company.component";
import { GridComponent } from "./grid/grid.component";
import { ContactComponent } from "./contact/contact.component";
import { HomelikeComponent } from "./products/segments/homelike/homelike.component";
import { PymesComponent } from "./products/segments/pymes/pymes.component";
import { CorpoComponent } from "./products/segments/corpo/corpo.component";
import { LoginComponent } from "./login/login.component";
import { WarningComponent } from "./login/components/warning/warning.component";
import { ConfirmComponent } from "./login/components/confirm/confirm.component";
import { CommonsComponent } from "./commons/commons.component";

const constRutasHijas: Routes = [
  { path: 'app', component: CommonsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'us', component: CompanyComponent },
  { path: 'grid', component: GridComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products/homelike', component: HomelikeComponent },
  { path: 'products/pymes', component: PymesComponent },
  { path: 'products/corpo', component: CorpoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'warning', component: WarningComponent },
  { path: 'email-confirm/:token', component: ConfirmComponent },
]

@NgModule({
  imports: [RouterModule.forChild(constRutasHijas)],
  exports: [RouterModule],
})
export class RouterChildModule { }