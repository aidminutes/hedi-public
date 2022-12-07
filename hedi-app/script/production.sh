#!/bin/bash

build() {
  echo ">>> enable production configuration"
  cp -rf .env.production .env.local
  rm -rf .next
  rm public/robots.txt
  yarn build
  git checkout .env.local
  git checkout public/robots.txt
}

upload() {
  echo ">>> synchronizing config files"
  rsync -ptvz \
  .env .env.production \
  next.config.js .ie11-babelrc \
  package.json yarn.lock \
  docker-compose.production.yaml \
  root@hedi.app:/root/hedi/hedi-app
  echo ">>> rename env file"
  ssh root@hedi.app cp hedi/hedi-app/.env.production hedi/hedi-app/.env.local
  echo ">>> rename remote babel file"
  ssh root@hedi.app cp hedi/hedi-app/.ie11-babelrc hedi/hedi-app/.babelrc
  echo ">>> synchronizing data"
  rsync -az --no-o --no-g  --progress .next root@hedi.app:/root/hedi/hedi-app
  rsync -az --no-o --no-g  --progress public root@hedi.app:/root/hedi/hedi-app
}

docker_down() {
  echo ">>> production HEDI_APP down"
  ssh root@hedi.app "cd hedi/hedi-app && docker-compose -f docker-compose.production.yaml down"
}

docker_up() {
  echo ">>> production HEDI_APP up -d"
  ssh root@hedi.app "cd hedi/hedi-app && docker-compose -f docker-compose.production.yaml up -d"
}

skip_build() {
  docker_down
  upload
  docker_up
}

true() {
  build
  skip_build
}

while [[ $# -gt 0 ]]; do
  $1
  shift
done
