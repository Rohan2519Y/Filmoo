var express = require('express');
var router = express.Router();
var pool=require('./pool')

router.get('/fetch_movies', function (req, res, next) {
    try {
        pool.query(
            'SELECT C.*, M.* FROM category C, movie M WHERE C.categoryid = M.categoryid ORDER BY M.movieid DESC',
            function (error, result) {
                if (error) {
                    res.status(202).json({ status: false, message: 'Database Error,Pls Contact Backend Team' })
                }
                else {
                    // Process the result to parse episode data for series
                    const processedResult = result.map(movie => {
                        if (movie.content === 'series' && movie.eplinks) {
                            try {
                                movie.seasonsData = JSON.parse(movie.eplinks);
                            } catch (e) {
                                console.log('Error parsing seasons data for movie:', movie.movieid);
                                movie.seasonsData = null;
                            }
                        }
                        return movie;
                    });
                    res.status(200).json({ status: true, message: 'Success..', data: processedResult })
                }
            }
        )
    }
    catch (e) {
        res.status(201).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' })
    }
});

router.post('/fetch_movies_by_id', function (req, res, next) {
    try {
        pool.query('select C.*,M.* from category C,movie M where C.categoryid=M.categoryid and movieid=? ORDER BY M.movieid DESC', [req.body.movieid],function (error, result) {
            if (error) {
                res.status(300).json({ status: false, message: 'Database Error,Pls Contact Backend Team' })
            }
            else {
                // Process the result to parse episode data for series
                const processedResult = result.map(movie => {
                    if (movie.content === 'series' && movie.eplinks) {
                        try {
                            movie.seasonsData = JSON.parse(movie.eplinks);
                        } catch (e) {
                            console.log('Error parsing seasons data for movie:', movie.movieid);
                            movie.seasonsData = null;
                        }
                    }
                    return movie;
                });
                res.status(200).json({ status: true, message: 'Success..', data: processedResult })
            }
        })
    }
    catch (e) {
        res.status(500).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' })
    }
})

router.post('/fetch_movies_by_search', function (req, res, next) {
    try {
        let searchText = req.body.searchtext.trim().toLowerCase();

        // Remove dots and spaces from search text
        let normalizedText = `%${searchText.replace(/[.\s]/g, '')}%`;

        pool.query(
            `SELECT C.*, M.* 
             FROM category C, movie M 
             WHERE C.categoryid = M.categoryid 
               AND (
                   REPLACE(REPLACE(LOWER(M.name), '.', ''), ' ', '') LIKE ?
                   OR M.year LIKE ?
               ) 
             ORDER BY M.movieid DESC`,
            [normalizedText, `%${searchText}%`],
            function (error, result) {
                if (error) {
                    res.status(300).json({ status: false, message: 'Database Error,Pls Contact Backend Team' });
                } else {
                    const processedResult = result.map(movie => {
                        if (movie.content === 'series' && movie.eplinks) {
                            try {
                                movie.seasonsData = JSON.parse(movie.eplinks);
                            } catch {
                                console.log('Error parsing seasons data for movie:', movie.movieid);
                                movie.seasonsData = null;
                            }
                        }
                        return movie;
                    });
                    res.status(200).json({ status: true, message: 'Success..', data: processedResult });
                }
            }
        );
    } catch {
        res.status(500).json({ status: false, message: 'Critical Error,Pls Contact Server Administrator' });
    }
});


module.exports = router;