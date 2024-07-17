import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserAreaComponent } from "./user-area/user-area.component";
import { InvoicesComponent } from "./user-area/invoices/invoices.component";
import { ServicesComponent } from "./user-area/services/services.component";
import { TicketsComponent } from "./user-area/tickets/tickets.component";
import { HomeUserComponent } from "./user-area/home-user/home-user.component";
import { AuthGuard } from "src/app/AuthGuard";

const constRutasHijas: Routes = [
    { path: 'user', component: UserAreaComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HomeUserComponent, canActivate: [AuthGuard]},
    { path: 'invoices', component: InvoicesComponent, canActivate: [AuthGuard]},
    { path: 'services', component: ServicesComponent, canActivate: [AuthGuard]},
    { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard]},
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(constRutasHijas)],
    exports: [RouterModule],
  })
  export class RouterChildModule { }