import { Routes } from '@angular/router';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ListarPedidosComponent } from './components/listar-pedidos/listar-pedidos.component';
import { ListarFilmesComponent } from './components/listar-filmes/listar-filmes.component';

export const routes: Routes = [
  { path: 'fazer-pedido', component: PedidoComponent },
  { path: 'listar-pedidos', component: ListarPedidosComponent },
  { path: 'listar-filmes', component: ListarFilmesComponent },
];
