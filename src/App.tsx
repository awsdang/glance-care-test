import { useMemo, useEffect, useState } from "react"
import axios from "axios";
import Movie from "./types/movie";
import { SearchElement } from "./components/search";
import { FilterElement } from "./components/filter";
import { MovieTimeline } from "./components/timeline";
import { MovieCard } from "./components/movieCard";
import { Leaderboard } from "./components/leaderboard";
import { CountryLanguageInsights } from "./components/countryLanguageInsights";
import { Loader2 } from 'lucide-react'
import { removeDuplicates } from "./lib/removeDuplicates";


const API_URL = "/api/guK8Sdo"


/**
 * The main component of the application that fetches and displays movie data.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * This component fetches movie data from an API, removes duplicates, and sets the data state.
 * It also provides a search and filter functionality for the movies.
 * The view can be toggled between a chart view and a card view.
 * 
 * @example
 * ```tsx
 * import React from 'react';
 * import App from './App';
 * 
 * const Root = () => (
 *   <React.StrictMode>
 *     <App />
 *   </React.StrictMode>
 * );
 * 
 * export default Root;
 * ```
 * 
 * @returns {JSX.Element} The rendered component.
 */

const App:React.FC = () => {
  const [data, setData] = useState<Movie[]>()
  const [movies, setMovies] = useState<Movie[]>();
  const [view, setView] = useState<string>('chart');

  useMemo(() => {
    if (data) return;
    const fetchDataAsync = async () => {
      const response = await axios.get(API_URL);
      if (response.status !== 200) {
        new Error("Error fetching data");
      }
      const movieData = removeDuplicates(response.data)
      setData(movieData);
    }
    fetchDataAsync();
  }, [data])

  useEffect(() => {
    if (!data) return
    setMovies(data)
  }, [data])

  if (!movies || !data) {
    return (
    <>
    <main className="mx-auto p-4 bg-gray-900 min-h-screen h-full text-white w-full">
      <div className="flex flex-col justify-center items-center mt-24">
    <Loader2 className="mx-auto animate-spin" size={64} />
    Loading
    </div>
    </main></>
    )
  }


  return (
    <>

      <main className="mx-auto p-4 bg-gray-900 min-h-screen h-full text-white w-full">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Movie Data Visualization</h1>
          <h3 className="text-md mb-8">Made by {' '}
            <a className="text-blue-200" href="https://linkedin.com/in/awsdang">Aws Abdulfattah</a> {' '}for Glance Care/Screening Test
          </h3>
          
            <>
              <div className="bg-gray-800 p-4 rounded-lg mb-4 shadow flex flex-row justify-between px-8 gap-4">
                <div className="w-1/2">
                  <SearchElement data={data} movies={movies} onFilter={setMovies} />
                </div>
                <div className="w-1/2">
                  <FilterElement data={data} movies={movies} onFilter={setMovies} />
                </div>


              </div>
            </>
          

                        <div className="">
                   
                          <ul className="flex justify-center mb-4 select-none cursor-pointer" onClick={() => setView(view === 'chart'?'cards': 'chart')}>
                            <div className="flex relative flex-row bg-gray-800 rounded-lg px-1 py-2">
                              
                            <li className="mr-4 z-50" >
                              <label htmlFor="tab1" className={`cursor-pointer py-2 px-4 z-50`}>
                                <span>Charts</span>
                              </label>
                            </li>
                            <li className="z-50">
                              <label htmlFor="tab2" className={`cursor-pointer py-2 px-4 z-50`}>
                                <span>Cards</span>
                              </label>
                            </li>
                            <div className={`absolute w-1/2 h-5/6 top-1/2 -translate-y-1/2 rounded-lg bg-gray-700 transform duration-500 ${view === 'chart'? 'translate-x-0' : 'translate-x-[90%]'}`}></div>
                            </div>
                          </ul>

                          <div className="content">
                            {view === 'chart' &&
                            <section className="p-4">
                                  <MovieTimeline movies={movies} />
                                  <Leaderboard movies={movies} />
                                  <CountryLanguageInsights movies={movies} />
                            </section>}
                            {view === 'cards' &&
                            <section className="p-4">
                              <div className="grid grid-cols-1 gap-2">
                            
                                  {movies.map((movie) => (
                                    <MovieCard key={movie.title} movie={movie} />
                                  ))}
                              </div>
                            </section>}
                          </div>
                        </div>
                 
        </div>
      </main>
    </>
  )
}

export default App
