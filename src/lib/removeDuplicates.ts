import Movie from "../types/movie";

export const removeDuplicates = (movies: Movie[]): Movie[] => {
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