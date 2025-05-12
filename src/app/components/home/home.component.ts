import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="jumbotron bg-light p-4 rounded">
        <h1 class="display-4">Sistema de Locadora de Filmes</h1>
        <p class="lead">
          Esta aplicação permite gerenciar pedidos de filmes e visualizar o catálogo disponível.
        </p>
        <hr class="my-4">
        <p>Selecione uma das opções abaixo para começar:</p>
        <div class="d-flex gap-2">
          <a routerLink="/fazer-pedido" class="btn btn-primary">Fazer um Pedido</a>
          <a routerLink="/listar-pedidos" class="btn btn-success">Gerenciar Pedidos</a>
          <a routerLink="/listar-filmes" class="btn btn-info">Ver Catálogo de Filmes</a>
        </div>
      </div>
      
      <div class="row mt-4">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Fazer Pedido</h5>
              <p class="card-text">Reserve um filme informando o código e seu email.</p>
              <a routerLink="/fazer-pedido" class="btn btn-sm btn-outline-primary">Fazer Pedido</a>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Gerenciar Pedidos</h5>
              <p class="card-text">Visualize, edite ou cancele seus pedidos já realizados.</p>
              <a routerLink="/listar-pedidos" class="btn btn-sm btn-outline-primary">Ver Pedidos</a>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Catálogo de Filmes</h5>
              <p class="card-text">Explore nosso catálogo completo de filmes disponíveis.</p>
              <a routerLink="/listar-filmes" class="btn btn-sm btn-outline-primary">Ver Catálogo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
} 