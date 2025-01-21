import React, { useState } from 'react';
import Movie from '../types/movie';

interface Props {
    movies: Movie[];
}

export const Leaderboard: React.FC<Props> = ({ movies }) => {
    const [showNominations, setShowNominations] = useState(true);

    const oscars = movies.map(movie => ({
        title: movie.title,
        nominations: movie.oscar_nominations,
        wins: movie.oscar_winning,
    })).sort((a, b) => showNominations ? b.nominations - a.nominations : b.wins - a.wins).slice(0, 10);

    const cast = movies.flatMap(movie => 
        movie.cast.map(member => ({
                cast: member,
                nominations: movie.oscar_nominations,
                wins: movie.oscar_winning,
        }))
    ).sort((a, b) => showNominations ? b.nominations - a.nominations : b.wins - a.wins).slice(0, 10);

    return (
        <div className="p-6 rounded-lg shadow-lg bg-gray-800 mb-4">
            <button 
                className="mb-4 p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700" 
                onClick={() => setShowNominations(!showNominations)}
            >
                {showNominations ? 'Show Wins' : 'Show Nominations'}
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Top 10 Movies by {showNominations ? 'Oscar Nominations' : 'Oscar Wins'}</h2>
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 text-left">#</th>
                                <th className="py-2 text-left">Title</th>
                                <th className="py-2 text-right">{showNominations ? 'Nominations' : 'Wins'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {oscars.map((movie, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2">{index + 1}</td>
                                    <td className="py-2">{movie.title}</td>
                                    <td className="py-2 text-right">{showNominations ? movie.nominations : movie.wins}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Top 10 Actors by {showNominations ? 'Oscar Nominations' : 'Oscar Wins'}</h2>
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 text-left">#</th>
                                <th className="py-2 text-left">Actors</th>
                                <th className="py-2 text-right">{showNominations ? 'Nominations' : 'Wins'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cast.map((member, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2">{index + 1}</td>
                                    <td className="py-2">{member.cast}</td>
                                    <td className="py-2 text-right">{showNominations ? member.nominations : member.wins}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};