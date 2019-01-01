import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService.js';
import Like from './common/like';

class Movies extends Component {
  state = {
    movies: getMovies()
  };

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

  render() {
    //refactoring and renaming length to movie count
    const { length: count } = this.state.movies;

    //conditional total movies message
    if (count === 0) return <p>There are no movies in the database.</p>;
    return (
      <React.Fragment>
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
            {this.state.movies.map((movie) => (
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
      </React.Fragment>
    );
  }
}

export default Movies;
