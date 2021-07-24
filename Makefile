network:
	@echo "[Makefile] create local network 🌑"
	docker network create --driver=bridge --subnet=00.000.000.0/00 localdev

build:
	@echo "[Makefile] local build 📦"
	docker compose build

reup: build
	@echo "[Makefile] build & start service 📦 🚀"
	docker compose up -d

up:
	@echo "[Makefile] start service 🚀"
	docker compose up -d

logs:
	@echo "[Makefile] logs 💬"
	docker compose logs -f

sh:
	@echo "[Makefile] shell into service 🐚"
	docker exec -it demo-api /bin/sh

down:
	@echo "[Makefile] down service 💤"
	docker compose down

test:
	@echo "[Makefile] test service 🧪"
	go test -v -cover ./..

clean: down
	@echo "[Makefile] cleaning up"
	docker system prune -f
	docker volume prune -f