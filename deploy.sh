#!/usr/bin/env bash 
CURRENT_INSTANCE=$(docker ps -a -q --filter ancestor="$IMAGE_NAME" --format="{{.ID}}")
if [ "$CURRENT_INSTANCE" ]
then
  docker rm $(docker stop $CURRENT_INSTANCE)
fi

docker pull $IMAGE_NAME:$IMAGE_TAG

CONTAINER_EXISTS=$(docker ps -a | grep $CONTAINER_NAME)
if [ "$CONTAINER_EXISTS" ] 
then
  docker rm $CONTAINER_NAME
fi

docker create -p $PUBLIC_PORT:$INTERNAL_PORT --name $CONTAINER_NAME $IMAGE_NAME:$IMAGE_TAG

rm .env
touch .env
echo "AUTH0_DOMAIN=$AUTH0_DOMAIN" | tee -a .env
echo "AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID" | tee -a .env
echo "AUTH0_AUDIENCE=$AUTH0_AUDIENCE" | tee -a .env
echo "AUTH0_CALLBACK_URL=$AUTH0_CALLBACK_URL" | tee -a .env
echo "API_SERVER_URL=$API_SERVER_URL" | tee -a .env
docker cp .env $CONTAINER_NAME:/app/.env
#TODO: remove .env

docker start $CONTAINER_NAME
