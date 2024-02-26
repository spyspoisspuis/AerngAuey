BACKEND_BINARY=backendApp
## up: starts all containers in the background without forcing build
up:
	@echo "Starting Docker images..."
	docker compose -f docker-compose.dev.yml up -d
	@echo "Docker images started!"

## up_build: stops docker compose (if running), builds all projects and starts docker compose
up_build:  bbuild_backend  
	@echo "Stopping docker images (if running...)"
	docker compose -f docker-compose.dev.yml down
	@echo "Building (when required) and starting docker images..."
	docker compose -f docker-compose.dev.yml up --build -d backend frontend nginx
	@echo "Docker images built and started!"

up_build_backend: build_backend
	@echo "Stopping docker images (if running...)"
	docker compose -f docker-compose.dev.yml down
	@echo "Building (when required) and starting docker images..."
	docker compose -f docker-compose.dev.yml up --build -d backend
	@echo "Docker images built and started!"

build_backend:
	@echo "Building backend binary..."
	cd backend && env GOOS=linux CGO_ENABLED=0 go build -o $(BACKEND_BINARY) .
	@echo "Done!"

## down_backend: stops the backend service
down_backend:
	@echo "Stopping backend service..."
	docker compose -f docker-compose.dev.yml down backend
	@echo "Backend service stopped!"


##### Frontend Service #####
## up_build_frontend: stops docker compose (if running), builds projects and starts docker compose
up_build_frontend:
	@echo "Stopping docker images (if running...)"
	docker compose -f docker-compose.dev.yml down frontend
	@echo "Building (when required) and starting docker images..."
	docker compose -f docker-compose.dev.yml up --build -d frontend
	@echo "Docker images built and started!"

## down_frontend: stops the frontend service
down_frontend:
	@echo "Stopping frontend service..."
	docker compose -f docker-compose.dev.yml down frontend
	@echo "Frontend service stopped!"



#################################

###### Nginx Service ######
## up_build_nginx: stops docker compose (if running), builds projects and starts docker compose
up_build_nginx:
	@echo "Stopping docker images (if running...)"
	docker compose -f docker-compose.dev.yml down nginx
	@echo "Building (when required) and starting docker images..."
	docker compose -f docker-compose.dev.yml up --build -d nginx
	@echo "Docker images built and started!"



## down_nginx : stops the nginx service
down_nginx:
	@echo "Stopping nginx service..."
	docker compose -f docker-compose.dev.yml down nginx
	@echo "Nginx service stopped!"

## down: stops all containers
down:
	@echo "Stopping Docker images..."
	docker compose -f docker-compose.dev.yml down
	@echo "Docker images stopped!"
