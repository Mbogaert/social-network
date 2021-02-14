const router = require('express').Router();
const { getAllThoughts, createThought, removeThought, getThoughtById } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtById)
    // .put(updateUser)
    .delete(removeThought);

module.exports = router;