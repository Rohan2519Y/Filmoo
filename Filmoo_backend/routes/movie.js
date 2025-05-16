var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.post('/insert_movies', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'screenshot', maxCount: 100 }]), function (req, res, next) {
    try {
        // Handle image (single file)
        const image = req.files['image'] ? req.files['image'][0].filename : '';

        // Handle screenshots (multiple files)
        let screenshots = [];
        if (req.files['screenshot']) {
            screenshots = req.files['screenshot'].map(file => file.filename);
        }
        const screenshotString = screenshots.join(', '); // Convert array to comma-separated string

        pool.query(
            'INSERT INTO movie (categoryid, name, language, year, image, screenshot, genre, description, quality,link480p, link720p, link1080p, link4k, size480p, size720p, size1080p, size4k) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
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
                req.body.link480p || null,
                req.body.link720p || null,
                req.body.link1080p || null,
                req.body.link4k || null,
                req.body.size480p || null,
                req.body.size720p || null,
                req.body.size1080p || null,
                req.body.size4k || null
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

router.get('/fetch_movies', function (req, res, next) {
    try {
        pool.query('select C.*,M.* from category C,movie M where C.categoryid=M.categoryid', function (error, result) {
            if (error) {
                res.status(200).json({ status: false, message: 'Database Error,Pls Contact Backend Team' })
            }
            else {
                res.status(200).json({ status: true, message: 'Success..', data: result })
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' })
    }
})

router.post('/edit_movies', function (req, res, next) {
    try {
        pool.query(
            `UPDATE movie SET 
                categoryid = ?, 
                name = ?, 
                language = ?, 
                year = ?, 
                genre = ?, 
                description = ?, 
                quality = ?, 
                link480p = ?, 
                link720p = ?, 
                link1080p = ?, 
                link4k = ?, 
                size480p = ?, 
                size720p = ?, 
                size1080p = ?, 
                size4k = ? 
            WHERE movieid = ?`,
            [
                req.body.categoryid,
                req.body.name,
                req.body.language.join(', '),
                req.body.year,
                req.body.genre.join(', '),
                req.body.description,
                req.body.quality,
                req.body.link480p,
                req.body.link720p,
                req.body.link1080p,
                req.body.link4k,
                req.body.size480p,
                req.body.size720p,
                req.body.size1080p,
                req.body.size4k,
                req.body.movieid
            ], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(200).json({ status: false, message: 'Database Error,Pls Contact Backend Team' })
                }
                else {
                    console.log(result)
                    res.status(200).json({ status: true, message: 'Movie Updated Successfully..' })
                }
            })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' })
    }
});

router.post('/update_icon', upload.single('image'), function (req, res, next) {
    try {
        pool.query("update movie set image=? where movieid=?", [req.file.filename, req.body.movieid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Database Error,Pls Contact Backend Team' })
            }
            else {
                res.status(200).json({ status: true, message: 'Movie Icon Updated Successfully..' })
            }
        })
    }
    catch (e) {
        console.log("EE", error)
        res.status(200).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' })
    }
});

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/screenshots/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

router.post('/update_screenshots', upload.array('screenshots'), async (req, res) => {
    try {
        if (!req.body.movieid) {
            return res.status(400).json({
                status: false,
                message: 'Movie ID is required'
            });
        }
        const newFiles = req.files?.map(file => file.filename) || [];
        const existingFiles = req.body.existingScreenshots?.split(',')?.filter(Boolean) || [];
        const allScreenshots = [...existingFiles, ...newFiles];
        if (allScreenshots.length === 0) {
            return res.status(400).json({
                status: false,
                message: 'No screenshots provided'
            });
        }
        pool.query(
            'UPDATE movie SET screenshot = ? WHERE movieid = ?',
            [allScreenshots.join(','), req.body.movieid],
            (error, result) => {
                if (error) {
                    console.error('Database error:', error);
                    req.files?.forEach(file => {
                        fs.unlinkSync(path.join('uploads/screenshots/', file.filename));
                    });
                    return res.status(500).json({
                        status: false,
                        message: 'Database error'
                    });
                }
                res.json({
                    status: true,
                    message: 'Screenshots updated',
                    screenshots: allScreenshots
                });
            }
        );
    } catch (e) {
        console.error('Server error:', e);
        res.status(500).json({
            status: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;