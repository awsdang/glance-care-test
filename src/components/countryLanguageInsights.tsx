import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import Movie from '../types/movie';
import { CountryLanguageHeatmap } from './countryLanguageHeatmap';
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
            <CountryLanguageHeatmap movies={movies} />
        </div>
        </>
    );
};




