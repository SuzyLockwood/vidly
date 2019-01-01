import React, { Component } from 'react';
import Like from './common/like';
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
    this.setState({ movies: getMovies(), genres: getGenres() });
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

  handleGenreSelect = (genre) => {
    console.log(genre);
  };

  render() {
    //refactoring and renaming length to movie count
    const { length: count } = this.state.movies;

    //refactoring and renaming movies to allMovies since it would otherwise duplicate declaration
    const { pageSize, currentPage, movies: allMovies } = this.state;

    //conditional total movies message
    if (count === 0) return <p>There are no movies in the database.</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            textProperty="name"
            valueProperty="_id"
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {count} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={count}
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
