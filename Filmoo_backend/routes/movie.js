var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.post('/insert_movies', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'screenshot', maxCount: 100 }]), function (req, res, next) {
    try {
        // Handle file uploads
        const image = req.files['image'] ? req.files['image'][0].filename : '';
        const screenshots = req.files['screenshot'] ?
            req.files['screenshot'].map(file => file.filename) : [];
        const screenshotString = screenshots.join(', ');

        // Initialize variables
        let episodeData = null;
        let numberOfSeasons = null;
        let numberOfEpisodes = null;
        let zipValue = req.body.zip || null;

        // Handle series content
        if (req.body.content === 'series' && req.body.seasonsData) {
            const seasons = JSON.parse(req.body.seasonsData);

            // For series, use the first season's zip link matching the selected quality
            if (seasons.length > 0 && req.body.quality) {
                const firstSeason = seasons[0];
                if (firstSeason.zipLinks && firstSeason.zipLinks[req.body.quality]) {
                    zipValue = firstSeason.zipLinks[req.body.quality];
                }
            }

            episodeData = req.body.seasonsData;
            numberOfSeasons = req.body.numberOfSeasons;
            numberOfEpisodes = seasons.reduce((total, season) => total + (season.numberOfEpisodes || 0), 0);
        }
        // Handle movie content
        else if (req.body.eplinks) {
            episodeData = req.body.eplinks;
            numberOfEpisodes = req.body.numberep;
        }

        // Insert into database (same query structure as before)
        pool.query(
            'INSERT INTO movie (categoryid, name, language, year, image, screenshot, genre, description, quality, ' +
            'link480p, link720p, link1080p, link4k, size480p, size720p, size1080p, size4k, title, zip, eplinks, ' +
            'numberep, content, numberOfSeasons) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
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
                req.body.size4k || null,
                req.body.title,
                zipValue,
                episodeData,
                numberOfEpisodes,
                req.body.content || 'movie', // Default to 'movie' if not specified
                numberOfSeasons || null
            ],
            function (error, result) {
                if (error) {
                    console.error('Database Error:', error);
                    return res.status(200).json({ status: false, message: 'Database Error' });
                }
                res.status(200).json({ status: true, message: 'Content Added Successfully' });
            }
        );
    }
    catch (e) {
        console.error('Error:', e);
        res.status(500).json({ status: false, message: 'Server Error' });
    }
});

router.get('/fetch_movies', function (req, res, next) {
    try {
        pool.query('SELECT C.*, M.* FROM category C, movie M WHERE C.categoryid=M.categoryid', function (error, result) {
            if (error) {
                res.status(200).json({ status: false, message: 'Database Error, Please Contact Backend Team' });
            }
            else {
                // Process the result to parse episode data for series
                const processedResult = result.map(movie => {
                    if (movie.content === 'series' && movie.eplinks) {
                        try {
                            movie.seasonsData = JSON.parse(movie.eplinks);

                            // For backward compatibility, set the main zip link based on quality
                            if (movie.seasonsData && movie.seasonsData.length > 0) {
                                const firstSeason = movie.seasonsData[0];
                                if (firstSeason.zipLinks) {
                                    // Use the highest available quality zip link
                                    movie.zip = firstSeason.zipLinks['4K'] ||
                                        firstSeason.zipLinks['1080P'] ||
                                        firstSeason.zipLinks['720P'] ||
                                        firstSeason.zipLinks['480P'] ||
                                        movie.zip;
                                }
                            }
                        } catch (e) {
                            console.error('Error parsing seasons data for movie:', movie.movieid);
                            movie.seasonsData = null;
                        }
                    }
                    return movie;
                });
                res.status(200).json({ status: true, message: 'Success', data: processedResult });
            }
        });
    }
    catch (e) {
        console.error('Server Error:', e);
        res.status(500).json({ status: false, message: 'Critical Error, Please Contact Server Administrator' });
    }
});

router.post('/edit_movies', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'screenshot', maxCount: 100 }]), function (req, res, next) {
    try {
        // Handle image update
        const image = req.files['image'] ? req.files['image'][0].filename : req.body.existingImage;

        // Handle screenshots
        let screenshots = [];
        if (req.body.existingScreenshots) {
            screenshots = req.body.existingScreenshots.split(',').map(item => item.trim());
        }
        if (req.files['screenshot']) {
            screenshots = [...screenshots, ...req.files['screenshot'].map(file => file.filename)];
        }
        const screenshotString = screenshots.join(',');

        // Handle series data
        let episodeData = null;
        let numberOfSeasons = null;
        let numberOfEpisodes = null;
        let zipValue = req.body.zip || null;

        if (req.body.content === 'series' && req.body.seasonsData) {
            const seasonsData = typeof req.body.seasonsData === 'string'
                ? JSON.parse(req.body.seasonsData)
                : req.body.seasonsData;

            // For series, extract quality links from seasonsData
            if (seasonsData.length > 0) {
                const firstSeason = seasonsData[0];

                // Set the main zip to the highest available quality link
                if (firstSeason.zipLinks) {
                    zipValue = firstSeason.zipLinks['4K'] ||
                        firstSeason.zipLinks['1080P'] ||
                        firstSeason.zipLinks['720P'] ||
                        firstSeason.zipLinks['480P'] ||
                        zipValue;
                }
            }

            episodeData = JSON.stringify(seasonsData);
            numberOfSeasons = req.body.numberOfSeasons || seasonsData.length;
            numberOfEpisodes = seasonsData.reduce((total, season) => total + (season.numberOfEpisodes || 0), 0);
        } else {
            // Movie handling remains the same
            if (req.body.eplinks) {
                episodeData = req.body.eplinks;
                numberOfEpisodes = req.body.numberep;
            }
        }

        pool.query(
            `UPDATE movie SET 
                categoryid = ?, 
                name = ?, 
                language = ?, 
                year = ?, 
                image = ?,
                screenshot = ?,
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
                size4k = ?,
                title = ?,
                zip = ?,
                eplinks = ?,
                numberep = ?,
                content = ?,
                numberOfSeasons = ?
            WHERE movieid = ?`,
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
                req.body.size4k || null,
                req.body.title,
                zipValue,
                episodeData,
                numberOfEpisodes,
                req.body.content,
                numberOfSeasons,
                req.body.movieid
            ],
            function (error, result) {
                if (error) {
                    console.error('Database Error:', error);
                    // Clean up uploaded files
                    if (req.files['image']) {
                        fs.unlinkSync(path.join('uploads/', req.files['image'][0].filename));
                    }
                    if (req.files['screenshot']) {
                        req.files['screenshot'].forEach(file => {
                            fs.unlinkSync(path.join('uploads/screenshots/', file.filename));
                        });
                    }
                    return res.status(500).json({ status: false, message: 'Database Error' });
                }
                res.status(200).json({ status: true, message: 'Updated Successfully' });
            }
        );
    } catch (e) {
        console.error('Server Error:', e);
        res.status(500).json({ status: false, message: 'Server Error' });
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
        console.log("EE", e)
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

router.post('/delete_movie', function (req, res, next) {
    try {
        pool.query("delete from movie where movieid=?", [req.body.movieid], function (error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ status: false, message: "Database Error, Pls Contact Backend Team" })
            }
            else {
                res.status(200).json({ status: true, message: "Movie Sucessfully Deleted" })
            }
        })
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }
});

// New route to get series details with seasons breakdown
router.get('/fetch_series_details/:movieid', function (req, res, next) {
    try {
        pool.query('SELECT * FROM movie WHERE movieid = ? AND content = "series"', [req.params.movieid], function (error, result) {
            if (error) {
                res.status(200).json({ status: false, message: 'Database Error,Pls Contact Backend Team' })
            }
            else if (result.length === 0) {
                res.status(200).json({ status: false, message: 'Series not found' })
            }
            else {
                const series = result[0];
                try {
                    if (series.eplinks) {
                        series.seasonsData = JSON.parse(series.eplinks);
                    }
                    res.status(200).json({ status: true, message: 'Success..', data: series })
                } catch (e) {
                    console.log('Error parsing seasons data:', e);
                    res.status(200).json({ status: false, message: 'Error parsing series data' })
                }
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' })
    }
});

// New route to get specific season details
router.get('/fetch_season_details/:movieid/:seasonNumber', function (req, res, next) {
    try {
        const { movieid, seasonNumber } = req.params;

        pool.query('SELECT eplinks FROM movie WHERE movieid = ? AND content = "series"', [movieid], function (error, result) {
            if (error) {
                res.status(200).json({ status: false, message: 'Database Error,Pls Contact Backend Team' })
            }
            else if (result.length === 0) {
                res.status(200).json({ status: false, message: 'Series not found' })
            }
            else {
                try {
                    const seasonsData = JSON.parse(result[0].eplinks);
                    const season = seasonsData.find(s => s.seasonNumber == seasonNumber);

                    if (season) {
                        res.status(200).json({ status: true, message: 'Success..', data: season })
                    } else {
                        res.status(200).json({ status: false, message: 'Season not found' })
                    }
                } catch (e) {
                    console.log('Error parsing seasons data:', e);
                    res.status(200).json({ status: false, message: 'Error parsing series data' })
                }
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' })
    }
});

module.exports = router;