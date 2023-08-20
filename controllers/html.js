const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


// middleware to redirect the user to the login page if they are not logged in
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = awaitPost.FindAll({
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: [
                                'name'
                            ]
                        }
                    ]
                },
                {
                    model: User,
                }
            ]
        });

        const posts = postsData.map((post) => post.get ({ plain: true}));

        res.render('main', {
            posts,
            //sending if the user is logged in to the template
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // redirect the user to the root page if they are logged in
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;