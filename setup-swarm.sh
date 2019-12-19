#!/bin/bash

cd ./_docker_setup

./setup-machine.sh

./create-images.sh

./create-services.sh

./connect-network.sh