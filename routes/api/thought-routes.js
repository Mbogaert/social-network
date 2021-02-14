const router = require('express').Router();
const { getAllThoughts, createThought } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// Set up GET one, PUT, and DELETE at /api/users/:id
// router
//     .route('/:id')
//     .get(getUserById)
//     .put(updateUser)
//     .delete(deleteUser);

module.exports = router;