export interface SheetMusic {
  id: string;
  title: string;
  composer: string;
  composerPeriod: string;
  genre: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  year: number;
  pages: number;
  key: string;
  tempo: string;
  description: string;
  isFavorite: boolean;
  instruments: string[];
}

export const sheetMusicData: SheetMusic[] = [
  {
    id: '1',
    title: 'Für Elise',
    composer: 'Ludwig van Beethoven',
    composerPeriod: 'Classical',
    genre: 'Romantic',
    difficulty: 'Intermediate',
    year: 1810,
    pages: 3,
    key: 'A minor',
    tempo: 'Poco moto',
    description: 'One of the most popular piano pieces ever written, known for its haunting melody.',
    isFavorite: false,
    instruments: ['Piano']
  },
  {
    id: '2',
    title: 'Moonlight Sonata (1st Movement)',
    composer: 'Ludwig van Beethoven',
    composerPeriod: 'Classical',
    genre: 'Sonata',
    difficulty: 'Intermediate',
    year: 1801,
    pages: 5,
    key: 'C# minor',
    tempo: 'Adagio sostenuto',
    description: 'A dreamy, contemplative piece that captures the essence of moonlight reflecting on water.',
    isFavorite: true,
    instruments: ['Piano']
  },
  {
    id: '3',
    title: 'Clair de Lune',
    composer: 'Claude Debussy',
    composerPeriod: 'Impressionist',
    genre: 'Suite',
    difficulty: 'Advanced',
    year: 1905,
    pages: 6,
    key: 'Db major',
    tempo: 'Andante très expressif',
    description: 'The third movement of Suite bergamasque, inspired by a Paul Verlaine poem.',
    isFavorite: false,
    instruments: ['Piano']
  },
  {
    id: '4',
    title: 'Nocturne in E-flat Major, Op. 9 No. 2',
    composer: 'Frédéric Chopin',
    composerPeriod: 'Romantic',
    genre: 'Nocturne',
    difficulty: 'Intermediate',
    year: 1832,
    pages: 4,
    key: 'Eb major',
    tempo: 'Andante',
    description: 'Chopin\'s most famous nocturne, characterized by its lyrical melody and ornate decorations.',
    isFavorite: true,
    instruments: ['Piano']
  },
  {
    id: '5',
    title: 'The Four Seasons - Spring',
    composer: 'Antonio Vivaldi',
    composerPeriod: 'Baroque',
    genre: 'Concerto',
    difficulty: 'Advanced',
    year: 1725,
    pages: 12,
    key: 'E major',
    tempo: 'Allegro',
    description: 'A violin concerto depicting the arrival of spring with bird songs and murmuring streams.',
    isFavorite: false,
    instruments: ['Violin', 'Orchestra']
  },
  {
    id: '6',
    title: 'Canon in D',
    composer: 'Johann Pachelbel',
    composerPeriod: 'Baroque',
    genre: 'Canon',
    difficulty: 'Intermediate',
    year: 1680,
    pages: 4,
    key: 'D major',
    tempo: 'Andante',
    description: 'A timeless piece featuring a repeating bass line and beautiful interweaving melodies.',
    isFavorite: false,
    instruments: ['Piano', 'Violin', 'Cello']
  },
  {
    id: '7',
    title: 'Gymnopédie No. 1',
    composer: 'Erik Satie',
    composerPeriod: 'Impressionist',
    genre: 'Gymnopédie',
    difficulty: 'Beginner',
    year: 1888,
    pages: 2,
    key: 'D major',
    tempo: 'Lent et douloureux',
    description: 'A minimalist masterpiece with unconventional harmonies and a melancholic atmosphere.',
    isFavorite: true,
    instruments: ['Piano']
  },
  {
    id: '8',
    title: 'Prelude in C Major, BWV 846',
    composer: 'Johann Sebastian Bach',
    composerPeriod: 'Baroque',
    genre: 'Prelude',
    difficulty: 'Beginner',
    year: 1722,
    pages: 2,
    key: 'C major',
    tempo: 'Moderato',
    description: 'The first prelude from The Well-Tempered Clavier, featuring flowing arpeggios.',
    isFavorite: false,
    instruments: ['Piano', 'Harpsichord']
  },
  {
    id: '9',
    title: 'Rondo alla Turca',
    composer: 'Wolfgang Amadeus Mozart',
    composerPeriod: 'Classical',
    genre: 'Sonata',
    difficulty: 'Advanced',
    year: 1783,
    pages: 8,
    key: 'A minor',
    tempo: 'Allegretto',
    description: 'The third movement of Piano Sonata No. 11, inspired by Turkish military music.',
    isFavorite: false,
    instruments: ['Piano']
  },
  {
    id: '10',
    title: 'Liebestraum No. 3',
    composer: 'Franz Liszt',
    composerPeriod: 'Romantic',
    genre: 'Nocturne',
    difficulty: 'Expert',
    year: 1850,
    pages: 7,
    key: 'Ab major',
    tempo: 'Poco allegro, con affetto',
    description: 'One of Liszt\'s most beloved works, based on a poem by Ferdinand Freiligrath.',
    isFavorite: true,
    instruments: ['Piano']
  },
  {
    id: '11',
    title: 'Air on the G String',
    composer: 'Johann Sebastian Bach',
    composerPeriod: 'Baroque',
    genre: 'Orchestral Suite',
    difficulty: 'Intermediate',
    year: 1731,
    pages: 3,
    key: 'D major',
    tempo: 'Andante',
    description: 'An arrangement of the second movement from Orchestral Suite No. 3, known for its serene beauty.',
    isFavorite: false,
    instruments: ['Violin', 'Orchestra']
  },
  {
    id: '12',
    title: 'Arabesque No. 1',
    composer: 'Claude Debussy',
    composerPeriod: 'Impressionist',
    genre: 'Arabesque',
    difficulty: 'Intermediate',
    year: 1891,
    pages: 5,
    key: 'E major',
    tempo: 'Andantino con moto',
    description: 'A flowing piece with cascading arpeggios and impressionistic harmonies.',
    isFavorite: false,
    instruments: ['Piano']
  },
  {
    id: '13',
    title: 'Minuet in G Major',
    composer: 'Christian Petzold',
    composerPeriod: 'Baroque',
    genre: 'Minuet',
    difficulty: 'Beginner',
    year: 1725,
    pages: 1,
    key: 'G major',
    tempo: 'Moderato',
    description: 'A charming dance piece, famously attributed to Bach in the Notebook for Anna Magdalena Bach.',
    isFavorite: false,
    instruments: ['Piano']
  },
  {
    id: '14',
    title: 'Waltz in A Minor, B. 150',
    composer: 'Frédéric Chopin',
    composerPeriod: 'Romantic',
    genre: 'Waltz',
    difficulty: 'Beginner',
    year: 1847,
    pages: 2,
    key: 'A minor',
    tempo: 'Allegretto',
    description: 'A posthumously published waltz with a melancholic yet elegant character.',
    isFavorite: false,
    instruments: ['Piano']
  },
  {
    id: '15',
    title: 'The Entertainer',
    composer: 'Scott Joplin',
    composerPeriod: 'Ragtime',
    genre: 'Ragtime',
    difficulty: 'Intermediate',
    year: 1902,
    pages: 5,
    key: 'C major',
    tempo: 'Moderato',
    description: 'One of the most famous ragtime pieces, featured in the film The Sting.',
    isFavorite: true,
    instruments: ['Piano']
  },
  {
    id: '16',
    title: 'Maple Leaf Rag',
    composer: 'Scott Joplin',
    composerPeriod: 'Ragtime',
    genre: 'Ragtime',
    difficulty: 'Advanced',
    year: 1899,
    pages: 6,
    key: 'Ab major',
    tempo: 'Tempo di marcia',
    description: 'Joplin\'s most famous rag, which sold over a million copies of sheet music.',
    isFavorite: false,
    instruments: ['Piano']
  },
  {
    id: '17',
    title: 'Sonata in C Major, K. 545 (1st Movement)',
    composer: 'Wolfgang Amadeus Mozart',
    composerPeriod: 'Classical',
    genre: 'Sonata',
    difficulty: 'Intermediate',
    year: 1788,
    pages: 4,
    key: 'C major',
    tempo: 'Allegro',
    description: 'Known as the "Sonata facile," this is one of Mozart\'s most accessible piano sonatas.',
    isFavorite: false,
    instruments: ['Piano']
  },
  {
    id: '18',
    title: 'Raindrop Prelude, Op. 28 No. 15',
    composer: 'Frédéric Chopin',
    composerPeriod: 'Romantic',
    genre: 'Prelude',
    difficulty: 'Advanced',
    year: 1839,
    pages: 5,
    key: 'Db major',
    tempo: 'Sostenuto',
    description: 'A dramatic prelude featuring a repeating A-flat note that resembles a raindrop.',
    isFavorite: false,
    instruments: ['Piano']
  },
  {
    id: '19',
    title: 'Gnossienne No. 1',
    composer: 'Erik Satie',
    composerPeriod: 'Impressionist',
    genre: 'Gnossienne',
    difficulty: 'Intermediate',
    year: 1890,
    pages: 2,
    key: 'F minor',
    tempo: 'Lent',
    description: 'A mysterious, modal piece with unconventional time signatures and sparse texture.',
    isFavorite: false,
    instruments: ['Piano']
  },
  {
    id: '20',
    title: 'Toccata and Fugue in D Minor, BWV 565',
    composer: 'Johann Sebastian Bach',
    composerPeriod: 'Baroque',
    genre: 'Toccata',
    difficulty: 'Expert',
    year: 1704,
    pages: 10,
    key: 'D minor',
    tempo: 'Allegro - Adagio - Allegro',
    description: 'One of the most famous organ works, known for its dramatic opening and complex fugue.',
    isFavorite: true,
    instruments: ['Organ', 'Piano']
  }
];

export const genres = ['All', 'Romantic', 'Sonata', 'Suite', 'Nocturne', 'Concerto', 'Canon', 'Gymnopédie', 'Prelude', 'Minuet', 'Waltz', 'Ragtime', 'Arabesque', 'Gnossienne', 'Toccata', 'Orchestral Suite'];

export const composers = ['All', 'Ludwig van Beethoven', 'Claude Debussy', 'Frédéric Chopin', 'Antonio Vivaldi', 'Johann Pachelbel', 'Erik Satie', 'Johann Sebastian Bach', 'Wolfgang Amadeus Mozart', 'Franz Liszt', 'Christian Petzold', 'Scott Joplin'];

export const periods = ['All', 'Baroque', 'Classical', 'Romantic', 'Impressionist', 'Ragtime'];

export const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const instruments = ['All', 'Piano', 'Violin', 'Cello', 'Orchestra', 'Organ', 'Harpsichord'];
