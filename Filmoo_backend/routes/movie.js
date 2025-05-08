var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

router.post('/insert_movies',upload.single)