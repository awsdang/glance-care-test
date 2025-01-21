import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Movie from '../types/movie';

interface Props {
    movies: Movie[];
}

const colors = ['#1976D2', '#2196F3', '#64B5F6', '#90CAF9', '#BBDEFB', '#E3F2FD'];

/**
 * CountryLanguageChart component displays a bar chart that provides insights into the distribution
 * of movies by language and country.
 *
 * @component
 * @param {Props} props - The props for the component.
 * @param {Array} props.movies - An array of movie objects, where each movie object contains `country` and `language` properties.
 *
 * @returns {JSX.Element} A responsive bar chart visualizing the number of movies per language and country.
 *
 * @example
 * const movies = [
 *   { country: 'USA', language: 'English' },
 *   { country: 'France', language: 'French' },
 *   { country: 'USA', language: 'Spanish' },
 *   // more movie objects
 * ];
 * 
 * <CountryLanguageChart movies={movies} />
 */
export const CountryLanguageChart: React.FC<Props> = ({ movies }) => {
    const countries = Array.from(new Set(movies.flatMap(movie => movie.country)));
    const languages = Array.from(new Set(movies.flatMap(movie => movie.language)));

    const heatmapData = languages.map(language => {
        const data: { [key: string]: number | string } = { language };
        const languageMovies = movies.filter(movie => movie.language.includes(language));
        countries.forEach(country => {
            data[country] = languageMovies.filter(movie => movie.country.includes(country)).length;
        });
        return data;
    });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Language & Country Insights v2</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={heatmapData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="language" />
                    <YAxis />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937' }} 
                        formatter={(value, name) => [value, name]}
                    />
                    <Legend />
                    {countries.map((country, index) => (
                        <Bar
                            key={country}
                            dataKey={country}
                            stackId="a"
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
