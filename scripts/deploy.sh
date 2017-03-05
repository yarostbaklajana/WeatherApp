#!/bin/bash

set -o errexit #abort if any command fails

REPO=https://yarostbaklajana:$GH_TOKEN@github.com/yarostbaklajana/WeatherApp.git


# config
git config --global user.email "travis"
git config --global user.name "travis CI deploy"

# deploy
cd build
git init
git add .
git commit -m "Deployed to Github Pages. Build number: $TRAVIS_JOB_NUMBER"
git push --force --quiet $REPO master:gh-pages 
echo "Successfully pushed changes to GitHub Pages"