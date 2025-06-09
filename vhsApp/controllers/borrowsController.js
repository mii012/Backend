var fs = require('fs');
var data = fs.readFileSync('models/borrows.json');

let borrows;
if (data.length > 0) {
    borrows = JSON.parse(data);
} else {
    borrows = [];
}


// Alle Ausleihvorgänge abrufen
const getAllBorrows = (req, res) => {
    return res.json(borrows);
}

// Neuen Ausleihvorgang erstellen
const createBorrow = (req, res) => {
    let newBorrow = {
        id: borrows.length ? borrows[borrows.length - 1].id + 1 : 1,
        Benutzerid: req.body.Benutzerid,
        Startdatum: new Date().toString(),
        Enddatum: req.body.Enddatum,
        Ausleihartikelids: req.body.Ausleihartikelids
    }
    
    // Ausleihvorgang zur Liste hinzufügen und JSON-Datei aktualisieren
    borrows.push(newBorrow);
    let dataBorrows = JSON.stringify(borrows);
    fs.writeFileSync('models/borrows.json', dataBorrows);
    return res.status(201).json(borrows);
}

// Spezifischen Ausleihvorgang abrufen
const getSpecificBorrow = (req, res) => {
    let id = req.params.id;
    let obj = borrows.find(element => element.id == id);
    if (obj) {
        res.status(200).json(obj);
    } else {
        res.status(404).send("Borrow does not exist");
    }
}


// Hilfsfunktion zum Erstellen eines neuen Ausleihvorgangs
const createBorrow2 = (id, updateInfo) => {
    return { id, ...updateInfo };
}

// Ausleihvorgang aktualisieren
const updateBorrow = (req, res) => {
    let id = parseInt(req.params.id);
    let updateInfo = req.body; 
    let borrowIndex = borrows.findIndex(element => element.id === id); 
    if (borrowIndex !== -1) {
        // Bestehenden Ausleihvorgang aktualisieren
        borrows[borrowIndex] = { ...borrows[borrowIndex], ...updateInfo }; 
        res.status(200).json(borrows[borrowIndex]); 
    } else {
        // Neuen Ausleihvorgang erstellen, wenn die ID nicht gefunden wird
        const newBorrow = createBorrow2(id, updateInfo);
        borrows.push(newBorrow);
        res.status(201).json(newBorrow); 
    }
}

// Ausleihvorgang löschen
const deleteBorrow = (req, res) => {
    let id = parseInt(req.params.id);
    let borrowIndex = borrows.findIndex(element => element.id === id); 
    if (borrowIndex !== -1) {
        // Ausleihvorgang aus der Liste entfernen
        borrows.splice(borrowIndex, 1); 
        res.status(200).json(borrows); 
    } else {
        res.status(404).send({ error: 'Borrow not found' }); 
    }
}


module.exports = {
    getAllBorrows,
    createBorrow,
    getSpecificBorrow,
    updateBorrow,
    deleteBorrow
}