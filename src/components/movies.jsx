import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService.js';
import { getGenres } from '../services/fakeGenreService.js';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    //movies per page
    pageSize: 4
  };

  //method is called when instance of this component is rendered in the DOM
  componentDidMount() {
    //added All Genres object for our filter by appending it to the existing genres array
    const genres = [{ name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = (movie) => {
    //get all movies except one being deleted
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = (movie) => {
    //as with Delete, we don't want to modify state directly so we make a copy of all movies here
    const movies = [...this.state.movies];
    //find index of the passed object and store it
    const index = movies.indexOf(movie);
    //copying all properties here
    movies[index] = { ...movies[index] };
    //toggle logic (if true, become false, and vice versa)
    movies[index].liked = !movies[index].liked;
    //Passing new movies array to state
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    //gets current page
    this.setState({ currentPage: page });
  };

  // added 'currentPage: 1' so that the page resets to 1 when we are on another page when it gets filtered
  handleGenreSelect = (genre) => {
    //gets currently selected genre
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    //refactoring and renaming length to movie count
    const { length: count } = this.state.movies;

    //refactoring and renaming movies to allMovies since it would otherwise duplicate declaration
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies
    } = this.state;

    //conditional total movies message
    if (count === 0) return <p>There are no movies in the database.</p>;

    //filter genre logic -- if selected genre is truthy, then return that genre, else all movies are listed
    //edited it to add '&& selectedGenre._id' so that our 'All Genres' filter shows all results instead of none
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    //pagination updated so that filtered results are shown by page
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
