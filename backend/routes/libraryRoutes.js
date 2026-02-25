const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
    getAllScores,
    getScoreById,
    addScore,
    updateScore,
    deleteScore
} = require('../controllers/libraryController');

const createValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('difficulty').isIn(['Beginner', 'Intermediate', 'Advanced', 'Expert']).withMessage('Difficulty must be one of Beginner, Intermediate, Advanced, Expert')
];

const updateValidation = [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('difficulty').optional().isIn(['Beginner', 'Intermediate', 'Advanced', 'Expert']).withMessage('Difficulty must be one of Beginner, Intermediate, Advanced, Expert')
];

router.get('/', getAllScores);
router.get('/:id', getScoreById);
router.post('', createValidation, addScore);
router.put('/:id', updateValidation, updateScore);
router.delete('/:id', deleteScore);

module.exports = router;