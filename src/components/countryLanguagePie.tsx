import React, { useState } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import Movie from '../types/movie';
import { RenderActiveShape } from './renderActiveShape';
interface Props {
    movies: Movie[];
}


/**
 * CountryLanguagePies component displays two pie charts representing the distribution of languages and countries in a list of movies.
 *
 * @component
 * @param {Props} props - The props for the component.
 * @param {Array} props.movies - An array of movie objects, each containing `language` and `country` properties.
 *
 * @returns {JSX.Element} The rendered CountryLanguagePies component.
 *
 * @example
 * const movies = [
 *   { language: 'English', country: 'USA' },
 *   { language: 'Spanish', country: 'Spain' },
 *   // more movies
 * ];
 * <CountryLanguagePies movies={movies} />
 */
export const CountryLanguagePies: React.FC<Props> = ({ movies }) => {
    const [activeIndexCountry, setActiveIndexCountry] = useState(0);
    const [activeIndexLanguage, setActiveIndexLanguage] = useState(0);

    const languages = Array.from(new Set(movies.flatMap(movie => movie.language)));
    const countries = Array.from(new Set(movies.flatMap(movie => movie.country)));

    const languageData = languages.map(language => {
        const count = movies.filter(movie => movie.language.includes(language)).length;
        return { name: language, value: count };
    });

    const countryData = countries.map(country => {
        const count = movies.filter(movie => movie.country.includes(country)).length;
        return { name: country, value: count };
    });

    const onPieEnterCountry = (_: any, index: number) => {
        setActiveIndexCountry(index);
    };
    const onPieEnterLanguage = (_: any, index: number) => {
        setActiveIndexLanguage(index);
    };
    const totalLanguages = languages.length;
    const totalMovies = movies.length;
    const totalCountries = countries.length;
    return (
        <>
            <div className='flex flex-row w-full justify-between px-6 py-4'>
                <div className='mb-2 w-1/2'>
                <h2 className="text-2xl w-full text-left font-bold">Language Insights</h2>
                <p className='text-sm'>{totalLanguages} languages in {totalMovies} movies</p>
                
                </div>
                <div className='mb-2 w-1/2'>
                <h2 className="text-2xl text-left font-bold">Country Insights</h2>
                <p className='text-sm'>{totalCountries} countries in {totalMovies} movies</p>
                
                </div>
                
            </div>

            <div className='w-full h-72 mb-2 px-6 rounded-lg bg-gray-800 flex flex-row'>
                <ResponsiveContainer width="50%" height='90%'>
                    <PieChart width={800} height={800}>
                        <Pie
                            activeIndex={activeIndexLanguage}
                            activeShape={RenderActiveShape}
                            data={languageData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={onPieEnterLanguage}
                        />
                    </PieChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="50%" height='90%'>
                    <PieChart width={800} height={800}>
                        <Pie
                            activeIndex={activeIndexCountry}
                            activeShape={RenderActiveShape}
                            data={countryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#44bb44"
                            dataKey="value"
                            onMouseEnter={onPieEnterCountry}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            </>
    );
};
