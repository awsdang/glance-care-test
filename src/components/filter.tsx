import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import Movie  from '../types/movie';

interface FilterProps {
  data: Movie[];
  movies: Movie[];
  onFilter: (filtered: Movie[]) => void;
}

export const FilterElement: React.FC<FilterProps> = ({data, movies, onFilter }) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = Array.from(new Set(data.flatMap(movie => movie.genre))).sort();

  const handleFilter = (genre:string) => {
    console.log(movies);
    const filtered = movies.filter(movie => {
      const matchesGenre = !genre || movie.genre.includes(genre);
      return matchesGenre;
    });
    console.log(filtered);
    onFilter(filtered);
  };

  return (
          <div className="relative ">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              className="w-full pl-10 pr-8 h-10 rounded-lg bg-gray-700"
              value={selectedGenre}
              onChange={(e) => {
    setSelectedGenre(e.target.value);
    handleFilter(e.target.value);
              }}
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
  );
};