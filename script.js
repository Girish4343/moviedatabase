
 document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  
  searchBtn.addEventListener('click', () => {
    const query = prompt('Enter movie name:');
    if (query) {
      searchMovies(query);
    }
  });

  async function searchMovies(query) {
    try {
      const response = await fetch(`/api/movies/search?query=${query}`);
      const data = await response.json();
      displayMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  function displayMovies(movies) {
    const container = document.querySelector('.container');
    container.innerHTML = '';

    if (movies.length === 0) {
      container.innerHTML = '<p>No movies found.</p>';
      return;
    }

    movies.forEach(movie => {
      const movieDiv = document.createElement('div');
      movieDiv.classList.add('movie');

      const title = document.createElement('h2');
      title.textContent = movie.title;

      const releaseDate = document.createElement('p');
      releaseDate.textContent = `Release Date: ${movie.release_date}`;

      movieDiv.appendChild(title);
      movieDiv.appendChild(releaseDate);
      container.appendChild(movieDiv);
    });
  }
});
