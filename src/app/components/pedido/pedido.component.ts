import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  apiUrl: string = 'http://localhost/php/index.php';
  
  constructor(private http: HttpClient) { }

  enviarDados() {
    // Use POST method with JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const data = {
      codigo: this.codigo,
      email: this.email
    };
    
    this.http.post(this.apiUrl, data, { headers }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.resposta = res.success;
        } else if (res.error) {
          this.resposta = res.error;
        } else {
          this.resposta = JSON.stringify(res);
        }
      },
      error: (err) => {
        this.resposta = 'Erro ao enviar os dados: ' + err.message;
        console.error('Erro:', err);
      }
    });
  }
}
