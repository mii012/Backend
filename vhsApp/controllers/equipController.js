var fs = require('fs');
var data = fs.readFileSync('models/equipment.json');

let articles;
if (data.length > 0) {
    articles = JSON.parse(data);
} else {
    articles = [];
}


// Alle Ausleihartikel abrufen
const getAllArticles = (req, res) => {
    return res.json(articles);
}

// Neuen Ausleihartikel erstellen
const createArticle = (req, res) => {
    let newArticle = {
        id: articles.length ? articles[articles.length - 1].id + 1 : 1,
        Artikelnummer: req.body.Artikelnummer,
        Titel: req.body.Titel,
        Bild: req.body.Bild,
        Beschreibung: req.body.Beschreibung,
        Anzahl: req.body.Anzahl,
        Benutzerid: req.body.Benutzerid
    }
    
    // Ausleihartikel zur Liste hinzufügen und JSON-Datei aktualisieren
    articles.push(newArticle);
    let dataArticle = JSON.stringify(articles);
    fs.writeFileSync('models/equipment.json', dataArticle);
    return res.status(201).json(articles);
}

// Spezifischen Ausleihartikel abrufen
const getSpecificArticle = (req, res) => {
    let id = req.params.id;
    let obj = articles.find(element => element.id == id);
    if (obj) {
        res.status(200).json(obj);
    } else {
        res.status(404).send("Article does not exist");
    }
}


// Hilfsfunktion zum Erstellen eines neuen Ausleihartikels
const createArticle2 = (id, updateInfo) => {
    return { id, ...updateInfo };
}

// Ausleihartikel aktualisieren
const updateArticle = (req, res) => {
    let id = parseInt(req.params.id);
    let updateInfo = req.body;
    let articleIndex = articles.findIndex(element => element.id === id); 
    if (articleIndex !== -1) {
        // Bestehenden Ausleihartikel aktualisieren
        articles[articleIndex] = { ...articles[articleIndex], ...updateInfo };
        res.status(200).json(articles[articleIndex]); 
    } else {
        // Neuen Ausleihartikel erstellen, wenn die ID nicht gefunden wird
        const newArticle = createArticle2(id, updateInfo);
        articles.push(newArticle);
        res.status(201).json(newArticle); 
    }
}

// Ausleihartikel löschen
const deleteArticle = (req, res) => {
    let id = parseInt(req.params.id);
    let articleIndex = articles.findIndex(element => element.id === id); 
    if (articleIndex !== -1) {
        // Ausleihartikel aus der Liste entfernen
        articles.splice(articleIndex, 1); 
        res.status(200).json(articles); 
    } else {
        res.status(404).send({ error: 'Article not found' }); 
    }
}


module.exports = {
    getAllArticles,
    createArticle,
    getSpecificArticle,
    updateArticle,
    deleteArticle
}