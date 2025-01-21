import React from 'react';
import Movie from '../types/movie';
import { Award, Star, Trophy, ChevronRight } from 'lucide-react';

interface TimelineProps {
    movies: Movie[];
}
interface MoviesByYear {
    [year: number]: Movie[];
}

/**
 * Component that renders a timeline of movies grouped by year.
 * Each movie is represented as a node on the timeline, with additional
 * information displayed on hover.
 *
 * @component
 * @param {TimelineProps} props - The properties for the MovieTimeline component.
 * @param {Array<Movie>} props.movies - An array of movie objects to be displayed on the timeline.
 *
 * @typedef {Object} Movie
 * @property {string} title - The title of the movie.
 * @property {string} year - The release year of the movie.
 * @property {number} imdb_rating - The IMDb rating of the movie.
 * @property {number} oscar_nominations - The number of Oscar nominations the movie received.
 * @property {number} oscar_winning - The number of Oscars the movie won.
 * @property {Array<string>} genre - The genres of the movie.
 *
 * @typedef {Object} TimelineProps
 * @property {Array<Movie>} movies - An array of movie objects to be displayed on the timeline.
 *
 * @typedef {Object.<number, Array<Movie>>} MoviesByYear - An object where the keys are years and the values are arrays of movies released in that year.
 *
 * @returns {JSX.Element} The rendered MovieTimeline component.
 */
export const MovieTimeline: React.FC<TimelineProps> = ({ movies }) => {
    const moviesByYear: MoviesByYear = movies.reduce((acc, movie) => {
        const year = Number(movie.year);
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(movie);
        return acc;
    }, {} as MoviesByYear);

    const years = Object.keys(moviesByYear)
        .map(Number)
        .sort((a, b) => a - b);


    return (
        <div className="rounded-xl relative p-6 bg-gray-800 shadow-lg mb-4">
            <div className='flex flex-row justify-between items-center mb-2'>
                <h2 className="text-2xl font-bold">Movie Timeline</h2>
                <div className='flex flex-row gap-4'>
                    <div className='flex flex-row gap-4'>
                        <div className="w-4 h-4 rounded-full bg-yellow-500">
                        </div>
                        <span className='text-xs'>Oscar Winner</span>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <div className="w-4 h-4 rounded-full bg-gray-500">
                        </div>
                        <span className='text-xs'>Not an Oscar Winner</span>
                    </div>
                </div>

            </div>
            <div className="timeline-scroll scrollbar-thin overflow-visible overflow-x-auto pb-4 h-12 hover:h-48 flex place-items-end px-32 transition-all duration-700">
                <div className="relative h-full min-w-[200%]">
                    {/* Movie nodes */}
                    <div className="absolute z-50 w-full h-full">
                        {years.map(year => {
                            const yearMovies = moviesByYear[year];
                            return yearMovies.map((movie, index) => {
                                const offset = (index - (yearMovies.length - 1) / 2) * 24;
                                return (
                                    <div
                                        key={`${movie.title}-${year}-${index}`}
                                        className={`absolute transform group
                    transition-transform duration-300 ease-in-out top-5`}
                                        style={{
                                            left: `calc(${((years.indexOf(year)) / (years.length - 1)) * 100}% + ${offset}px)`,
                                        }}
                                    >
                                        <div
                                            className={`w-4 h-4 rounded-full cursor-pointer
                      ${movie.oscar_winning > 0 ? 'bg-yellow-500' : 'bg-gray-500'}
                      hover:scale-150 transition-transform`}
                                        />

                                        {/* Hover card */}
                                        <div className=" absolute top-6 left-1/2 -translate-x-1/2 mb-2 w-72 opacity-0 group-hover:opacity-100 transition-opacity z-50 rounded p-4">
                                            <div className="rounded-lg bg-gray-700 p-3 shadow-xl">
                                                <h3 className="font-bold mb-1">{movie.title}</h3>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Star className="w-4 h-4 text-yellow-500" />
                                                    <span>{movie.imdb_rating}</span>
                                                    <Award className="w-4 h-4 text-purple-500 ml-2" />
                                                    <span>{movie.oscar_nominations}</span>
                                                    <Trophy className="w-4 h-4 text-yellow-500 ml-2" />
                                                    <span>{movie.oscar_winning}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {movie.genre.map(g => (
                                                        <span key={g} className="text-xs px-2 py-1 rounded-full bg-primary/20">
                                                            {g}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            });
                        })}
                    </div>
                    {/* Year markers */}


                    {/* Timeline line */}
                    <div className="absolute top-7 w-full h-0.5 bg-gray-700" />


                    <div className="absolute w-full flex justify-between top-0">
                        {years.map(year => (
                            <div key={year} className="text-sm text-gray-400"
                                style={{
                                    left: `calc(${((years.indexOf(year)) / (years.length - 1)) * 100}% )`,
                                }}>
                                {year}
                            </div>
                        ))}
                    </div>
                </div>
              
            </div>
            <div className='absolute right-8 top-20'>
            <ChevronRight className=''/>

            </div>
        </div>
    );
};