const express = require('express');
const fs = require('fs');
//adding a unique id generator for the notes//
const uuid = require('uuid');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/',htmlRoutes);
app.listen(process.env.PORT || PORT, 
	() => console.log(`The server is running at http://localhost:${PORT}.`));