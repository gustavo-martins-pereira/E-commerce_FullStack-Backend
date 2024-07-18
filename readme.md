# Backend do E-commerce FullStack

Backend para o funcionamento do site do Ecommerce *FullStack*, usando rotas *HTTP* e as entidades relacionadas as regras de negócio da aplicação, com rotas autorizadas através de **JWT**.

## Sumário

- [Tecnologias Utilizadas](#-tecnologias-usadas)
- [Instalação](#-instalação)
- [Estrutura do Projeto](#-estrutura-do-projeto)

## &#x1F5A5; Tecnologias Usadas

<img alt="Javascript Logo" height="60" width="60" src="./readme/javascript.svg" />&nbsp;
<img alt="Nodejs Logo" height="60" width="60" src="./readme/nodejs.svg" />&nbsp;
<img alt="Express Logo" height="60" width="60" src="./readme/express.svg" />&nbsp;
<img alt="JWT Logo" height="60" width="60" src="./readme/jwt.svg" />&nbsp;
<img alt="NPM Logo" height="60" width="60" src="./readme/npm.svg" />&nbsp;
<img alt="PostgreSQL Logo" height="60" width="60" src="./readme/postgresql.svg" />&nbsp;

## &#x2699; Instalação

Instruções para configurar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

### Passos

1. Clone o repositório:
```sh
git clone https://github.com/gustavo-martins-pereira/E-commerce_FullStack-Backend.git
```

2. Navegue até o diretório do projeto:
```sh
cd nome-do-repositorio
```

3. Instale as dependências:
```sh
npm install
```

4. Configure o arquivo de ambiente `.env` conforme o seu banco PostgreSQL.

## &#x1F4C1; Estrutura do Projeto

```
/src
├── /config
├── /controllers
│   ├── entityController.js
├── /db
│   ├── /config
│   ├── /migrations
│   ├── /models
│   ├── /seeders
│   └── package.json
├── /middlewares
├── /repositories
│   ├── entityRepository.js
├── /routes
│   ├── /validators
│   └── routes.js
├── /services
│   ├── /entity
├── /utils
│   ├── /errors
│   └── encryption.js
└── server.js
.env
.env.example
.gitignore
.sequelizerc
LICENSE
package-lock.json
package.json
readme.md
```
