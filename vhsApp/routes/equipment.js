var express = require('express');
var equipRouter = express.Router();
var equipController = require('../controllers/equipController.js');

// Einlesen der Ausleihartikel aus der JSON-Datei
var fs = require('fs');
var data = fs.readFileSync('models/equipment.json'); 

equipRouter.route('/') 
  .get(equipController.getAllArticles)      // Alle Ausleihartikel abrufen
  .post(equipController.createArticle);     // Neuen Ausleihartikel erstellen
  
equipRouter.route('/:id')
  .get(equipController.getSpecificArticle)  // Einzelnen Ausleihartikel abrufen
  .put(equipController.updateArticle)       // Ausleihartikel aktualisieren
  .delete(equipController.deleteArticle);   // Ausleihartikel löschen

// Export des Routers, damit er verwendet werden kann
module.exports = equipRouter;