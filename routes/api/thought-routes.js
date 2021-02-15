const router = require('express').Router();
const { getAllThoughts, createThought, removeThought, getThoughtById, updateThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

    // create a reaction
router
    .route('/:id/reactions/')
    .post(addReaction);

    // delete a reaction by id
router
    .route('/:id/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;