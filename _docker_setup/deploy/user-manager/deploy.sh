#!/bin/bash

# Copy config file to manager 1
docker-machine scp docker-compose.yml manager1:/home/docker/docker-compose.yml

docker-machine scp initdb.js manager1:/home/docker/initdb.js

docker-machine scp deploy.sh manager1:/home/docker/deploy.sh

# Connect manager and start service
docker-machine ssh manager1 \
env MONGO_INITDB_ROOT_USERNAME="root" \
env MONGO_INITDB_ROOT_PASSWORD="7zassddsdsd" \
env MONGODB_USER_NAME="user" \
env MONGODB_PASSWORD="1122asxcwaaaa" \
docker stack deploy \
--compose-file docker-compose.yml \
user
