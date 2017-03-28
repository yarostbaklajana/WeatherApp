#!/bin/bash

set -o errexit #abort if any command fails

mkdir build
cd build
git clone https://github.com/yarostbaklajana/WeatherApp.git
git show-ref
git checkout origin/gh-pages
rm -type f
rm !(.git) -type c
