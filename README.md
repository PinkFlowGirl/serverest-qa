# ServeRest QA

Projeto de estudos em Quality Assurance (QA) com foco em testes automatizados de API utilizando JavaScript e Node.js.

O objetivo é desenvolver conhecimentos práticos em validação de APIs REST, asserções, tratamento de falhas e organização de resultados de testes.

## Objetivos do projeto

* Automatizar testes de API.
* Validar códigos de status e dados das respostas HTTP.
* Registrar resultados individuais dos testes.
* Gerar um relatório final de execução.
* Praticar o tratamento de falhas em uma suíte de testes.

## Tecnologias utilizadas

* JavaScript
* Node.js
* API REST
* Módulo `assert` do Node.js
* npm
* Git e GitHub

## Testes automatizados implementados

| Identificação | Cenário                          | Resultado esperado                            |
| ------------- | -------------------------------- | --------------------------------------------- |
| CT-AUTO-001   | Consultar a lista de usuários    | HTTP 200 e estrutura esperada na resposta     |
| CT-AUTO-002   | Consultar um usuário inexistente | HTTP 400 e mensagem de usuário não encontrado |

Os testes validam as respostas da API ServeRest e verificam se o comportamento observado corresponde ao esperado.

## Funcionalidades da suíte

* Execução sequencial dos testes.
* Tratamento individual de falhas.
* Registro dos resultados de cada teste.
* Relatório final com total de testes aprovados e reprovados.
* Código de saída para indicar sucesso ou falha na execução.

## Como executar os testes

### Pré-requisitos

* Node.js instalado.
* npm disponível no terminal.
* Conexão com a internet para acessar a API.

### Execução

Clone o repositório, acesse a pasta do projeto e execute:

```bash
npm test
```

O comando executa os testes definidos no arquivo `tests/usuarios.test.js`.

## Estrutura do projeto

```text
serverest-qa/
├── docs/
├── postman/
├── tests/
│   └── usuarios.test.js
├── .gitignore
├── package.json
└── README.md
```

## Aprendizados

Este projeto faz parte da minha evolução técnica em QA, com atividades práticas de automação de testes de API, validação de respostas HTTP, tratamento de erros e geração de relatórios.

O projeto está em desenvolvimento e será ampliado conforme novos cenários e melhorias forem implementados.
