#!/bin/bash

env() {
  echo ">>> switch env file to offline"
  cp -rf .env.local.offline .env.local
}

dev() {
  ./script/common.sh update
  env
  yarn dev
}

view() {
  ./script/common.sh update
  env
  yarn view
}

true() {
  ./script/common.sh update
  env
  yarn build
  yarn start
}

while [[ $# -gt 0 ]]; do
  $1
  shift
done
