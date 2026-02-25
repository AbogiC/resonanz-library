const { validationResult } = require('express-validator');
const LibraryModel = require('../models/libraryModel');

const libraryValidation = {
    create: [
        {
            field: 'title',
            rules: { notEmpty: true, isLength: { min: 3, max: 255 } }
        },
        {
            field: 'difficulty',
            rules: { isIn: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] }
        }
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            message: 'Validation failed',
            errors: errors.array()
         });
    }
    next();
}

const getAllScores = async (req, res) => {
    try {
        const scores = await LibraryModel.getAllScores();
        res.json({ success: true, count: scores.length, data: scores });
    } catch (error) {
        next(error);
    }
};

const getScoreById = async (req, res) => {
    try {
        const scoreId = req.params.id;
        const score = await LibraryModel.getScoreById(scoreId);
        if (!score) {
            return res.status(404).json({ success: false, message: 'Score not found' });
        }
        res.json({ success: true, data: score });
    } catch (error) {
        next(error);
    }
};

const addScore = async (req, res) => {
    try {
        const scoreData = req.body;
        const newScoreId = await LibraryModel.addScore(scoreData);
        res.status(201).json({ success: true, message: 'Score added successfully', id: newScoreId });
    } catch (error) {
        next(error);
    }
};

const updateScore = async (req, res) => {
    try {
        const scoreId = req.params.id;
        const scoreData = req.body;
        const existingScore = await LibraryModel.getScoreById(scoreId);
        if (!existingScore) {
            return res.status(404).json({ success: false, message: 'Score not found' });
        }  
        await LibraryModel.updateScore(scoreId, scoreData);
        res.json({ success: true, message: 'Score updated successfully' });
    } catch (error) {
        next(error);
    }
};

const deleteScore = async (req, res) => {
    try {
        const scoreId = req.params.id;
        const existingScore = await LibraryModel.getScoreById(scoreId);
        if (!existingScore) {
            return res.status(404).json({ success: false, message: 'Score not found' });
        }
        await LibraryModel.deleteScore(scoreId);
        res.json({ success: true, message: 'Score deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    libraryValidation,
    validate,
    getAllScores,
    getScoreById,
    addScore,
    updateScore,
    deleteScore
};