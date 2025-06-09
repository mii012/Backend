var express = require('express');
var usersRouter = express.Router();
var userController = require('../controllers/userController.js');

// Einlesen der Benutzerinformationen aus der JSON-Datei
var fs = require('fs');
var data = fs.readFileSync('models/users.json'); 

usersRouter.route('/') 
  .get(userController.getAllUsers)        // Alle Benutzer abrufen
  .post(userController.createUser);       // Neuen Benutzer erstellen
  
usersRouter.route('/:id')
  .get(userController.getSpecificUser)    // Einzelnen Benutzer abrufen
  .put(userController.updateUser)         // Benutzer aktualisieren
  .delete(userController.deleteUser);     // Benutzer löschen

// Export des Routers, damit er verwendet werden kann
module.exports = usersRouter;