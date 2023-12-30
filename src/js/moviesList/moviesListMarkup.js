function createMarkup(movies) {
  const markup = movies.map(movie => {
    return `
      <li class="movie-card" data-id=${movie.id}>
        <img
          src=${checkImageAvailability(movie.poster_path)} 
          alt="movie-poster"
        >
        <h2>${movie.title}</h2>
        <span>${getMovieGenres(movie.genre_ids)} | </span>
        <span>${getReleaseYear(movie.release_date)}</span>
      </li>
    `;
  });

  return markup.join('');
}

function checkImageAvailability(posterPath) {
  if (posterPath === null) {
    return 'https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?k=6&m=1216251206&s=612x612&w=0&h=G8kmMKxZlh7WyeYtlIHJDxP5XRGm9ZXyLprtVJKxd-o=';
  }

  return `https://image.tmdb.org/t/p/w342${posterPath}`;
}

function getReleaseYear(releaseDate) {
  return new Date(releaseDate).getFullYear() || 'Unknown';
}

function getMovieGenres(movieGenreIds) {
  const movieGenres = movieGenreIds.map(movieId => GENRES[movieId]);

  if (movieGenres.length > 2) {
    movieGenres.splice(2, movieGenres.length - 2, 'Other');
    return movieGenres.join(', ');
  }

  return movieGenres.join(', ');
}

const GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export default createMarkup;

export { getMovieGenres };
