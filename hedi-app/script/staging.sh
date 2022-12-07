#!/bin/bash

build() {
  echo ">>> enable staging configuration"
  cp -rf .env.staging .env.local
  rm .env.production
  rm -rf .next
  yarn build
  git checkout .env.local
  git checkout .env.production
}

upload() {
  echo ">>> synchronizing config files"
  rsync -ptvz \
  .env .env.staging \
  next.config.js .ie11-babelrc \
  package.json yarn.lock \
  docker-compose.staging.yaml \
  root@cms.projekt-hedi.de:/root/aidminutes/hedi-app
  echo ">>> rename remote env file"
  ssh root@cms.projekt-hedi.de cp aidminutes/hedi-app/.env.staging aidminutes/hedi-app/.env.local
  echo ">>> rename remote babel file"
  ssh root@cms.projekt-hedi.de cp aidminutes/hedi-app/.ie11-babelrc aidminutes/hedi-app/.babelrc
  echo ">>> synchronizing data"
  rsync -az --no-o --no-g  --progress .next root@cms.projekt-hedi.de:/root/aidminutes/hedi-app
  rsync -az --no-o --no-g  --progress public root@cms.projekt-hedi.de:/root/aidminutes/hedi-app
}

docker_down() {
  echo ">>> staging HEDI_APP down"
  ssh root@cms.projekt-hedi.de "cd aidminutes/hedi-app && docker-compose -f docker-compose.staging.yaml down"
}

docker_up() {
  echo ">>> staging HEDI_APP up -d"
  ssh root@cms.projekt-hedi.de "cd aidminutes/hedi-app && docker-compose -f docker-compose.staging.yaml up -d"
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
