const router = require('express').Router();
const dbNote = require('../db/db.json');

// calling of api functions//
app.get('/api/notes', (req, res) => {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
        if (error) {
          return console.log(error)
        }
        console.log("This is Notes", data)
        res.json(JSON.parse(data))
    })
});

app.post('/api/notes', (req, res) => { 
    const { title, text } = req.body;

    fs.readFile(__dirname + "/db/db.json", 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }

        // This parses the json file to a string
        
        const notes = JSON.parse(data.toString());

        notes.push({
            "id": uuid(),
            title, 
            text
        });
        
        // This will log the json object
        console.log(notes);
        
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
            if (error) {
              return error
            }
            console.log(notes)
            res.json(notes);
        })

    });
});

app.delete("/api/notes/:id", function (req, res) {
    
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