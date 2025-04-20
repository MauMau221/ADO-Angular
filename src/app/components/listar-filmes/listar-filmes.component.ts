import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-filmes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-filmes.component.html',
  styleUrl: './listar-filmes.component.scss'
})
export class ListarFilmesComponent {
  filmes: any[] = [];
  erro: string = '';

  constructor(private http: HttpClient) { }
  
  
  recebendoDados() {
    const url = `http://localhost:8080/php/index.php?listarFilmes`;
    this.http.get<any[]>(url).subscribe({ // Subscrible significa que vamos observar o resultado da requisição
      next: (res) => {
        this.filmes = res;
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
