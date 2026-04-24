const fetchMovieData = async (movieId) => {
    try {
       const response = await fetch(`http://127.0.0.1:8080/api/movies`).then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json(); // Parses JSON body
      })
        .then(data => data)
        .catch(error => console.error('Fetch error:', error));
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return null;
    }
};

export default fetchMovieData;