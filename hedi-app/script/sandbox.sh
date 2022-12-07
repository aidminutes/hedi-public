#!/bin/bash

build() {
  echo ">>> enable sandbox configuration"
  cp -rf .env.sandbox .env.local
  rm .env.production
  rm -rf .next
  # not yarn build: skips checkout on main, no playground removal
  node -e 'require("./src/tasks/preBuild/enableBabelForPolyfills")()'
  yarn compileCSS
  yarn next build --debug
  node -e 'require("./src/tasks/postBuild/disableBabelForPolyfills")()'
  git checkout .env.local
  git checkout .env.production
}

upload() {
  echo ">>> synchronizing config files"
  rsync -ptvz \
  .env .env.sandbox \
  next.config.js .ie11-babelrc \
  package.json yarn.lock \
  docker-compose.sandbox.yaml \
  root@cms.projekt-hedi.de:/root/aidminutes/hedi-app-sandbox
  echo ">>> rename remote env file"
  ssh root@cms.projekt-hedi.de cp aidminutes/hedi-app-sandbox/.env.sandbox aidminutes/hedi-app-sandbox/.env.local
  echo ">>> rename remote babel file"
  ssh root@cms.projekt-hedi.de cp aidminutes/hedi-app-sandbox/.ie11-babelrc aidminutes/hedi-app-sandbox/.babelrc
  echo ">>> synchronizing data"
  rsync -az --no-o --no-g --progress .next root@cms.projekt-hedi.de:/root/aidminutes/hedi-app-sandbox
  rsync -az --no-o --no-g --progress public root@cms.projekt-hedi.de:/root/aidminutes/hedi-app-sandbox
}

docker_down() {
  echo ">>> sandbox HEDI_APP down"
  ssh root@cms.projekt-hedi.de "cd aidminutes/hedi-app-sandbox && docker-compose -f docker-compose.sandbox.yaml down"
}

docker_up() {
  echo ">>> sandbox HEDI_APP up -d"
  ssh root@cms.projekt-hedi.de "cd aidminutes/hedi-app-sandbox && docker-compose -f docker-compose.sandbox.yaml up -d"
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
