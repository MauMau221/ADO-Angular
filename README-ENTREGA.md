# Projeto Angular - Sistema de Locadora

Este projeto é parte da atividade acadêmica do curso e consiste em uma aplicação Angular que se comunica com uma API PHP para gerenciar pedidos de filmes em uma locadora.

## Funcionalidades Implementadas

1. **Página Inicial**
   - Dashboard com cards de navegação para as principais funcionalidades

2. **Cadastro de Pedidos**
   - Formulário para envio de pedidos via POST com JSON
   - Exibição de resposta do servidor em formato amigável

3. **Listagem de Pedidos**
   - Visualização de todos os pedidos cadastrados
   - Funcionalidades de CRUD completo:
     - Criar: via página de Fazer Pedido
     - Ler: listagem e detalhes de pedidos
     - Atualizar: edição de pedidos existentes
     - Deletar: exclusão de pedidos

4. **Catálogo de Filmes**
   - Listagem de filmes disponíveis
   - Funcionalidade de busca por texto

## Arquivos para Entrega

1. **Pasta SRC do Angular**
   - Todo o código-fonte está no diretório `/src`
   - Para compactar: `zip -r src.zip src/`

2. **Arquivo PHP da API**
   - Localizado em: `php/index.php`
   - Implementa endpoints para todas as operações CRUD

3. **Endereço da API PHP**
   - URL Local: `http://localhost/php/index.php`
   - Endpoints disponíveis:
     - `POST /php/index.php` - Criar pedido (método recomendado)
     - `GET /php/index.php?listar` - Listar todos os pedidos
     - `GET /php/index.php?id=X` - Obter detalhes de um pedido específico
     - `PUT /php/index.php` - Atualizar pedido
     - `DELETE /php/index.php?id=X` - Excluir pedido
     - `GET /php/index.php?listarFilmes` - Listar filmes disponíveis

## Instalação e Execução

1. **Backend (PHP)**
   - Copie o arquivo `php/index.php` para o diretório `htdocs/php/` do seu servidor XAMPP
   - Certifique-se de que o Apache e MySQL estão em execução

2. **Frontend (Angular)**
   - Clone o repositório
   - Execute `npm install` para instalar as dependências
   - Execute `ng serve` para iniciar o servidor de desenvolvimento
   - Acesse `http://localhost:4200` no navegador

## Prints da Aplicação

[Adicione aqui os prints necessários para a entrega]

## Observações

- A aplicação Angular se comunica com a API PHP usando o HttpClient
- Foi implementado o padrão RESTful para as operações:
  - POST para criar recursos (pedidos)
  - GET para obter recursos (listagens e detalhes)
  - PUT para atualizar recursos (editar pedidos)
  - DELETE para remover recursos (excluir pedidos)
- A API utiliza banco de dados MySQL para armazenamento
- Foram implementados recursos extras como busca e filtros para demonstrar conhecimento avançado

---

Desenvolvido por [Seu Nome] para a disciplina [Nome da Disciplina] 