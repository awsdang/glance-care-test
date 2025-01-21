import { useMemo, useEffect, useState } from "react"
import axios from "axios";
import Movie from "./types/movie";
import { SearchElement } from "./components/search";
import { FilterElement } from "./components/filter";
import { MovieTimeline } from "./components/timeline";
import { MovieCard } from "./components/movieCard";



const API_URL = "/api/guK8Sdo"


const removeDuplicates = (movies: Movie[]): Movie[] => {
  const seenTitles = new Set<string>();
  return movies.filter((movie) => {
    if (seenTitles.has(movie.title)) {
      return false;
    } else {
      seenTitles.add(movie.title);
      return true;
    }
  });
};

const App = () => {
  const [data, setData] = useState<Movie[]>()
  const [movies, setMovies] = useState<Movie[]>();


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

  return (
    <>

      <main className="mx-auto p-4 bg-gray-900 min-h-screen h-full text-white w-full">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Movie Data Visualization</h1>
          <h3 className="text-md mb-8">Made by {' '}
            <a className="text-blue-200" href="https://linkedin.com/in/awsdang">Aws Abdulfattah</a> {' '}for Glance Care/Screening Test
          </h3>
          {data && movies &&
            <>
              <div className="bg-gray-800 p-4 rounded-lg mb-4 shadow flex flex-row justify-between px-8 gap-4">
                <div className="w-1/2">
                  <SearchElement data={data} movies={movies} onFilter={setMovies} />
                </div>
                <div className="w-1/2">
                  <FilterElement data={data} movies={movies} onFilter={setMovies} />
                </div>


              </div>

              <MovieTimeline movies={movies} />


            </>
          }

          
          
          <div className="">
            <div className="bg-gray-800 p-2 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
            {movies && movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
            </div>

          </div>
        </div>
      </main>
    </>
  )
}

export default App
