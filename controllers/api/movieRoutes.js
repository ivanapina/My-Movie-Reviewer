const axios = require('axios'); 
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                query: query,
                api_key: '278e8c312301aad59f629f56b6f2532a',
            },
        });

        const movies = response.data.results;
        console.log('movies', movies)
        res.render('test', { movies });
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).send('Error fetching data from API');
    }
});


module.exports = router;
