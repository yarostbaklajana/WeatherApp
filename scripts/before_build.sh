#!/bin/bash

set -o errexit #abort if any command fails

mkdir build
cd build
git clone https://github.com/yarostbaklajana/WeatherApp.git
git show-ref
git checkout -t -b gh-pages origin/gh-pages
rm -type f
rm !(.git) -type c
