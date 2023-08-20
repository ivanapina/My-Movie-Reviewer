const router = require('express').Router();
const { Comment } = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// CREATE a comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create( req.body);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// READ a single comment
router.get('/:id', async (req,res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);

        if (!commentData) {
            res.status(404).json({ message: 'No review found with that id'});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE a comment
router.put('/:id', async (req,res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        commentData.set(req.body);
        await commentData.save();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with that id'});
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;