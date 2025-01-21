import React, { useEffect, useState } from 'react';
import Movie from '../types/movie';

interface Props {
    movies: Movie[];
}

export const Leaderboard: React.FC<Props> = ({ movies }) => {
    const [view, setView] = useState<string>('');
    const [oscars, setOscars] = useState<{ title: string; nominations: number; wins: number; }[]>([]);
    const [cast, setCast] = useState<{ cast: string; nominations: number; wins: number; }[]>([]);

    useEffect(()=>{
        const oscarsData = movies.map(movie => ({
            title: movie.title,
            nominations: movie.oscar_nominations,
            wins: movie.oscar_winning,
        })).sort((a, b) => view ==="nominations" ? b.nominations - a.nominations : b.wins - a.wins).slice(0, 10);
    
        const castData = movies.flatMap(movie => 
            movie.cast.map(member => ({
                    cast: member,
                    nominations: movie.oscar_nominations,
                    wins: movie.oscar_winning,
            }))
        ).sort((a, b) => view ==="nominations" ? b.nominations - a.nominations : b.wins - a.wins).slice(0, 10);
        
        setOscars(oscarsData);
        setCast(castData);
    },[view, setCast, setOscars])
    
    return (
        <div className="p-6 rounded-lg shadow-lg bg-gray-800 mb-4">
            <div className='flex flex-row gap-4'>
            <button 
                className="mb-4 p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700" 
                onClick={() => setView(view === 'wins' ? '' : 'wins')}
            >
                {view === "wins" ? 'Hide Win Leaderboard' : 'Show Oscar Win Leaderboard'}
            </button>
            <button 
                className="mb-4 p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700" 
                onClick={() => setView(view === 'nominations' ? '' : 'nominations')}
            >
                {view === "nominations" ? 'Hide Nominations Leaderboard' : 'Show Nominations Leaderboard'}
            </button>
            </div>
            { view !== '' &&
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Top 10 Movies by {view === "nominations" ? 'Oscar Nominations' : view ==="wins"&&'Oscar Wins'}</h2>
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 text-left">#</th>
                                <th className="py-2 text-left">Title</th>
                                <th className="py-2 text-right">{view === "nominations" ? 'Nominations' : view ==="wins"&&'Wins'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {oscars.map((movie, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2">{index + 1}</td>
                                    <td className="py-2">{movie.title}</td>
                                    <td className="py-2 text-right">{view === "nominations" ? movie.nominations : view ==="wins"&& movie.wins}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Top 10 Actors by {view ==="nominations" ? 'Oscar Nominations' : 'Oscar Wins'}</h2>
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 text-left">#</th>
                                <th className="py-2 text-left">Actors</th>
                                <th className="py-2 text-right">{view ==="nominations" ? 'Nominations' : 'Wins'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cast.map((member, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2">{index + 1}</td>
                                    <td className="py-2">{member.cast}</td>
                                    <td className="py-2 text-right">{view ==="nominations" ? member.nominations :  view ==="wins"&& member.wins}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            }
        </div>
    );
};