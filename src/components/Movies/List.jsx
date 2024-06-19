import React, { useEffect, useState } from 'react';
import styles from './List.module.css';

const List = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  console.log(movies);
  
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '84d716def9mshfda12e4c205103ep172fcejsncd20c7a2ef26',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    };
    
    const fetchMovies = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null);
      try {
        const response = await fetch(
          `https://moviesdatabase.p.rapidapi.com/titles?genre=${genre}&year=2020`,
          options
        );

        if (!response.ok) {
          console.error('Failed to fetch movies:', response.status, response.statusText);
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        console.log('API Response:', data); // Log the entire response

        if (data && data.results) {
          setMovies(data.results);
        } else {
          setMovies([]);
          setError('No movies found for the given genre and year.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to load movies.');
        setMovies([]);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
      
      // try {
      //   const response = await fetch(
      //     `https://moviesdatabase.p.rapidapi.com/titles?genre=${genre}&year=2020`,
      //     options
      //   );
      //   if (!response.ok) {
      //     console.error('Failed to fetch movies:', response.status, response.statusText);
      //     throw new Error('Failed to fetch movies');
      //   }
      //   const data = await response.json();
      //   const moviesData = data.results || [];
      //   setMovies(moviesData);
      // } catch (error) {
      //   console.error(error);
      //   setMovies([]);
      // }
    };
    
    fetchMovies();
  }, [genre]);
 
  return (
    // <>
    //   {movies.length > 0 ? (
    //     <>
    //       <p className={styles.heading} style={{ overflowY: 'hidden' }}>
    //         {genre}
    //       </p>
    //       <div style={{ display: 'flex', overflow: 'hidden', marginLeft: '2vw' }}>
    //         {movies.map((movie, idx) => (
    //           <div key={idx} style={{ width: '20vw', margin: '2vw' }}>
    //             <img
    //               src={movie?.primaryImage?.url}
    //               style={{
    //                 objectFit: 'cover',
    //                 width: '20vw',
    //                 height: '15vh',
    //                 borderRadius: '12px',
    //               }}
    //               alt='movie_poster'
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     </>
    //   ) : (
    //     <div style={{color:'white', fontSize:15}}>Loading...</div>
    //   )}
    // </>

    <>
    {loading ? (
      <div style={{ color: 'white', fontSize: 15 }}>Loading...</div>
    ) : error ? (
      <div style={{ color: 'red', fontSize: 15 }}>{error}</div>
    ) : (
      <>
        <p className={styles.heading} style={{ overflowY: 'hidden' }}>
          {genre}
        </p>
        <div style={{ display: 'flex', overflow: 'hidden', marginLeft: '2vw' }}>
          {movies.map((movie, idx) => (
            <div key={idx} style={{ width: '20vw', margin: '2vw' }}>
              {movie?.primaryImage?.url ? (
                <img
                  src={movie.primaryImage.url}
                  style={{
                    objectFit: 'cover',
                    width: '20vw',
                    height: '15vh',
                    borderRadius: '12px',
                  }}
                  alt='movie_poster'
                />
              ) : (
                <div
                  style={{
                    width: '20vw',
                    height: '15vh',
                    borderRadius: '12px',
                    backgroundColor: 'grey',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  No Image
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    )}
  </>
  );
};

export default List;
