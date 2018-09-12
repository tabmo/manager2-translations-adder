'use strict'

const fs = require('fs')
const sortJson = require('sort-json')
const inquirer = require('inquirer')

const options = { ignoreCase: true, reverse: false, depth: 1 }

const translationFilesLocation = '/Users/simon/Documents/Projets/manager-front-app/src/assets/i18n' // Change your translations files location here


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
    const key = res['key']

    // Handle already existing key
    if (dataFr[key] || dataEn[key]) {
      inquirer.prompt([{
        type: 'confirm',
        name: 'confirmReplace',
        message: 'Key already exists in files. Replace?'
      }]).then(confirmRes => {
        if (confirmRes.confirmReplace) {
          addTranslationInFiles(key, res['en'], res['fr'])
        } else {
          askTranslation()
        }
      })
    }
    // Key doesn't exists in translations files
    else {
      addTranslationInFiles(key, res['en'], res['fr'])
    }

  })
}

const addTranslationInFiles = (key, enTranslation, frTranslation) => {
  dataEn[key] = enTranslation
  dataFr[key] = frTranslation
  fs.writeFileSync(`${translationFilesLocation}/fr.json`, JSON.stringify(dataFr))
  fs.writeFileSync(`${translationFilesLocation}/en.json`, JSON.stringify(dataEn))
  sortJson.overwrite([`${translationFilesLocation}/fr.json`, `${translationFilesLocation}/en.json`])
  console.log('>>> Translation added!')
  askTranslation()
}

// Init app
askTranslation()
