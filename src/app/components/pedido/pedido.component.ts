import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.scss'
})
export class PedidoComponent {
  codigo: number = 0;
  email: string = '';
  resposta: string = '';

  constructor(private http: HttpClient) { }

  enviarDados() {
    const url = `http://localhost:8080/php/index.php?codigo=${encodeURIComponent(this.codigo)}&email=${this.email}`;
    this.http.get(url, { responseType: 'text' }).subscribe({
      next: (res) => this.resposta = res,
      error: () => this.resposta = 'Erro ao enviar os dados.'
    });
  }
}
