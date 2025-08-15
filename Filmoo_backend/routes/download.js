var express = require('express');
var router = express.Router();
var pool = require('./pool')

// Helper to process series episodes safely
function processSeries(result) {
    return result.map(movie => {
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
}

// GET /fetch_movies
router.get('/fetch_movies', function (req, res) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('DB connection error:', err);
            return res.status(500).json({ status: false, message: 'Database Connection Failed' });
        }

        connection.query(
            'SELECT C.*, M.* FROM category C, movie M WHERE C.categoryid = M.categoryid ORDER BY M.movieid DESC',
            (error, result) => {
                connection.release();
                if (error) {
                    console.log(error);
                    return res.status(202).json({ status: false, message: 'Database Error, Pls Contact Backend Team' });
                }
                res.status(200).json({ status: true, message: 'Success..', data: processSeries(result) });
            }
        );
    });
});

// POST /fetch_movies_by_id
router.post('/fetch_movies_by_id', function (req, res) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('DB connection error:', err);
            return res.status(500).json({ status: false, message: 'Database Connection Failed' });
        }

        connection.query(
            'SELECT C.*, M.* FROM category C, movie M WHERE C.categoryid = M.categoryid AND movieid = ? ORDER BY M.movieid DESC',
            [req.body.movieid],
            (error, result) => {
                connection.release();
                if (error) {
                    return res.status(300).json({ status: false, message: 'Database Error, Pls Contact Backend Team' });
                }
                res.status(200).json({ status: true, message: 'Success..', data: processSeries(result) });
            }
        );
    });
});

// POST /fetch_movies_by_search
router.post('/fetch_movies_by_search', function (req, res) {
    let searchText = req.body.searchtext.trim().toLowerCase();
    let normalizedText = `%${searchText.replace(/[.\s]/g, '')}%`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('DB connection error:', err);
            return res.status(500).json({ status: false, message: 'Database Connection Failed' });
        }

        connection.query(
            `SELECT C.*, M.* 
             FROM category C, movie M 
             WHERE C.categoryid = M.categoryid 
               AND (REPLACE(REPLACE(LOWER(M.name), '.', ''), ' ', '') LIKE ? OR M.year LIKE ?)
             ORDER BY M.movieid DESC`,
            [normalizedText, `%${searchText}%`],
            (error, result) => {
                connection.release();
                if (error) {
                    return res.status(300).json({ status: false, message: 'Database Error, Pls Contact Backend Team' });
                }
                res.status(200).json({ status: true, message: 'Success..', data: processSeries(result) });
            }
        );
    });
});

// POST /fetch_movies_by_category
router.post('/fetch_movies_by_category', function (req, res) {
    const text = `%${req.body.category}%`;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('DB connection error:', err);
            return res.status(500).json({ status: false, message: 'Database Connection Failed' });
        }

        connection.query(
            `SELECT C.*, M.* 
             FROM category C, movie M 
             WHERE C.categoryid = M.categoryid 
               AND (C.categoryname LIKE ? OR M.language LIKE ? OR M.genre LIKE ?)
             ORDER BY M.movieid DESC`,
            [text, text, text],
            (error, result) => {
                connection.release();
                if (error) {
                    return res.status(300).json({ status: false, message: 'Database Error, Pls Contact Backend Team' });
                }
                res.status(200).json({ status: true, message: 'Success..', data: processSeries(result) });
            }
        );
    });
});

module.exports = router;
