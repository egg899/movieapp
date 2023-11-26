import React, {useState, useEffect}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites  from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  //const [query, setQuery] = useState('');
  const [movie, setMovie] = useState('');

//Api to bring all the movie images
  const getMovieRequest = async(searchValue) => {
    const url = `https://www.omdbapi.com/?apikey=8ce4d3c9&s=${searchValue}`;


    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson.Search[0]);

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
    
  };







  

  useEffect(()=>{
    getMovieRequest(searchValue);
    
  }, [searchValue]);


  // useEffect(()=>{
  //   const movieFavourites = JSON.parse(
  //     localStorage.getItem('react-movie-app-favourites')
  //     );
  //     setFavourites(movieFavourites);
  // },[]);


  const saveToLocalStorage = (items)=>{
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items) )
  };



  const addFavouriteMovie = (movie) =>{
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID);

      setFavourites(newFavouriteList);
  }

  
  //This is the Api call to get the movie info
  const getMovieInfo = (e)=>{
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=8ce4d3c9&t=${e}`)
		.then((res)=>res.json())
		.then((result)=>setMovie(result));
		// setQuery('');
    // console.log(movie)
  }

  // useEffect(()=>{
  //   getMovieInfo();
  // },[]
  
  // )
    
  // const getInfo = (e) => {
      
  //   // alert(e);
  //   setQuery(e)
  //   getMovieInfo();
   
  // }
   

 
    

  return <div className='container-fluid movie-app'>
    <div className="row d-flex align-items-center mt4 mb-4">
      <MovieListHeading heading="Movies"/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>

    <div className="row">
    <MovieList movies={movies}   getMovieInfo={getMovieInfo} 
    handleFavouritesClick={addFavouriteMovie} favouriteComponent = {AddFavourites}/></div>
    <h2>{movie.Title}</h2><br/>
    {movie.Plot}

    <br/><br/>
    <br/><br/>
    <div className="row d-flex align-items-center mt4 mb-4">
      <MovieListHeading heading="Favourites"/>
    </div>
    <div className="row">
    <MovieList movies={favourites}   
    // getMovieInfo={getMovieInfo} 
    handleFavouritesClick={removeFavouriteMovie} 
    favouriteComponent = {RemoveFavourites}/></div>


  </div>
}

export default App;
