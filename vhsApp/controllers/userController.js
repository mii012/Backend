var fs = require('fs');
var data = fs.readFileSync('models/users.json');

let users;
if (data.length > 0) {
    users = JSON.parse(data);
} else {
    users = [];
}


// Alle Benutzer abrufen
const getAllUsers = (req, res) => {
    return res.json(users);
}

// Neuen Benutzer erstellen
const createUser = (req, res) => {
    let newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        Name: req.body.Name,
        Email: req.body.Email,
        Rolle: req.body.Rolle,
        Passwort: req.body.Passwort,
        Erstellungsdatum: new Date().toString(),
    }
    
    // Benutzer zur Liste hinzufügen und JSON-Datei aktualisieren
    users.push(newUser);
    let dataUser = JSON.stringify(users);
    fs.writeFileSync('models/users.json', dataUser);
    return res.status(201).json(users);
}

// Spezifischen Benutzer abrufen
const getSpecificUser = (req, res) => {
    let id = req.params.id;
    let obj = users.find(element => element.id == id);
    if (obj) {
        res.status(200).json(obj);
    } else {
        res.status(404).send("User does not exist");
    }
}


// Hilfsfunktion zum Erstellen eines neuen Benutzers
const createUser2 = (id, updateInfo) => {
    return { id, ...updateInfo };
}

// Benutzer aktualisieren
const updateUser = (req, res) => {
    let id = parseInt(req.params.id);
    let updateInfo = req.body; 
    let userIndex = users.findIndex(element => element.id === id); 
    if (userIndex !== -1) {
        // Bestehenden Benutzer aktualisieren
        users[userIndex] = { ...users[userIndex], ...updateInfo };
        res.status(200).json(users[userIndex]); 
    } else {
        // Neuen Benutzer erstellen, wenn die ID nicht gefunden wird
        const newUser = createUser2(id, updateInfo);
        users.push(newUser);
        res.status(201).json(newUser); 
    }
}

// Benutzer löschen
const deleteUser = (req, res) => {
    let id = parseInt(req.params.id);
    let userIndex = users.findIndex(element => element.id === id); 
    if (userIndex !== -1) {
        // Benutzer aus der Liste entfernen
        users.splice(userIndex, 1); 
        res.status(200).json(users); 
        
    } else {
        res.status(404).send({ error: 'User not found' });
    }
}


module.exports = {
    getAllUsers,
    createUser,
    getSpecificUser,
    updateUser,
    deleteUser
}