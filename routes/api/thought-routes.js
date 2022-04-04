const router = require('express').Router();
const {
    addThoughts,
    getAllThoughts,
    getThoughtsById,
    updateThougts,
    addReaction,
    deleteReaction,
    deleteThoughts,
} = require('../../controllers/thoughts-controller');

router
    .route('/')
    .get(getAllThoughts);
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThougts)
    .delete(deleteThoughts);
router
    .route('/:userId')
    .post(addThoughts)
router
    .route('/:thoughtId/reactions')
    .post(addReaction);
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;