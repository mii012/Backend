var express = require('express');
var borrowsRouter = express.Router();
var borrowsController = require('../controllers/borrowsController.js');

// Einlesen der Ausleihvorgänge aus der JSON-Datei
var fs = require('fs');
var data = fs.readFileSync('models/borrows.json'); 

borrowsRouter.route('/') 
  .get(borrowsController.getAllBorrows)     // Alle Ausleihvorgänge abrufen
  .post(borrowsController.createBorrow);    // Neuen Ausleihvorgang erstellen
  
borrowsRouter.route('/:id')
  .get(borrowsController.getSpecificBorrow) // Einzelnen Ausleihvorgang abrufen
  .put(borrowsController.updateBorrow)      // Ausleihvorgang aktualisieren
  .delete(borrowsController.deleteBorrow);  // Ausleihvorgang löschen

// Export des Routers, damit er verwendet werden kann
module.exports = borrowsRouter;