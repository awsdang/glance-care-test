import React from 'react';
import Movie from '../types/movie';
import { CountryLanguageChart } from './countryLanguageChart';
import { CountryLanguagePies } from './countryLnaguagePie';
interface Props {
    movies: Movie[];
}

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




