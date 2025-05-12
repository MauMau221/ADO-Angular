import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pedido {
  id?: number;
  codigo: string;
  email: string;
  data_pedido?: string;
}

@Component({
  selector: 'app-listar-pedidos',
  standalone: true, // Indica que o componente é standalone, ou seja, não precisa de @NgModule
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-pedidos.component.html',
  styleUrl: './listar-pedidos.component.scss'
})
export class ListarPedidosComponent implements OnInit {
  pedidos: Pedido[] = []; // Array para armazenar os dados recebidos da API
  erro: string = '';
  loading: boolean = false;
  apiUrl: string = 'http://localhost/php/index.php';
  detalhesUrl: string = 'http://localhost/php/index.php?id=';
  mensagem: string = '';
  
  // Campos para o pedido em edição
  pedidoEmEdicao: Pedido | null = null;
  editandoCodigo: string = '';
  editandoEmail: string = '';
  
  // Para visualizar detalhes
  pedidoDetalhes: Pedido | null = null;
  visualizandoDetalhes: boolean = false;

  constructor(private http: HttpClient) { }

  recebendoDados() {
    this.loading = true;
    this.http.get<Pedido[]>(`${this.apiUrl}?listar`).subscribe({ // Subscrible significa que vamos observar o resultado da requisição
      next: (res) => {
        this.pedidos = res;
        this.erro = '';
        this.loading = false;
      },
      error: (err) => {
        this.erro = 'Erro ao receber os dados: ' + err.message;
        console.error('Erro:', err);
        this.loading = false;
      }
    });
  }

  ngOnInit() { // Executa quando o componente é inicializado
    this.recebendoDados();
  }
  
  recarregarDados() {
    this.recebendoDados();
    this.mensagem = '';
    this.pedidoEmEdicao = null;
    this.visualizandoDetalhes = false;
    this.pedidoDetalhes = null;
  }
  
  excluirPedido(id: number) {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      // Usar diretamente o método POST para excluir, evitando problemas de CORS com DELETE
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.post(`${this.apiUrl}`, { acao: 'excluir', id: id }, { headers }).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.mensagem = res.success;
            this.recebendoDados();
          } else if (res.error) {
            this.mensagem = 'Erro: ' + res.error;
          }
        },
        error: (err) => {
          this.mensagem = 'Erro ao excluir o pedido: ' + err.message;
          console.error('Erro ao excluir:', err);
        }
      });
    }
  }
  
  verDetalhes(id: number) {
    this.visualizandoDetalhes = true;
    this.pedidoEmEdicao = null;
    this.loading = true;
    
    this.http.get<Pedido>(`${this.detalhesUrl}${id}`).subscribe({
      next: (res) => {
        this.pedidoDetalhes = res;
        this.loading = false;
      },
      error: (err) => {
        this.mensagem = 'Erro ao carregar detalhes: ' + err.message;
        this.loading = false;
        console.error('Erro:', err);
      }
    });
  }
  
  iniciarEdicao(pedido: Pedido) {
    this.pedidoEmEdicao = pedido;
    this.editandoCodigo = pedido.codigo;
    this.editandoEmail = pedido.email;
    this.visualizandoDetalhes = false;
    this.pedidoDetalhes = null;
  }
  
  cancelarEdicao() {
    this.pedidoEmEdicao = null;
  }
  
  salvarEdicao() {
    if (!this.pedidoEmEdicao || !this.pedidoEmEdicao.id) {
      return;
    }
    
    const pedidoAtualizado = {
      id: this.pedidoEmEdicao.id,
      codigo: this.editandoCodigo,
      email: this.editandoEmail
    };
    
    // Usar diretamente o método POST para atualizar
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const payload = { ...pedidoAtualizado, acao: 'atualizar' };
    
    this.http.post(this.apiUrl, payload, { headers }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.mensagem = res.success;
          this.recebendoDados();
          this.pedidoEmEdicao = null;
        } else if (res.error) {
          this.mensagem = 'Erro: ' + res.error;
        }
      },
      error: (err) => {
        this.mensagem = 'Erro ao atualizar o pedido: ' + err.message;
        console.error('Erro ao atualizar:', err);
      }
    });
  }
  
  fecharDetalhes() {
    this.visualizandoDetalhes = false;
    this.pedidoDetalhes = null;
  }
}
