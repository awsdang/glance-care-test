import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import Movie from '../types/movie';

interface FilterProps {
  data: Movie[];
  movies: Movie[];
  onFilter: (filtered: Movie[]) => void;
}

/**
 * FilterElement component allows users to filter a list of movies by genre.
 *
 * @component
 * @param {FilterProps} props - The properties for the FilterElement component.
 * @param {Array} props.data - The original list of movies.
 * @param {Array} props.movies - The current list of movies to be filtered.
 * @param {Function} props.onFilter - Callback function to handle the filtered list of movies.
 *
 * @returns {JSX.Element} The rendered FilterElement component.
 *
 * @example
 * <FilterElement data={moviesData} movies={filteredMovies} onFilter={handleFilter} />
 */
export const FilterElement: React.FC<FilterProps> = ({ data, movies, onFilter }) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = Array.from(new Set(data.flatMap(movie => movie.genre))).sort();

  const handleFilter = (genre: string) => {
    if (genre === '' || genre === 'All Genres') { onFilter(data); return; }
    const filtered = movies.filter(movie => {
      const matchesGenre = !genre || movie.genre.includes(genre);
      return matchesGenre;
    });
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