import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CommonsComponent } from "./commons/commons.component";
import { CompanyComponent } from "./company/company.component";
import { GridComponent } from "./grid/grid.component";
import { NewsComponent } from "./news/news.component";
import { ContactComponent } from "./contact/contact.component";
import { HomelikeComponent } from "./products/segments/homelike/homelike.component";
import { PymesComponent } from "./products/segments/pymes/pymes.component";
import { CorpoComponent } from "./products/segments/corpo/corpo.component";
import { GovernmentComponent } from "./products/segments/government/government.component";
import { LoginComponent } from "./login/login.component";

const constRutasHijas: Routes = [
  { path: 'app', component: CommonsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'us', component: CompanyComponent },
  { path: 'grid', component: GridComponent },
  { path: 'news', component: NewsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products/homelike', component: HomelikeComponent },
  { path: 'products/pymes', component: PymesComponent },
  { path: 'products/corpo', component: CorpoComponent },
  { path: 'products/gov', component: GovernmentComponent },
  { path: 'login', component: LoginComponent },
]

@NgModule({
  imports: [RouterModule.forChild(constRutasHijas)],
  exports: [RouterModule],
})
export class RouterChildModule { }