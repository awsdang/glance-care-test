import React from 'react';
import { Star, Award, Globe2, Trophy } from 'lucide-react';
import Movie from '../types/movie';

interface Props {
  movie: Movie;
}

export const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg group">
      <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
      <div className="flex items-center gap-2 text-gray-300 mb-2">
        <span>{movie.year}</span>
        <span>•</span>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>{movie.imdb_rating}</span>
        </div>
      </div>
      <div className='group-hover:max-h-screen overflow-hidden transition-all ease-in-out duration-[2s] max-h-0'>
      <div className="flex flex-wrap gap-2 mb-4">
        {movie.genre.map(g => (
          <span key={g} className="px-2 py-1 bg-gray-800 text-white rounded-lg text-sm">
            {g}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center">
          <Award className="w-5 h-5 text-gold-500 mr-2" />
          <div>
            <div className="text-xs text-gray-400">Oscar Nominations</div>
            <div className="font-semibold">{movie.oscar_nominations}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-gold-500 mr-2" />
          <div>
            <div className="text-xs text-gray-400">Oscar Wins</div>
            <div className="font-semibold">{movie.oscar_winning}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-2">
          <div>
            <div className="text-xs text-gray-400">Languages</div>
            <div className="text-sm font-semibold">{movie.language.join(', ')}</div>
          </div>
        </div>
      <div className="text-sm text-gray-200">
        <strong>Cast:</strong> {movie.cast.join(', ')}
      </div>
      </div>
    </div>
  );
};