import { Routes } from '@angular/router';
import { ListaFilmesComponentComponent } from './components/lista-filmes-component/lista-filmes-component.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { ListarPedidosComponent } from './components/listar-pedidos/listar-pedidos.component';
import { FormularioComponent } from './formulario/formulario.component';

export const routes: Routes = [
  { path: '', component: ListaFilmesComponentComponent },
  { path: 'fazer-pedido', component: PedidoComponent },
  { path: 'listar-pedidos', component: ListarPedidosComponent },
  { path: 'formulario', component: FormularioComponent },
];
