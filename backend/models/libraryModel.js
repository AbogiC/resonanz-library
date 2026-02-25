const { pool } = require('../config/database');

class LibraryModel {
  static async getAllScores() {
    const [rows] = await pool.query('SELECT * FROM `library`');
    return rows;
  }
  
  static async getScoreById(scoreId) {
    const [rows] = await pool.query('SELECT * FROM `library` WHERE id = ?', [scoreId]);
    return rows[0];
  }

  static async addScore(scoreData) {
    const [result] = await pool.query('INSERT INTO `library` SET ?', [scoreData]);
    return result.insertId;
  }

  static async updateScore(scoreId, scoreData) {
    await pool.query('UPDATE `library` SET ? WHERE id = ?', [scoreData, scoreId]);
    return true;
  }

  static async deleteScore(scoreId) {
    await pool.query('DELETE FROM `library` WHERE id = ?', [scoreId]);
    return true;
  }
}

module.exports = LibraryModel;