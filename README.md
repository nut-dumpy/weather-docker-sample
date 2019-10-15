# Weather app built with React (Next.js for server-rendering) and prepared to be deployed with docker

## How-to

Before creating docker images prepare [weatherstack.com](weatherstack.com) API key and place it in `server/.env`
1. Build all images:
	- `docker image build -t weather-frontend:latest app`
	- `docker image build -t weather-api:latest server`
	- `docker image build -t weather-web:latest nginx`
2. Prepare shared bridge network (or use *link*s):
	- `docker network create weather`
3. Run Node containers through shared network:
	- `docker run --network weather --name weather-front -d weather-frontend`
	- `docker run --network weather --name weather-api -d weather-api`
4. Run Nginx web server through shared network and bind port:
	- `docker run --network weather --name weather-web -d -p 80:80 weather-web`
5. Open [http://localhost:80](http://localhost:80)

Or just use docker-composer via `docker-compose up [-d]`.
