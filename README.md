# START PROJECT FOR TESTING(FULLY DOCKERIZED):

NOTE THAT client/cypress.json should point to dockerized client through dockerized nginx: `"baseUrl": "http://localhost:8080"`
NOTE THAT taxi-server in docker-compose.local.yml should point to test.env file for testing with cypress

- `~$ git clone https://github.com/jonndoe/taxi-app.git`

- `~$ cd taxi-app`

- `~/taxi-app$ sudo docker-compose -f docker-compose.local.yml up --build`

- `~/taxi-app$ sudo docker-compose -f docker-compose.local.yml exec taxi-server python taxi/manage.py migrate`

- `~/taxi-app$ sudo docker-compose -f docker-compose.local.yml exec taxi-server python taxi/manage.py test trips.tests`

- `~/taxi-app$ cd client/`

- `~/taxi-app/client$ npx cypress open`







# START PROJECT FOR DEVELOPMENT( with dockerized postgres and dockerized redis ):

NOTE THAT client/cypress.json should point to NOT dockerized client: `"baseUrl": "http://localhost:3000"`
NOTE THAT taxi-server in docker-compose.local.yml should point to test.env file for testing with cypress

- `~$ git clone https://github.com/jonndoe/taxi-app.git`

- `~$ cd taxi-app`

- `~/taxi-app$ sudo docker-compose -f docker-compose.postgres.redis.yml up`

- `~/taxi-app/server$ python manage.py migrate`

- `~/taxi-app/server$ python manage.py runserver`

- `~/taxi-app/client$ npm start`

- `~/taxi-app/client$ npx cypress open`

# SOME NOTES:
## RUNNING THE POSTGRES DATABASE LOCALLY ON DOCKER (EXAMPLE 1)
1. Install docker image postgres:11

2. Start a docker container with that postgres image.
    `$ sudo docker run --rm   --name pg-docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=somebase -e POSTGRES_USER=docker -p 5432:5432 -v $home/docker/volumes/postgres:/var/lib/postgresql/data  postgres:11`

3. Create a databe with name 'everycheese' in potgresql
    `$ createdb -h localhost --username=docker everycheese`


4. SET env variable directly to the system:
    `$ export DATABASE_URL=postgres://docker:docker@127.0.0.1:5432/everycheese`

5. $ `pip install -r requirements.txt`

6. $ `python manage.py migrate`

## RUNNING THE POSTGRES DATABASE LOCALLY ON DOCKER (EXAMPLE 2)

### SEE FOR REFFERENCE: https://docs.docker.com/engine/examples/postgresql_service/

1. Run docker-compose to up postgres and redis:

    `$ sudo docker-compose -f docker-compose.postgres.redis.yml up --build`
    
2. Connect to postgresql container to check if it works:

    `$ psql -h localhost -p 5432 -d docker -U docker --password`