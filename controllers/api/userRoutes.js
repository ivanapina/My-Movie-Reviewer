const router = require('express').Router();
const { User } = require('../../models');


// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.Create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            req.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// READ a single user
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);

        if (!userData) {
            res.status(404).json({ message: 'No user found with that id!'});
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE a user
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        userData.set(req.body);
        await userData.save();
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!userData) {
            res.status(400).json({ message: 'No user found'})
            return;
        }
            res.status(200).json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
});


// Login
router.post('/login', async (req, res) => {
    try {
        // Find the user who is loggin in
        const userData = await User.findOne({ where: { email: req.body.email }});
        
        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect email, please try again'});
            return;
        }

        // Checking the password to see if it is valid
        const validPassword = await userData.checkPassword(req.body.password);

        if  (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect password, please try again'});
            return;
        }

        // Creating a session with the passed in variables for the logged in user
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        //Removing the session
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
