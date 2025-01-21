import React, { useState } from 'react';
import { Search, XCircle } from 'lucide-react';
import Movie  from '../types/movie';

interface SearchProps {
  data: Movie[];
  movies: Movie[];
  onFilter: (filtered: Movie[]) => void;
}


/**
 * SearchElement component allows users to search through a list of movies.
 * 
 * @component
 * @param {SearchProps} props - The properties passed to the component.
 * @param {Array} props.data - The original list of movies.
 * @param {Array} props.movies - The list of movies to be filtered.
 * @param {Function} props.onFilter - The function to call with the filtered list of movies.
 * 
 * @returns {JSX.Element} The rendered search input element.
 * 
 * @example
 * <SearchElement data={data} movies={movies} onFilter={handleFilter} />
 */
export const SearchElement: React.FC<SearchProps> = ({data, movies, onFilter }) => {
    const [search, setSearch] = useState('');
    
    const handleSearch = (search:string) => {
        if(search === '' || !search) {
            onFilter(data);
            return
        }

      const searchresult = movies.filter(movie => {
        const searchLower = search.toLowerCase();
        const titleMatch = movie.title.toLowerCase().includes(searchLower);

        const yearMatch = movie.year.toString().toLowerCase().includes(searchLower);

        const countryMatch = movie.country.some(country =>
            country.toLowerCase().includes(searchLower)
          );
        const languageMatch = movie.language.some(language =>
            language.toLowerCase().includes(searchLower)
          );
        const genreMatch = movie.genre.some(genre =>
            genre.toLowerCase().includes(searchLower)
          );
          

        const matchesSearch = titleMatch || countryMatch || genreMatch || languageMatch || yearMatch;

        return matchesSearch;
      });
      onFilter(searchresult);
    };
  
    return (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
              { search !== ''&&
              <XCircle onClick={()=>{setSearch('')
                handleSearch('')
              }} size={20} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 cursor-pointer'/>}
            </div>
          </div>
        </div>
    );
  };