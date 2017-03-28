#!/bin/bash

set -o errexit #abort if any command fails
if [$TRAVIS_PULL_REQUEST != true || $TRAVIS_BRANCH != gh-pages]
then 
    mkdir build
    cd build
    git clone https://yarostbaklajana:$GH_TOKEN@github.com/yarostbaklajana/WeatherApp.git .
    git checkout gh-pages
    shopt -s extglob 
    rm -rf !(.git)
    cd ..
else 
    echo "Skipping a pre-deployment with the script provider because the current build is a pull request or gh-pages."