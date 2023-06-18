SERVICE_NAME = api

dev:
	cp backend/.env.sample backend/.env
	docker compose build

up:
	docker compose up

upd:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down

shell:
	docker compose exec ${SERVICE_NAME} bash

startproject:
	docker compose run --rm ${SERVICE_NAME} python3 manage.py startproject ${service}

startapp:
	docker compose run --rm ${SERVICE_NAME} python3 manage.py startapp ${service}

makemigrations:
	docker compose run --rm ${SERVICE_NAME} python3 manage.py makemigrations

migrate:
	docker compose run --rm ${SERVICE_NAME} python3 manage.py migrate

createsuperuser:
	docker compose run --rm ${SERVICE_NAME} python3 manage.py createsuperuser