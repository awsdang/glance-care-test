import React from 'react';
import Movie from '../types/movie';

interface Props {
    movies: Movie[];
}

export const CountryLanguageHeatmap: React.FC<Props> = ({ movies }) => {
    // Get unique countries and languages
    const countries = Array.from(new Set(movies.flatMap(movie => movie.country)));
    const languages = Array.from(new Set(movies.flatMap(movie => movie.language)));

    // Calculate the frequency of each country-language pair
    const heatmapData = countries.map(country => {
        const countryMovies = movies.filter(movie => movie.country.includes(country));
        return languages.map(language => {
            const count = countryMovies.filter(movie =>
                movie.language.includes(language)
            ).length;
            return { country, language, count };
        });
    }).flat();

    // Find the maximum count for scaling
    const maxCount = Math.max(...heatmapData.map(d => d.count));

    // Calculate color intensity based on count
    const getColorIntensity = (count: number) => {
        if (count === 0) return 'rgba(0, 0, 0, 0)';
        const intensity = Math.floor((count / maxCount) * 120) + 180;
        return `rgb(${intensity}, ${intensity}, ${intensity}, ${Math.floor((count / maxCount) * 100)})`;
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Country & Language Heatmap</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2"></th>
                            {languages.map(lang => (
                                <th key={lang} className="px-4 py-2 text-sm font-semibold text-gray-300">
                                    {lang}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map(country => (
                            <tr key={country}>
                                <td className="px-4 py-2 font-semibold text-gray-300">{country}</td>
                                {languages.map(language => {
                                    const cell = heatmapData.find(
                                        d => d.country === country && d.language === language
                                    );
                                    const count = cell?.count || 0;
                                    return (
                                        <td
                                            key={`${country}-${language}`}
                                            className={`px-4 py-2 text-center ${count === 0 ? '' : ''}`}
                                            style={{
                                                background: getColorIntensity(count),
                                                transition: 'background-color 0.3s'
                                            }}
                                        >
                                            {count > 0 && (
                                                <span className="font-semibold text-gray-800">
                                                    {count}
                                                </span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-600">
                <div className="w-4 h-4 bg-gray-500"></div>
                <span className='text-white'>Low</span>
                <div className="w-4 h-4 bg-gray-300"></div>
                <span className='text-white'>Medium</span>
                <div className="w-4 h-4 bg-white"></div>
                <span className='text-white'>High</span>
            </div>
        </div>
    );
};