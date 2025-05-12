import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Filme {
  rental_id?: number;
  film_id?: number;
  title?: string;
  rental_date?: string;
  return_date?: string;
  [key: string]: any; // Allow for any other properties that might be in the API response
}

@Component({
  selector: 'app-listar-filmes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-filmes.component.html',
  styleUrl: './listar-filmes.component.scss'
})
export class ListarFilmesComponent implements OnInit {
  filmes: Filme[] = [];
  filmesFiltrados: Filme[] = [];
  erro: string = '';
  loading: boolean = false;
  apiUrl: string = 'http://localhost/php/index.php?listarFilmes';
  
  // Campo de busca
  termoBusca: string = '';

  constructor(private http: HttpClient) { }
  
  recebendoDados() {
    this.loading = true;
    this.http.get<Filme[]>(this.apiUrl).subscribe({
      next: (res) => {
        this.filmes = res;
        this.filmesFiltrados = [...this.filmes];
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
  
  ngOnInit() {
    this.recebendoDados();
  }
  
  recarregarDados() {
    this.recebendoDados();
    this.termoBusca = '';
  }
  
  buscarFilmes() {
    if (!this.termoBusca.trim()) {
      this.filmesFiltrados = [...this.filmes];
      return;
    }
    
    const termo = this.termoBusca.toLowerCase().trim();
    this.filmesFiltrados = this.filmes.filter(filme => {
      // Busca em todas as propriedades do filme
      return Object.values(filme).some(valor => {
        if (typeof valor === 'string') {
          return valor.toLowerCase().includes(termo);
        }
        if (typeof valor === 'number') {
          return valor.toString().includes(termo);
        }
        return false;
      });
    });
  }
  
  limparBusca() {
    this.termoBusca = '';
    this.filmesFiltrados = [...this.filmes];
  }
}
