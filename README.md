# Estracta Teste
---
Projeto fullstack de CRUD de Empresas (Flask, React, Postgres, Docker) para entrevista

O projeto contém:
- Procedures Postgres
- Validadores
- Autenticação JWT
- Swagger c/ Auth Header
- Responsividade
- Roteamento
- Visualização de dados com paginação, ordenação e pesquisa
- Adição, Edição e Exclusão de dados
- Automação com Docker e Makefile

## Requisitos
Basta ter o **Docker** instalado para rodar, mas se optar por não usá-lo, seguem os requisitos mínimos:
- Python v.3.10 acima
- Postgres v.15 acima
- Node v.16 acima
- Makefile

Se você estiver usando o Windows com o Chocolatey, basta digitar:
```powershell
choco install make
choco install nodejs-lts
choco install postgresql15
choco install python
``` 

## Comandos

#### Iniciar o Projeto
```bash
# roda o docker-compose
make up

# Se ocorrer algum problema ao rodar no docker-compose, 
# tente rodar sem o build do backend, com os seguintes comandos:
make up-no-back
make create-back
make run-back

# para parar os containers
make down

# ou, se quiser rodar sem o docker-compose, digite
make create-db
make create-back
make create-front
make run-back
make run-front
```

#### Rodar o projeto
```bash
# uma vez já criado o projeto, você pode rodá-lo novamente com os comandos:
make run-db
make run-back
make run-front
```

