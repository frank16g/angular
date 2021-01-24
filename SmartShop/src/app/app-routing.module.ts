import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ClientePedidosRealizadosComponent } from './components/cliente-pedidos-realizados/cliente-pedidos-realizados.component';
import { ProductsCrudComponent } from './components/products-crud/products-crud.component';
import { CheckLoginGuard } from './guards/check-login.guard';
import { RepartidorPedidosNuevosComponent} from './components/repartidor-pedidos-nuevos/repartidor-pedidos-nuevos.component';
import {RepartidorPedidosRealizadosComponent} from './components/repartidor-pedidos-realizados/repartidor-pedidos-realizados.component';
import { AdminHomeComponent} from './components/admin-home/admin-home.component';
import {AdminRepartidoresComponent} from './components/admin-repartidores/admin-repartidores.component'

import { from } from 'rxjs';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)}, 
  {path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cliente',
     canActivate:[CheckLoginGuard],
     component: PedidosComponent
  },
  {
    path: 'pedidosRealizados',
    canActivate:[CheckLoginGuard],
    component: ClientePedidosRealizadosComponent
  },
  {
    path:'repartidorPedidosNuevos',
    canActivate:[CheckLoginGuard],
    component:RepartidorPedidosNuevosComponent
  },
  {
    path:'repartidorPedidosRealizados',
    canActivate:[CheckLoginGuard],
    component:RepartidorPedidosRealizadosComponent
  },
  {
    path:'admin',
    component:AdminHomeComponent
  },
  {
    path:'admin-repartidores',
    component:AdminRepartidoresComponent
  },
  {
    path: 'admin-productos',
    component:ProductsCrudComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
