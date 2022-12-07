#!/bin/bash

env() {
  echo ">>> switch env file to local online"
  cp -rf .env.local.online .env.local
}

dev() {
  ./script/common.sh update
  env
  yarn dev
}

build() {
  ./script/common.sh update
  env
  yarn build
  yarn start
}

true() {
  ./script/common.sh update
  env
  yarn view
}

while [[ $# -gt 0 ]]; do
  $1
  shift
done
