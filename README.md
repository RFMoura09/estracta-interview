# Estracta Teste
---
Projeto fullstack de CRUD de Empresas (Flask, React, Postgres, Docker) para entrevista

### Requisitos
Basta ter o **Docker** instalado para rodar, mas se não tiver, segue os requisitos mínimos:
- Python v.3.10 acima
- Postgres v.15 acima
- Node v.16 acima

### Iniciar o projeto

##### Com docker
```bash
# para rodar o projeto
make up

# para parar o projeto
make down
```

##### Sem docker
```bash
# BACK
cd back
python -m venv venv
. ./venv/Scripts/activate
pip install -r requirements.txt
flask --app src/app.py --debug run

#FRONT
cd front
npm install
npm run dev

# BANCO DE DADOS
# (CREDENCIAIS EM /back/.env)
psql -h localhost -d teste -U estracta -p 5432 -a -q -f [...]/db/migrations
```