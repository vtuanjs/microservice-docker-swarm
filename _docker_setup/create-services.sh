#!/bin/bash

array=('/api-gateway/'
  '/user-manager'
  '/product-manager'
)

# Go to the root
cd ..

for ((i = 0; i < ${#array[@]}; ++i)); do
  # we go to each folder
  cd ./_docker_setup/deploy/${array[$i]}

  # we create or recreate our image
  ./deploy.sh

  # and we go back to the root again :D
  cd -
done

echo "---> Success start all services"
