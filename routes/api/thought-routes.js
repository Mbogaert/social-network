const router = require('express').Router();
const { getAllThoughts, createThought, removeThought, getThoughtById, updateThought } = require('../../controllers/thought-controller');

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

module.exports = router;