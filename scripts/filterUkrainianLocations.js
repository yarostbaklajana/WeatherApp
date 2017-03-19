'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const endOfLine = os.EOL;
const locationsDirectory = path.join(__dirname, '../locations');

const pathToFile = path.join(locationsDirectory, 'city.list.json');
const allLocationsString = fs.readFileSync(pathToFile, { encoding: 'utf8' });

const allLocationsArr = allLocationsString.split(endOfLine).filter((entry) => entry !== '');
const allLocationsValidString = allLocationsArr.join(',');
const allLocations = JSON.parse(`[${allLocationsArr}]`);

let uniqueUALocationsMap = {};
const allUALocations = allLocations
    .filter((location) => location.country === 'UA')
    .forEach(function(location) {
        uniqueUALocationsMap[location.name] = location._id;
    });

const allUALocationsString = JSON.stringify(uniqueUALocationsMap);

const outputPath = path.join(locationsDirectory, 'ukraine.json');
fs.writeFileSync(outputPath, allUALocationsString);
