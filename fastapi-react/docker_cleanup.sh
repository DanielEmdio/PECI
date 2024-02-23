#!/usr/bin/env bash

set -x

# this will remove all containers, images and volumes present in docker
sudo docker stop $(sudo docker ps -a -q)
sudo docker rm $(sudo docker ps -a -q)
sudo docker rmi $(sudo docker images -a -q)
sudo docker volume rm $(sudo docker volume ls -q)

# sudo docker system prune -a
