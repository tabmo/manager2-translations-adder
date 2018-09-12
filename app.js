'use strict'

const fs = require('fs');
const sortJson = require('sort-json');
const inquirer = require('inquirer');

const options = { ignoreCase: true, reverse: false, depth: 1 };

const translationFilesLocation = '/Users/simon/Documents/Projets/manager-front-app/src/assets/i18n'; // Change your translations files location here


let dataFr = JSON.parse(fs.readFileSync(`${translationFilesLocation}/fr.json`))
let dataEn = JSON.parse(fs.readFileSync(`${translationFilesLocation}/en.json`))

const promptUser = [
  {
    type: 'input',
    name: 'key',
    message: 'Translation key'
  },
  {
    type: 'input',
    name: 'en',
    message: 'English translation'
  },
  {
    type: 'input',
    name: 'fr',
    message: 'French translation'
  }
]

const askTranslation = () => {
  inquirer.prompt(promptUser).then((res) => {
    const key = res['key'];
    dataFr[key] = res['fr'];
    dataEn[key] = res['en'];

    fs.writeFileSync(`${translationFilesLocation}/fr.json`, JSON.stringify(dataFr));
    fs.writeFileSync(`${translationFilesLocation}/en.json`, JSON.stringify(dataEn));
    sortJson.overwrite([`${translationFilesLocation}/fr.json`, `${translationFilesLocation}/en.json`]);
    console.log('>>> Translation added!');
    askTranslation();
  })
};
askTranslation();
