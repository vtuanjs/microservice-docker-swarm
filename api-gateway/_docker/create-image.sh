#!/usr/bin/env bash

# we get the name of our image
SERVICE='api-gateway'

# we delete the image if it exists already
docker rmi vtuanjs/$SERVICE

# we create or recreate our image
docker-compose build $SERVICE

# we publish our image to our docker hub account
docker push vtuanjs/$SERVICE:latest

# we delete our local image because we are not going to need it
# and mantain clean our environment
docker rmi vtuanjs/$SERVICE

echo "---> Success create, push image vtuanjs/$SERVICE to docker hub and delete local image"
