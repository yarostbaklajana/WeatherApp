#!/bin/bash

set -o errexit #abort if any command fails

mkdir build
cd build
git clone https://yarostbaklajana:$GH_TOKEN@github.com/yarostbaklajana/WeatherApp.git .
git checkout gh-pages

