import React, { useState } from 'react';
import { Star, Award, Trophy, ChevronDown } from 'lucide-react';
import Movie from '../types/movie';

interface Props {
  movie: Movie;
}

/**
 * A React functional component that displays a movie card with various details.
 * The card can be expanded to show more information.
 *
 * @component
 * @param {Props} props - The properties object.
 * @param {Object} props.movie - The movie object containing details to display.
 * @param {string} props.movie.title - The title of the movie.
 * @param {number} props.movie.year - The release year of the movie.
 * @param {number} props.movie.imdb_rating - The IMDb rating of the movie.
 * @param {string[]} props.movie.genre - The genres of the movie.
 * @param {number} props.movie.oscar_nominations - The number of Oscar nominations the movie received.
 * @param {number} props.movie.oscar_winning - The number of Oscars the movie won.
 * @param {string[]} props.movie.language - The languages the movie is available in.
 * @param {string[]} props.movie.cast - The cast of the movie.
 * @param {string[]} [props.movie.oscar_nominations_list] - The list of Oscar nominations the movie received.
 * @param {string[]} [props.movie.oscar_winning_list] - The list of Oscars the movie won.
 *
 * @returns {JSX.Element} The rendered movie card component.
 */
export const MovieCard: React.FC<Props> = ({ movie }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg group cursor-pointer" onClick={() => setExpanded(!isExpanded)}>
      <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
      <div className="flex justify-between items-center  text-gray-300 ">
        <div className='flex flex-row items-center gap-2'>
        <span>{movie.year}</span>
        <span>•</span>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>{movie.imdb_rating}</span>
        </div>
        <div className='hidden lg:flex items-center px-4 gap-2'>
          {movie.genre.map(g => (
            <span key={g} className="px-2 py-1 bg-gray-800 text-white rounded-lg text-sm">
              {g}
            </span>
          ))}
        </div>
        </div>
         
        <div className='flex flex-row items-center'>
          <div className="hidden lg:flex items-center gap-4 ">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-purple-500 mr-2" />
              <div>
                <div className="text-xs text-gray-400">Nominations</div>
                <div className="font-semibold">{movie.oscar_nominations}</div>
              </div>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
              <div>
                <div className="text-xs w-20 text-gray-400">Oscar Wins</div>
                <div className="font-semibold">{movie.oscar_winning}</div>
              </div>
            </div>
          </div>
            <ChevronDown className={`w-8 h-8 transition ease-in-out duration-500 ${isExpanded? 'rotate-180':''}`} />
        </div>
      </div>

      <div className={`${isExpanded ? 'max-h-screen' : 'max-h-0'} overflow-hidden transition-all ease-in-out duration-500`}>
      <div className='flex lg:hidden gap-2 my-4'>
          {movie.genre.map(g => (
            <span key={g} className="px-2 py-1 bg-gray-800 text-white rounded-lg text-sm">
              {g}
            </span>
          ))}
        </div>

        <div className="flex lg:hidden items-center gap-4 my-4">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-purple-500 mr-2" />
              <div>
                <div className="text-xs text-gray-400">Nominations</div>
                <div className="font-semibold">{movie.oscar_nominations}</div>
              </div>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
              <div>
                <div className="text-xs w-20 text-gray-400">Oscar Wins</div>
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
        <div className="text-sm text-gray-200 mb-2">
          <strong>Cast:</strong> {movie.cast.join(', ')}
        </div>
        {movie.oscar_nominations_list && movie.oscar_nominations_list.length > 0 &&
          <div className="text-sm text-gray-200 gap-2 mb-2">
            <div className='mb-2 font-bold'>Oscar Nominations for:</div>
            <div className='flex flex-wrap gap-2'>
              {movie.oscar_nominations_list.map(n => (
                <span key={n} className="px-2 py-1 bg-purple-700/60 text-white rounded-lg text-sm">
                  {n}
                </span>
              ))}
            </div>
          </div>
        }
        {movie.oscar_winning_list && movie.oscar_winning_list.length > 0 &&
          <div className="text-sm text-gray-200 gap-2">
            <div className='mb-2 font-bold'>Oscar Wins for:</div>
            <div className='flex flex-wrap gap-2'>
              {movie.oscar_winning_list.map(w => (
                <span key={w} className="px-2 py-1 bg-yellow-400 text-black rounded-lg text-sm">
                  {w}
                </span>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
};