.ONESHELL:

# -----------------------------------------------------------------------------------------
# DB
# -----------------------------------------------------------------------------------------

create-db:
	docker run -d \
	--name pg_estracta \
	-e POSTGRES_PASSWORD=estracta \
	-e POSTGRES_USER=estracta \
	-e POSTGRES_DB=teste \
	-p 5432:5432 \
	postgres:15-alpine

run-db:
	docker start pg_estracta

# -----------------------------------------------------------------------------------------
# BACK
# -----------------------------------------------------------------------------------------

run-back:
	cd back
	. ./venv/Scripts/activate
	pip install -r requirements.txt
	flask --app src/app.py --debug run

create-back:
	cd back
	python -m venv venv
	. ./venv/Scripts/activate
	pip install -r requirements.txt

freeze:
	pip freeze > requirements.txt

# -----------------------------------------------------------------------------------------
# FRONT
# -----------------------------------------------------------------------------------------

create-front:
	cd front
	npm install

run-front:
	cd front
	npm run dev

# -----------------------------------------------------------------------------------------
# DEPLOY
# -----------------------------------------------------------------------------------------

up-no-back:
	docker-compose up -d db migration front

up:
	docker-compose up -d

down:
	docker-compose down -v --rmi all