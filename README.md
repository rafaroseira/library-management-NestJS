# Library Management API

Este projeto é uma simples API para gerenciamento de biblioteca de uma instituição de ensino.

## Pré-requisitos

Você deve possuir instalados em sua máquina:

* NodeJS
* NPM
* Postgres

## Instalação

**1. Clone o repositório** 
```
git clone https://github.com/rafaroseira/library-management-NestJS.git
```
**2. Acesse o diretório do projeto e execute**

```
npm install
```
**3. Inicialize as variáveis de ambiente**

Na raiz do projeto, crie um arquivo .env e inicialize as variáveis de ambiente com os valores desejados.
```
JWT_SECRET =            # Chave secreta do JWT
DB_HOST =               # Host do banco de dados
DB_PORT =               # Porta do banco de dados
DB_USERNAME =           # Usuário do banco de dados
DB_PASSWORD =           # Senha do banco de dados
DB_NAME =               # Nome do banco de dados
```
As variáveis listadas acima são de uso obrigatório, o que implica dizer que a omissão de pelo menos uma delas impedirá a aplicação de ser inicializada. Opcionalmente, você ainda pode definir as seguintes variáveis de ambiente:
```
PORT =                  # Porta em que a API executará (se omitido, será a porta 3000 por padrão)
JWT_EXPIRES_IN =        # Tempo de expiração do JWT (se omitido, será 30m por padrão)
```
Use as letras m, h ou s para definir o tempo de expiração em minutos, horas ou segundos, respectivamente.

**4. Inicie a API em modo de desenvolvimento**

```
npm start run:dev
```

## Rotas da API

**Criar funcionário da biblioteca**

* **Método**: POST
* **Endpoint**: /employee/new
* **Formato do JSON**:
```
{
  "name":"employee",
  "email":"employee@email.com",
  "password":"1234"
}
```
**Login de funcionário da biblioteca**

* **Método**: POST
* **Endpoint**: /auth/login
* **Formato do JSON**:
```
{
  "email":"employee@email.com",
  "password":"1234"
}
```
Caso as credenciais fornecidas sejam válidas, este endpoint retornará um JWT para ser usado em requisições subsequentes de rotas protegidas.

**Adicionar novo livro**

Permite um funcionário da biblioteca adicionar um novo livro a biblioteca. Somente funcionários devidamente autenticados podem acessar a rota.

* **Método**: POST
* **Endpoint**: /book/new
* **Autenticação**: Bearer Token com JWT
* **Formato do JSON**:

```
{
  "title":"Apologia de Sócrates",
  "author": "Platão",
  "totalCopies": 2
}
```
**Atualizar dados de um livro**

Permite um funcionário da biblioteca atualizar dados de um livro da biblioteca. Somente funcionários devidamente autenticados podem acessar a rota. 

* **Método**: PUT
* **Endpoint**: /book/:id, sendo que :id é o id do livro desejado
* **Autenticação**: Bearer Token com JWT
* **Formato do JSON**: Não é necessário fornecer os 3 atributos title, author e totalCopies na atualização; basta fornecer apenas os campos que você deseja atualizar. Por exemplo, para o livro de id 1, o JSON abaixo alteraria apenas o total de cópias existentes do livro na biblioteca para 5.

```
{
  "totalCopies": 5
}
```

**Listar todos os livros**

* **Método**: GET
* **Endpoint**: /book

**Exibir um livro específico**

* **Método**: GET
* **Endpoint**: /book/:id, sendo que :id é o id do livro desejado

**Buscar livro pelo título**

Não é necessário buscar o título exato na busca; basta fornecer alguma palavra contida no título.

* **Método**: GET
* **Endpoint**: /book/search?title=x, sendo que x é um termo de busca qualquer

**Criar cadastro de biblioteca para um estudante**

Permite um funcionário criar um cadastro de biblioteca para um estudante para que ele possa emprestar livros. Somente funcionários devidamente autenticados podem acessar a rota.

* **Método**: POST
* **Endpoint**: /student/new
* **Autenticação**: Bearer Token com JWT
* **Formato do JSON**:

```
{
  "name":"aluno",
  "RA": "2388099",
  "phone":"44999999999"
}
```

RA é o registro do aluno matriculado na instituição de ensino.

**Criar empréstimo de livro**

Permite um funcionário criar um empréstimo de livro para um determinado aluno já cadastrado no sistema da biblioteca. Somente funcionários devidamente autenticados podem acessar a rota.

* **Método**: POST
* **Endpoint**: /loan/new
* **Autenticação**: Bearer Token com JWT
* **Formato do JSON**:

```
{
  "bookId": 3,
  "studentId": 1
}
```

Ao criar o empréstimo para o aluno, será retornada a data limite de retorno do livro, a qual é sempre sete dias após a data do empréstimo.

**Fechar empréstimo de livro**

Permite um funcionário fechar um determinado empréstimo assim que o estudante devolve o livro, atualizando o empréstimo e salvando a data em que o livro foi retornado.

* **Método**: PUT,
* **Endpoint**: /loan/close/:id, sendo que :id é o id do empréstimo a ser fechado.
* **Autenticação**: Bearer Token com JWT