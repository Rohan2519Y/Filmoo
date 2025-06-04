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
        const screenshotString = screenshots.join(', '); 

        // Handle content type and episodes/seasons data
        const contentType = req.body.content || 'movie';
        let eplinks = '';
        let numberep = 0;
        let numberOfSeasons = 0;
        
        // Handle series data
        if (contentType === 'series' && req.body.seasonsData) {
            try {
                const seasonsData = JSON.parse(req.body.seasonsData);
                numberOfSeasons = parseInt(req.body.numberOfSeasons) || 0;
                
                // Convert seasons data to JSON string for storage
                eplinks = JSON.stringify(seasonsData);
                
                // Calculate total episodes across all seasons
                numberep = seasonsData.reduce((total, season) => {
                    return total + (season.numberOfEpisodes || 0);
                }, 0);
            } catch (parseError) {
                console.error('Error parsing seasons data:', parseError);
                return res.status(400).json({ 
                    status: false, 
                    message: 'Invalid seasons data format' 
                });
            }
        }

        pool.query(
            'INSERT INTO movie (categoryid, name, language, year, image, screenshot, genre, description, quality, link480p, link720p, link1080p, link4k, size480p, size720p, size1080p, size4k, title, zip, eplinks, numberep, content, numberOfSeasons) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
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
                req.body.zip || null,
                eplinks,
                numberep,
                contentType,
                numberOfSeasons
            ],
            function (error, result) {
                if (error) {
                    console.error('Database Error:', error);
                    return res.status(200).json({ status: false, message: 'Database Error, Please Contact Backend Team' });
                }
                res.status(200).json({ status: true, message: `${contentType === 'series' ? 'Series' : 'Movie'} Added Successfully` });
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
                // Parse eplinks for series content
                const processedResult = result.map(item => {
                    if (item.content === 'series' && item.eplinks) {
                        try {
                            item.seasonsData = JSON.parse(item.eplinks);
                        } catch (parseError) {
                            console.error('Error parsing eplinks for movie ID:', item.movieid, parseError);
                            item.seasonsData = [];
                        }
                    }
                    return item;
                });
                
                res.status(200).json({ status: true, message: 'Success..', data: processedResult })
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' })
    }
})

router.post('/edit_movies', function (req, res, next) {
    try {
        // Handle content type and episodes/seasons data
        const contentType = req.body.content || 'movie';
        let eplinks = '';
        let numberep = 0;
        let numberOfSeasons = 0;
        
        // Handle series data
        if (contentType === 'series' && req.body.seasonsData) {
            try {
                const seasonsData = typeof req.body.seasonsData === 'string' 
                    ? JSON.parse(req.body.seasonsData) 
                    : req.body.seasonsData;
                numberOfSeasons = parseInt(req.body.numberOfSeasons) || 0;
                
                // Convert seasons data to JSON string for storage
                eplinks = JSON.stringify(seasonsData);
                
                // Calculate total episodes across all seasons
                numberep = seasonsData.reduce((total, season) => {
                    return total + (season.numberOfEpisodes || 0);
                }, 0);
            } catch (parseError) {
                console.error('Error parsing seasons data:', parseError);
                return res.status(400).json({ 
                    status: false, 
                    message: 'Invalid seasons data format' 
                });
            }
        }

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
                Array.isArray(req.body.language) ? req.body.language.join(', ') : req.body.language,
                req.body.year,
                Array.isArray(req.body.genre) ? req.body.genre.join(', ') : req.body.genre,
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
                req.body.zip || null,
                eplinks,
                numberep,
                contentType,
                numberOfSeasons,
                req.body.movieid
            ], function (error, result) {
                if (error) {
                    console.log(error)
                    res.status(200).json({ status: false, message: 'Database Error,Pls Contact Backend Team' })
                }
                else {
                    console.log(result)
                    res.status(200).json({ status: true, message: `${contentType === 'series' ? 'Series' : 'Movie'} Updated Successfully..` })
                }
            })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' })
    }
});

// New route to get series episodes by season
router.get('/fetch_series_episodes/:movieid', function (req, res, next) {
    try {
        const movieid = req.params.movieid;
        
        pool.query('SELECT eplinks, numberOfSeasons, content FROM movie WHERE movieid = ?', [movieid], function (error, result) {
            if (error) {
                res.status(200).json({ status: false, message: 'Database Error,Pls Contact Backend Team' })
            }
            else if (result.length === 0) {
                res.status(200).json({ status: false, message: 'Movie/Series not found' })
            }
            else {
                const movie = result[0];
                if (movie.content === 'series' && movie.eplinks) {
                    try {
                        const seasonsData = JSON.parse(movie.eplinks);
                        res.status(200).json({ 
                            status: true, 
                            message: 'Success..', 
                            data: {
                                seasonsData: seasonsData,
                                numberOfSeasons: movie.numberOfSeasons
                            }
                        })
                    } catch (parseError) {
                        console.error('Error parsing eplinks:', parseError);
                        res.status(200).json({ status: false, message: 'Error parsing series data' })
                    }
                } else {
                    res.status(200).json({ status: false, message: 'This is not a series or has no episode data' })
                }
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' })
    }
});

// New route to update specific episode links
router.post('/update_episode', function (req, res, next) {
    try {
        const { movieid, seasonIndex, episodeIndex, episodeData } = req.body;
        
        if (!movieid || seasonIndex === undefined || episodeIndex === undefined || !episodeData) {
            return res.status(400).json({ 
                status: false, 
                message: 'Missing required parameters' 
            });
        }
        
        // First, get the current eplinks data
        pool.query('SELECT eplinks FROM movie WHERE movieid = ?', [movieid], function (error, result) {
            if (error) {
                return res.status(200).json({ status: false, message: 'Database Error,Pls Contact Backend Team' });
            }
            
            if (result.length === 0) {
                return res.status(200).json({ status: false, message: 'Movie/Series not found' });
            }
            
            try {
                let seasonsData = JSON.parse(result[0].eplinks || '[]');
                
                // Update the specific episode
                if (seasonsData[seasonIndex] && seasonsData[seasonIndex].episodesLinks) {
                    seasonsData[seasonIndex].episodesLinks[episodeIndex] = {
                        ...seasonsData[seasonIndex].episodesLinks[episodeIndex],
                        ...episodeData
                    };
                    
                    // Update the database
                    pool.query(
                        'UPDATE movie SET eplinks = ? WHERE movieid = ?',
                        [JSON.stringify(seasonsData), movieid],
                        function (updateError, updateResult) {
                            if (updateError) {
                                console.error('Update Error:', updateError);
                                res.status(200).json({ status: false, message: 'Database Error,Pls Contact Backend Team' });
                            } else {
                                res.status(200).json({ status: true, message: 'Episode updated successfully' });
                            }
                        }
                    );
                } else {
                    res.status(400).json({ status: false, message: 'Invalid season or episode index' });
                }
            } catch (parseError) {
                console.error('Parse Error:', parseError);
                res.status(500).json({ status: false, message: 'Error parsing series data' });
            }
        });
    }
    catch (e) {
        console.error('Critical Error:', e);
        res.status(500).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' });
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
                res.status(200).json({ status: true, message: "Movie/Series Successfully Deleted" })
            }
        })
    }
    catch (e) {
        console.log(e);
        res.status(200).json({ status: false, message: "Critical Error, Pls Contact Server Administrator" })
    }
});

module.exports = router;