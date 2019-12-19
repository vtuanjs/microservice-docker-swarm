#!/usr/bin/env bash
eval `docker-machine env manager1`

docker stack deploy \
--compose-file docker-compose.yml \
api-gateway
