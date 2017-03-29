#!/bin/bash

set -o errexit #abort if any command fails

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" == "gh-pages" ]
then 
    echo "Skipping a pre-deployment with the script provider because the current build is a pull request or gh-pages."
else 
    mkdir build
    cd build
    git clone https://yarostbaklajana:$GH_TOKEN@github.com/yarostbaklajana/WeatherApp.git .
    git checkout gh-pages
    ls | grep -v .git | grep -v CNAME | xargs rm -rf
    cd ..
fi