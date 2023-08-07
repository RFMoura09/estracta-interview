run-db:
	docker run -d \
	--name pg_estracta \
	-e POSTGRES_PASSWORD=estracta \
	-e POSTGRES_USER=estracta \
	-e POSTGRES_DB=teste \
	-p 5432:5432 \
	postgres:15-alpine

run-back:
	cd back
	. ./venv/Scripts/activate
	pip install -r requirements.txt
	flask --app src/app.py --debug run

freeze:
	pip freeze > requirements.txt

run-front:
	cd front
	npm run dev

up:
	docker-compose up -d

down:
	docker-compose down -v --rmi all