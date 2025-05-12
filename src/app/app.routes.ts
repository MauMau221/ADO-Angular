import { Routes } from '@angular/router';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ListarPedidosComponent } from './components/listar-pedidos/listar-pedidos.component';
import { ListarFilmesComponent } from './components/listar-filmes/listar-filmes.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'fazer-pedido', component: PedidoComponent },
  { path: 'listar-pedidos', component: ListarPedidosComponent },
  { path: 'listar-filmes', component: ListarFilmesComponent },
];
