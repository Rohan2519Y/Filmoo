var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.post('/insert_movies', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'screenshot', maxCount: 10 }]), function (req, res, next) {
    try {
        // Handle image (single file)
        const image = req.files['image'] ? req.files['image'][0].filename : '';
        
        // Handle screenshots (multiple files)
        let screenshots = [];
        if (req.files['screenshot']) {
            screenshots = req.files['screenshot'].map(file => file.filename);
        }
        const screenshotString = screenshots.join(','); // Convert array to comma-separated string

        pool.query(
            'INSERT INTO movie (categoryid, name, language, year, image, screenshot, genre, description, quality, link, size) VALUES (?,?,?,?,?,?,?,?,?,?,?)', 
            [
                req.body.categoryid, 
                req.body.name, 
                req.body.language, 
                req.body.year, 
                image, 
                screenshotString, 
                req.body.genre, 
                req.body.description, 
                req.body.quality, 
                req.body.link, 
                req.body.size
            ], 
            function (error, result) {
                if (error) {
                    console.error('Database Error:', error);
                    return res.status(500).json({ status: false, message: 'Database Error, Please Contact Backend Team' });
                }
                res.status(200).json({ status: true, message: 'Movie Added Successfully' });
            }
        );
    }
    catch (e) {
        console.error('Critical Error:', e);
        res.status(500).json({ status: false, message: 'Critical Error, Please Contact Server Administrator' });
    }
});

module.exports = router;