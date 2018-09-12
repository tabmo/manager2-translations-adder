# Manager2 Translations Adder

Ce script Node.js permet d'ajouter automatiquement des traductions dans les fichiers `en.json` et `fr.json` et se charge également de les trier par ordre alphabétique.

Il y a également une gestion des doublons qui demande confirmation avant d'écraser la clé déjà existante.

## Installation

- Cloner ce repository
- `npm install`
- Ouvrir le fichier `app.js` et modifier la variable `translationFilesLocation` par votre path menant vers les fichiers `fr.json` et `en.json`
- `node app.js` pour lancer l'application

L'appli se lance, il ne reste plus qu'à entrer les clés de traductions :

![Prévisualisation](https://image.ibb.co/nf9ch9/Capture_d_e_cran_2018_09_12_a_13_19_38.png)
