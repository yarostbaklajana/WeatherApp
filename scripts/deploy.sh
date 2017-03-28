#!/bin/bash

set -o errexit #abort if any command fails

# config
git config --global user.email "travis"
git config --global user.name "travis CI deploy"

# deploy
cd build
pwd
git status
git add --all .
git status
git commit -m "Deployed to Github Pages. Build number: $TRAVIS_JOB_NUMBER"
git push --quiet 
echo "Successfully pushed changes to GitHub Pages"