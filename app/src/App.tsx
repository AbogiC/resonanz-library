import { useState, useMemo } from 'react';
import { 
  Search, 
  Heart, 
  Music, 
  Filter, 
  BookOpen, 
  Calendar, 
  Clock, 
  Music2,
  X,
  ChevronDown,
  Download,
  Plus,
  Pencil,
  Trash2,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { sheetMusicData as initialData, genres, composers, periods, difficulties, instruments, type SheetMusic } from '@/data/sheetMusic';
import './App.css';

const emptyFormData: Omit<SheetMusic, 'id'> = {
  title: '',
  composer: '',
  composerPeriod: 'Classical',
  genre: 'Romantic',
  difficulty: 'Intermediate',
  year: new Date().getFullYear(),
  pages: 1,
  key: 'C major',
  tempo: 'Moderato',
  description: '',
  isFavorite: false,
  instruments: ['Piano']
};

interface FormFieldsProps {
  formData: Omit<SheetMusic, 'id'>;
  setFormData: (data: Omit<SheetMusic, 'id'>) => void;
}

const FormFields = ({ formData, setFormData }: FormFieldsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="sm:col-span-2">
      <Label htmlFor="title">Title *</Label>
      <Input
        id="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Enter piece title"
        className="bg-slate-800 border-slate-700"
      />
    </div>
    
    <div className="sm:col-span-2">
      <Label htmlFor="composer">Composer *</Label>
      <Input
        id="composer"
        value={formData.composer}
        onChange={(e) => setFormData({ ...formData, composer: e.target.value })}
        placeholder="Enter composer name"
        className="bg-slate-800 border-slate-700"
      />
    </div>

    <div>
      <Label>Period</Label>
      <Select 
        value={formData.composerPeriod} 
        onValueChange={(value) => setFormData({ ...formData, composerPeriod: value })}
      >
        <SelectTrigger className="bg-slate-800 border-slate-700 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700 text-slate-300">
          {periods.filter(p => p !== 'All').map(period => (
            <SelectItem key={period} value={period}>{period}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label>Genre</Label>
      <Select 
        value={formData.genre} 
        onValueChange={(value) => setFormData({ ...formData, genre: value })}
      >
        <SelectTrigger className="bg-slate-800 border-slate-700 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700 text-slate-300">
          {genres.filter(g => g !== 'All').map(genre => (
            <SelectItem key={genre} value={genre}>{genre}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label>Difficulty</Label>
      <Select 
        value={formData.difficulty} 
        onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert') => setFormData({ ...formData, difficulty: value })}
      >
        <SelectTrigger className="bg-slate-800 border-slate-700 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700 text-slate-300">
          {difficulties.filter(d => d !== 'All').map(difficulty => (
            <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label htmlFor="year">Year</Label>
      <Input
        id="year"
        type="number"
        value={formData.year}
        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 0 })}
        className="bg-slate-800 border-slate-700"
      />
    </div>

    <div>
      <Label htmlFor="pages">Pages</Label>
      <Input
        id="pages"
        type="number"
        value={formData.pages}
        onChange={(e) => setFormData({ ...formData, pages: parseInt(e.target.value) || 1 })}
        className="bg-slate-800 border-slate-700"
      />
    </div>

    <div>
      <Label htmlFor="key">Key</Label>
      <Input
        id="key"
        value={formData.key}
        onChange={(e) => setFormData({ ...formData, key: e.target.value })}
        placeholder="e.g., C major"
        className="bg-slate-800 border-slate-700"
      />
    </div>

    <div>
      <Label htmlFor="tempo">Tempo</Label>
      <Input
        id="tempo"
        value={formData.tempo}
        onChange={(e) => setFormData({ ...formData, tempo: e.target.value })}
        placeholder="e.g., Allegro"
        className="bg-slate-800 border-slate-700"
      />
    </div>

    <div className="sm:col-span-2">
      <Label htmlFor="instruments">Instruments (comma-separated)</Label>
      <Input
        id="instruments"
        value={formData.instruments.join(', ')}
        onChange={(e) => setFormData({ ...formData, instruments: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
        placeholder="e.g., Piano, Violin"
        className="bg-slate-800 border-slate-700"
      />
    </div>

    <div className="sm:col-span-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Enter a description of the piece..."
        rows={3}
        className="bg-slate-800 border-slate-700"
      />
    </div>
  </div>
);

import { useEffect } from 'react';
import ApiService from './services/api';

function App() {
  const [musicData, setMusicData] = useState<SheetMusic[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedComposer, setSelectedComposer] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedInstrument, setSelectedInstrument] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<SheetMusic | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingPiece, setEditingPiece] = useState<SheetMusic | null>(null);
  const [formData, setFormData] = useState<Omit<SheetMusic, 'id'>>(emptyFormData);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = new Set<string>();
    initialData.forEach(piece => {
      if (piece.isFavorite) saved.add(piece.id);
    });
    return saved;
  });

  useEffect(() => {
    // In a real app, you would fetch data from an API here
    const fetchData = async () => {
      try {
        const fetchScore = await ApiService.getScores() as { data: SheetMusic[] };
        setMusicData(fetchScore.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const filteredMusic = useMemo(() => {
    return musicData.filter(piece => {
      const matchesSearch = 
        piece.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        piece.composer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || piece.genre === selectedGenre;
      const matchesComposer = selectedComposer === 'All' || piece.composer === selectedComposer;
      const matchesPeriod = selectedPeriod === 'All' || piece.composerPeriod === selectedPeriod;
      const matchesDifficulty = selectedDifficulty === 'All' || piece.difficulty === selectedDifficulty;
      const matchesInstrument = selectedInstrument === 'All' || piece.instruments.includes(selectedInstrument);
      const matchesFavorites = !showFavoritesOnly || favorites.has(piece.id);

      return matchesSearch && matchesGenre && matchesComposer && matchesPeriod && 
             matchesDifficulty && matchesInstrument && matchesFavorites;
    });
  }, [musicData, searchQuery, selectedGenre, selectedComposer, selectedPeriod, selectedDifficulty, selectedInstrument, showFavoritesOnly, favorites]);

  const clearFilters = () => {
    setSelectedGenre('All');
    setSelectedComposer('All');
    setSelectedPeriod('All');
    setSelectedDifficulty('All');
    setSelectedInstrument('All');
    setShowFavoritesOnly(false);
    setSearchQuery('');
  };

  const handleAddNew = () => {
    setFormData(emptyFormData);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (piece: SheetMusic, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPiece(piece);
    setFormData({
      title: piece.title,
      composer: piece.composer,
      composerPeriod: piece.composerPeriod,
      genre: piece.genre,
      difficulty: piece.difficulty,
      year: piece.year,
      pages: piece.pages,
      key: piece.key,
      tempo: piece.tempo,
      description: piece.description,
      isFavorite: piece.isFavorite,
      instruments: piece.instruments
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (piece: SheetMusic, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPiece(piece);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (editingPiece) {
      setMusicData(prev => prev.filter(p => p.id !== editingPiece.id));
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        newFavorites.delete(editingPiece.id);
        return newFavorites;
      });
      setIsDeleteDialogOpen(false);
      setEditingPiece(null);
    }
  };

  const saveNewPiece = () => {
    const newPiece: SheetMusic = {
      ...formData,
      id: Date.now().toString(),
      isFavorite: false
    };
    setMusicData(prev => [newPiece, ...prev]);
    setIsAddDialogOpen(false);
    setFormData(emptyFormData);
  };

  const saveEditPiece = () => {
    if (editingPiece) {
      setMusicData(prev => prev.map(p => 
        p.id === editingPiece.id 
          ? { ...formData, id: editingPiece.id, isFavorite: favorites.has(editingPiece.id) }
          : p
      ));
      setIsEditDialogOpen(false);
      setEditingPiece(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Advanced': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const activeFiltersCount = [
    selectedGenre !== 'All',
    selectedComposer !== 'All',
    selectedPeriod !== 'All',
    selectedDifficulty !== 'All',
    selectedInstrument !== 'All',
    showFavoritesOnly
  ].filter(Boolean).length;

  const isFormValid = formData.title.trim() && formData.composer.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Music2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Sheet Music Library
                </h1>
                <p className="text-xs text-slate-400">Discover classical masterpieces</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleAddNew}
                className="gap-2 bg-violet-600 hover:bg-violet-700"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`gap-2 ${showFavoritesOnly ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400 hover:text-slate-800'}`}
              >
                <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">Favorites</span>
                {favorites.size > 0 && (
                  <Badge variant="secondary" className="ml-1 bg-slate-800 text-slate-300">
                    {favorites.size}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by title or composer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 bg-slate-900/50 border-slate-700/50 rounded-xl text-slate-100 placeholder:text-slate-500 focus:border-violet-500/50 focus:ring-violet-500/20"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 text-slate-400 mr-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters:</span>
            </div>

            {/* Genre Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 hover:text-slate-300">
                  {selectedGenre === 'All' ? 'Genre' : selectedGenre}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-700 max-h-60 overflow-auto">
                {genres.map(genre => (
                  <DropdownMenuItem 
                    key={genre} 
                    onClick={() => setSelectedGenre(genre)}
                    className={selectedGenre === genre ? 'bg-violet-500/20 text-violet-300' : 'text-slate-300'}
                  >
                    {genre}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Composer Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 hover:text-slate-300">
                  {selectedComposer === 'All' ? 'Composer' : selectedComposer.split(' ').pop()}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-700 max-h-60 overflow-auto">
                {composers.map(composer => (
                  <DropdownMenuItem 
                    key={composer} 
                    onClick={() => setSelectedComposer(composer)}
                    className={selectedComposer === composer ? 'bg-violet-500/20 text-violet-300' : 'text-slate-300'}
                  >
                    {composer}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Period Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 hover:text-slate-300">
                  {selectedPeriod === 'All' ? 'Period' : selectedPeriod}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-700">
                {periods.map(period => (
                  <DropdownMenuItem 
                    key={period} 
                    onClick={() => setSelectedPeriod(period)}
                    className={selectedPeriod === period ? 'bg-violet-500/20 text-violet-300' : 'text-slate-300'}
                  >
                    {period}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Difficulty Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 hover:text-slate-300">
                  {selectedDifficulty === 'All' ? 'Difficulty' : selectedDifficulty}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-700">
                {difficulties.map(difficulty => (
                  <DropdownMenuItem 
                    key={difficulty} 
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={selectedDifficulty === difficulty ? 'bg-violet-500/20 text-violet-300' : 'text-slate-300'}
                  >
                    {difficulty}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Instrument Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-slate-900/50 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 hover:text-slate-300">
                  {selectedInstrument === 'All' ? 'Instrument' : selectedInstrument}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-slate-700">
                {instruments.map(instrument => (
                  <DropdownMenuItem 
                    key={instrument} 
                    onClick={() => setSelectedInstrument(instrument)}
                    className={selectedInstrument === instrument ? 'bg-violet-500/20 text-violet-300' : 'text-slate-300'}
                  >
                    {instrument}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {activeFiltersCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="gap-2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-3 h-3" />
                Clear ({activeFiltersCount})
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Showing {filteredMusic.length} of {musicData.length} pieces</span>
            {favorites.size > 0 && (
              <span className="flex items-center gap-1 text-rose-400">
                <Heart className="w-3 h-3 fill-current" />
                {favorites.size} favorites
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Music Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredMusic.length === 0 ? (
          <div className="text-center py-20">
            <Music className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No pieces found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your filters or search query</p>
            <Button onClick={clearFilters} variant="outline" className="border-slate-700 text-slate-300">
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMusic.map((piece) => (
              <Card 
                key={piece.id}
                onClick={() => setSelectedPiece(piece)}
                className="group cursor-pointer bg-slate-900/40 border-slate-800/50 hover:border-violet-500/30 hover:bg-slate-800/40 transition-all duration-300 overflow-hidden"
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-100 truncate group-hover:text-violet-300 transition-colors">
                        {piece.title}
                      </h3>
                      <p className="text-sm text-slate-400 truncate">{piece.composer}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleEdit(piece, e)}
                        className="p-2 rounded-lg hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Pencil className="w-4 h-4 text-slate-400 hover:text-violet-400" />
                      </button>
                      <button
                        onClick={(e) => toggleFavorite(piece.id, e)}
                        className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
                      >
                        <Heart 
                          className={`w-4 h-4 transition-colors ${
                            favorites.has(piece.id) 
                              ? 'fill-rose-500 text-rose-500' 
                              : 'text-slate-500 hover:text-rose-400'
                          }`} 
                        />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <Badge variant="outline" className={`text-xs ${getDifficultyColor(piece.difficulty)}`}>
                      {piece.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-slate-800/50 text-slate-400 border-slate-700">
                      {piece.genre}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {piece.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {piece.pages} pages
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {piece.instruments.slice(0, 2).map(inst => (
                      <span key={inst} className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        {inst}
                      </span>
                    ))}
                    {piece.instruments.length > 2 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        +{piece.instruments.length - 2}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Detail Dialog */}
      <Dialog open={!!selectedPiece} onOpenChange={() => setSelectedPiece(null)}>
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-slate-100">
          {selectedPiece && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-slate-100">
                  {selectedPiece.title}
                </DialogTitle>
                <DialogDescription className="text-slate-400">
                  {selectedPiece.composer} • {selectedPiece.composerPeriod} Period
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${getDifficultyColor(selectedPiece.difficulty)}`}>
                    {selectedPiece.difficulty}
                  </Badge>
                  <Badge variant="outline" className="border-slate-700 text-slate-300">
                    {selectedPiece.genre}
                  </Badge>
                  <Badge variant="outline" className="border-slate-700 text-slate-300">
                    {selectedPiece.key}
                  </Badge>
                  <Badge variant="outline" className="border-slate-700 text-slate-300">
                    {selectedPiece.tempo}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed">
                  {selectedPiece.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      Year
                    </div>
                    <p className="text-slate-100 font-medium">{selectedPiece.year}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                      <BookOpen className="w-4 h-4" />
                      Pages
                    </div>
                    <p className="text-slate-100 font-medium">{selectedPiece.pages}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                      <Music className="w-4 h-4" />
                      Key
                    </div>
                    <p className="text-slate-100 font-medium">{selectedPiece.key}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                      <Clock className="w-4 h-4" />
                      Tempo
                    </div>
                    <p className="text-slate-100 font-medium">{selectedPiece.tempo}</p>
                  </div>
                </div>

                {/* Instruments */}
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Instruments</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPiece.instruments.map(inst => (
                      <span key={inst} className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm">
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    className="flex-1 gap-2 bg-violet-600 hover:bg-violet-700"
                    onClick={() => alert(`Downloading ${selectedPiece.title}...`)}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 border-slate-700 text-slate-800 hover:bg-slate-800 hover:text-slate-100"
                    onClick={() => {
                      setSelectedPiece(null);
                      handleEdit(selectedPiece, { stopPropagation: () => {} } as React.MouseEvent);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 border-slate-700 text-slate-800 hover:bg-slate-800 hover:text-slate-100"
                    onClick={() => toggleFavorite(selectedPiece.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(selectedPiece.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    {favorites.has(selectedPiece.id) ? 'Favorited' : 'Add to Favorites'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add New Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-slate-100 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Plus className="w-5 h-5 text-violet-400" />
              Add New Sheet Music
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Fill in the details to add a new piece to your library.
            </DialogDescription>
          </DialogHeader>
          
          <FormFields formData={formData} setFormData={setFormData} />
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-700 text-slate-800">
              Cancel
            </Button>
            <Button 
              onClick={saveNewPiece} 
              disabled={!isFormValid}
              className="gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Piece
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 text-slate-100 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-violet-400" />
              Edit Sheet Music
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Update the details for {editingPiece?.title}.
            </DialogDescription>
          </DialogHeader>
          
          <FormFields formData={formData} setFormData={setFormData} />
          
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                if (editingPiece) {
                  handleDelete(editingPiece, { stopPropagation: () => {} } as React.MouseEvent);
                }
              }} 
              className="gap-2 border-rose-700/50 text-rose-400 hover:bg-rose-950/30 mr-auto"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-slate-700">
              Cancel
            </Button>
            <Button 
              onClick={saveEditPiece} 
              disabled={!isFormValid}
              className="gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-rose-400">
              <Trash2 className="w-5 h-5" />
              Delete Sheet Music
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete <strong className="text-slate-200">{editingPiece?.title}</strong>? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)} className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-rose-600 hover:bg-rose-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Music2 className="w-4 h-4" />
              <span>Sheet Music Library</span>
            </div>
            <p className="text-slate-600 text-sm">
              {musicData.length} pieces • {new Set(musicData.map(m => m.composer)).size} composers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
