#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

yay -S nodejs-lts-fermium
yay -S npm
sudo npm install typescript -g
sudo npm install ts-node -g
