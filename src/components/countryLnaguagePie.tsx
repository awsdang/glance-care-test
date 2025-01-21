import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import Movie from '../types/movie';

interface Props {
    movies: Movie[];
}

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'#fff'}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff">{`Count ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#ccc">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

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
                <div className='mb-2'>
                <h2 className="text-2xl w-[800px] text-left font-bold">Language Insights</h2>
                <p className='text-sm'>{totalLanguages} languages in {totalMovies} movies</p>
                
                </div>
                <div className='mb-2'>
                <h2 className="text-2xl w-[800px] text-left font-bold">Country Insights</h2>
                <p className='text-sm'>{totalCountries} countries in {totalMovies} movies</p>
                
                </div>
                
            </div>

            <div className='w-full h-72 mb-2 px-6 rounded-lg  bg-gray-800 flex flex-row'>
                <ResponsiveContainer width="100%" height='90%'>
                    <PieChart width={800} height={800}>
                        <Pie
                            activeIndex={activeIndexLanguage}
                            activeShape={renderActiveShape}
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

                <ResponsiveContainer width="100%" height='90%'>
                    <PieChart width={800} height={800}>
                        <Pie
                            activeIndex={activeIndexCountry}
                            activeShape={renderActiveShape}
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
