import React from 'react';
import Movie from '../types/movie';
import { CountryLanguageChart } from './countryLanguageChart';
import { CountryLanguagePies } from './countryLanguagePie';
interface Props {
    movies: Movie[];
}

/**
 * CountryLanguageInsights component
 *
 * This component renders insights about movies based on their country and language.
 * It displays two sections: one for pie charts and another for a detailed chart.
 *
 * @component
 * @param {Props} props - The props for the component.
 * @param {Array} props.movies - An array of movie objects to be analyzed.
 *
 * @example
 * const movies = [
 *   { title: 'Movie 1', country: 'USA', language: 'English' },
 *   { title: 'Movie 2', country: 'France', language: 'French' },
 * ];
 * <CountryLanguageInsights movies={movies} />
 */
export const CountryLanguageInsights: React.FC<Props> = ({ movies }) => {
    
    return (
        <>
        <div className='w-full mb-4 p-4 rounded-lg shadow-lg bg-gray-800 flex flex-col'>
            <CountryLanguagePies movies={movies} />
        </div>
        <div className='w-full mb-4 p-4 rounded-lg shadow-lg bg-gray-800 flex flex-col'>
            <CountryLanguageChart movies={movies} />
        </div>
        </>
    );
};




