const mysql = require('mysql2/promise');
require('dotenv').config();

const initDatabase = async () => {
  try {
    // Create connection without database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });

    console.log('Connected to MySQL server');

    // Create database if not exists
    await connection.query(`
      CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'library_resonanz'}
      CHARACTER SET utf8mb4 
      COLLATE utf8mb4_unicode_ci
    `);
    
    console.log(`✅ Database '${process.env.DB_NAME || 'library_resonanz'}' created/verified`);

    // Use database
    await connection.query(`USE ${process.env.DB_NAME || 'library_resonanz'}`);

    // Create expenses table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`library\` (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        composer VARCHAR(255) NOT NULL,
        composerPeriod VARCHAR(255) NOT NULL,
        genre VARCHAR(255) NOT NULL,
        difficulty ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') NOT NULL DEFAULT 'Beginner',
        year INT(4) NOT NULL,
        pages INT(4) NOT NULL,
        \`key\` VARCHAR(255) NOT NULL,
        tempo VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        isFavorite BOOLEAN NOT NULL DEFAULT FALSE,
        instruments JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_title (title),
        INDEX idx_composer (composer),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Library table created/verified');

    // Create users table for development login/register
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_users_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Users table created/verified');

    // Insert sample data if table is empty
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM `library`');
    
    if (rows[0].count === 0) {

      await connection.query(`
INSERT INTO \`library\`
(title, composer, composerPeriod, genre, difficulty, year, pages, \`key\`, tempo, description, isFavorite, instruments)
VALUES
('Für Elise', 'Ludwig van Beethoven', 'Classical', 'Romantic', 'Intermediate', 1810, 3, 'A minor', 'Poco moto',
 'One of the most popular piano pieces ever written, known for its haunting melody.', FALSE,
 '["Piano"]'),

('Moonlight Sonata (1st Movement)', 'Ludwig van Beethoven', 'Classical', 'Sonata', 'Intermediate', 1801, 5, 'C# minor', 'Adagio sostenuto',
 'A dreamy, contemplative piece that captures the essence of moonlight reflecting on water.', TRUE,
 '["Piano"]'),

('Clair de Lune', 'Claude Debussy', 'Impressionist', 'Suite', 'Advanced', 1905, 6, 'Db major', 'Andante très expressif',
 'The third movement of Suite bergamasque, inspired by a Paul Verlaine poem.', FALSE,
 '["Piano"]'),

('Nocturne in E-flat Major, Op. 9 No. 2', 'Frédéric Chopin', 'Romantic', 'Nocturne', 'Intermediate', 1832, 4, 'Eb major', 'Andante',
 'Chopin''s most famous nocturne, characterized by its lyrical melody and ornate decorations.', TRUE,
 '["Piano"]'),

('The Four Seasons - Spring', 'Antonio Vivaldi', 'Baroque', 'Concerto', 'Advanced', 1725, 12, 'E major', 'Allegro',
 'A violin concerto depicting the arrival of spring with bird songs and murmuring streams.', FALSE,
 '["Violin", "Orchestra"]'),

('Canon in D', 'Johann Pachelbel', 'Baroque', 'Canon', 'Intermediate', 1680, 4, 'D major', 'Andante',
 'A timeless piece featuring a repeating bass line and beautiful interweaving melodies.', FALSE,
 '["Piano", "Violin", "Cello"]'),

('Gymnopédie No. 1', 'Erik Satie', 'Impressionist', 'Gymnopédie', 'Beginner', 1888, 2, 'D major', 'Lent et douloureux',
 'A minimalist masterpiece with unconventional harmonies and a melancholic atmosphere.', TRUE,
 '["Piano"]'),

('Prelude in C Major, BWV 846', 'Johann Sebastian Bach', 'Baroque', 'Prelude', 'Beginner', 1722, 2, 'C major', 'Moderato',
 'The first prelude from The Well-Tempered Clavier, featuring flowing arpeggios.', FALSE,
 '["Piano", "Harpsichord"]'),

('Rondo alla Turca', 'Wolfgang Amadeus Mozart', 'Classical', 'Sonata', 'Advanced', 1783, 8, 'A minor', 'Allegretto',
 'The third movement of Piano Sonata No. 11, inspired by Turkish military music.', FALSE,
 '["Piano"]'),

('Liebestraum No. 3', 'Franz Liszt', 'Romantic', 'Nocturne', 'Expert', 1850, 7, 'Ab major', 'Poco allegro, con affetto',
 'One of Liszt''s most beloved works, based on a poem by Ferdinand Freiligrath.', TRUE,
 '["Piano"]'),

('Air on the G String', 'Johann Sebastian Bach', 'Baroque', 'Orchestral Suite', 'Intermediate', 1731, 3, 'D major', 'Andante',
 'An arrangement of the second movement from Orchestral Suite No. 3, known for its serene beauty.', FALSE,
 '["Violin", "Orchestra"]'),

('Arabesque No. 1', 'Claude Debussy', 'Impressionist', 'Arabesque', 'Intermediate', 1891, 5, 'E major', 'Andantino con moto',
 'A flowing piece with cascading arpeggios and impressionistic harmonies.', FALSE,
 '["Piano"]'),

('Minuet in G Major', 'Christian Petzold', 'Baroque', 'Minuet', 'Beginner', 1725, 1, 'G major', 'Moderato',
 'A charming dance piece, famously attributed to Bach in the Notebook for Anna Magdalena Bach.', FALSE,
 '["Piano"]'),

('Waltz in A Minor, B. 150', 'Frédéric Chopin', 'Romantic', 'Waltz', 'Beginner', 1847, 2, 'A minor', 'Allegretto',
 'A posthumously published waltz with a melancholic yet elegant character.', FALSE,
 '["Piano"]'),

('The Entertainer', 'Scott Joplin', 'Ragtime', 'Ragtime', 'Intermediate', 1902, 5, 'C major', 'Moderato',
 'One of the most famous ragtime pieces, featured in the film The Sting.', TRUE,
 '["Piano"]'),

('Maple Leaf Rag', 'Scott Joplin', 'Ragtime', 'Ragtime', 'Advanced', 1899, 6, 'Ab major', 'Tempo di marcia',
 'Joplin''s most famous rag, which sold over a million copies of sheet music.', FALSE,
 '["Piano"]'),

('Sonata in C Major, K. 545 (1st Movement)', 'Wolfgang Amadeus Mozart', 'Classical', 'Sonata', 'Intermediate', 1788, 4, 'C major', 'Allegro',
 'Known as the "Sonata facile," this is one of Mozart''s most accessible piano sonatas.', FALSE,
 '["Piano"]'),

('Raindrop Prelude, Op. 28 No. 15', 'Frédéric Chopin', 'Romantic', 'Prelude', 'Advanced', 1839, 5, 'Db major', 'Sostenuto',
 'A dramatic prelude featuring a repeating A-flat note that resembles a raindrop.', FALSE,
 '["Piano"]'),

('Gnossienne No. 1', 'Erik Satie', 'Impressionist', 'Gnossienne', 'Intermediate', 1890, 2, 'F minor', 'Lent',
 'A mysterious, modal piece with unconventional time signatures and sparse texture.', FALSE,
 '["Piano"]'),

('Toccata and Fugue in D Minor, BWV 565', 'Johann Sebastian Bach', 'Baroque', 'Toccata', 'Expert', 1704, 10, 'D minor', 'Allegro - Adagio - Allegro',
 'One of the most famous organ works, known for its dramatic opening and complex fugue.', TRUE,
 '["Organ", "Piano"]');
`);

      console.log('✅ Sample data inserted');
    }

    await connection.end();
    console.log('🎉 Database initialization complete!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Initialization failed:', error.message);
    process.exit(1);
  }
};

initDatabase();

