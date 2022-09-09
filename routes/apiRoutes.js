const router = require('express').Router();
// const dbNote = require('../db/db.json');
const fs = require('fs');
const path = require('path');
const { v1: uuidv1 } = require('uuid');

// calling of api functions//
router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', function (error, data) {
        if (error) {
            return console.log(error)
        }
        console.log("This is Notes", data)
        res.json(JSON.parse(data))
    })
});

router.post('/notes', (req, res) => {
    const { title, text } = req.body;

    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        // This parses the json file to a string

        const notes = JSON.parse(data.toString());

        notes.push({
            id: uuidv1(),
            title,
            text
        });

        // This will log the json object
        console.log(notes);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), function (error, data) {
            if (error) {
                return error
            }
            console.log(notes)
            res.json(notes);
        })

    });
});

router.delete("/notes/:id", function (req, res) {

    const noteId = req.params.id

    fs.readFile(__dirname + "/db/db.json", 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        // This will parse the JSON object
        const notes = JSON.parse(data.toString());

        const index = notes.findIndex(x => x.id === noteId);

        if (index !== undefined) notes.splice(index, 1);

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
            if (error) {
                return error
            }
            console.log(notes)
            res.json(notes);
        })

    });

});
module.exports = router;