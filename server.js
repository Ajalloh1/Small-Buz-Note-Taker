const express = require('express');
const path = require('path');
const fs = require('fs');
// Added a helper to generage unique IDs for the notes
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();