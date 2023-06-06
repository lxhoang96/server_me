#!/bin/sh

# run all microservices and api gateway

cd ..
cd microservices/
echo "Start services "

for folder in */;

do
  #setwd(folder)
  echo "Start service $folder "
  (cd "$folder" && npm run start )
done
cd ..
cd api_gateway/
npm run start