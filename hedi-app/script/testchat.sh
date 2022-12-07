#!/bin/bash

build() {
  echo ">>> enable testchat configuration"
  cp -rf .env.testchat .env.local
  rm .env.production
  rm -rf .next
  yarn build
  git checkout .env.local
  git checkout .env.production
}

upload() {
  echo ">>> synchronizing config files"
  rsync -ptvz \
  .env .env.testchat \
  next.config.js .ie11-babelrc \
  package.json yarn.lock \
  docker-compose.testchat.yaml \
  root@cms.projekt-hedi.de:/root/aidminutes/hedi-app-testchat
  echo ">>> rename remote env file"
  ssh root@cms.projekt-hedi.de cp aidminutes/hedi-app-testchat/.env.testchat aidminutes/hedi-app-testchat/.env.local
  echo ">>> rename remote babel file"
  ssh root@cms.projekt-hedi.de cp aidminutes/hedi-app-testchat/.ie11-babelrc aidminutes/hedi-app-testchat/.babelrc
  echo ">>> synchronizing data"
  rsync -az --no-o --no-g  --progress .next root@cms.projekt-hedi.de:/root/aidminutes/hedi-app-testchat
  rsync -az --no-o --no-g  --progress public root@cms.projekt-hedi.de:/root/aidminutes/hedi-app-testchat
}

docker_down() {
  echo ">>> testchat HEDI_APP down"
  ssh root@cms.projekt-hedi.de "cd aidminutes/hedi-app-testchat && docker-compose -f docker-compose.testchat.yaml down"
}

docker_up() {
  echo ">>> testchat HEDI_APP up -d"
  ssh root@cms.projekt-hedi.de "cd aidminutes/hedi-app-testchat && docker-compose -f docker-compose.testchat.yaml up -d"
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
