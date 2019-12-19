#!/usr/bin/env bash

eval $(docker-machine env manager1)

array=('./api-gateway/'
  './user-manager'
  './product-manager'
)

# we go to the root of the project
cd ..

for ((i = 0; i < ${#array[@]}; ++i)); do
  # we go to each folder
  cd ${array[$i]}/_docker

  # we create or recreate our image
  sh ./create-image.sh

  # and we go back to the root again :D
  cd -
done

echo "---> Success build all images"
