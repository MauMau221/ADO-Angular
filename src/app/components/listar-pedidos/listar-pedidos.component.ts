import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-pedidos',
  standalone: true, // Indica que o componente é standalone, ou seja, não precisa de @NgModule
  imports: [CommonModule],
  templateUrl: './listar-pedidos.component.html',
  styleUrl: './listar-pedidos.component.scss'
})
export class ListarPedidosComponent {
  pedidos: any[] = []; // Array para armazenar os dados recebidos da API
  erro: string = '';

  constructor(private http: HttpClient) { }

  recebendoDados() {
    const url = `http://localhost/php/index.php?listar`;
    this.http.get<any[]>(url).subscribe({ // Subscrible significa que vamos observar o resultado da requisição
      next: (res) => {
        this.pedidos = res;
        this.erro = '';
      },
      error: (err) => {
        this.erro = 'Erro ao receber os dados.';
        console.error('Erro:', err);
      }
    });
  }
  ngOnInit() { // Executa quando o componente é inicializado
    this.recebendoDados();
  }
}
