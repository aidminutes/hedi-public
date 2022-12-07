#!/bin/bash

update() {
  echo ">>> update repository"
  git reset --hard HEAD
  git checkout main
  git pull
}

while [[ $# -gt 0 ]]; do
  $1
  shift
done