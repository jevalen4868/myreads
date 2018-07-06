import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array,
    onShelfChange: PropTypes.func.isRequired,
  }

  state = {
    search: '',
  }

  executeSearch = (search) => {
    // Update search asap.
    this.setState((prevState) => ({
      search: search
    }))
    // Then search for books.
    BooksAPI.search(search)
      .then((books) => {
        books = books && !books.error
          ? books.map((book) => {
            for (let i = 0; i < this.props.books.length; i++) {
              const propBook = this.props.books[i];
              if (book.id === propBook.id) {
                book.shelf = propBook.shelf;
                break;
              }
            }
            return book;
          })
          : []
        this.setState((prevState) => ({
          books: books
        }))
      })
  }


  render() {
    const { search, books } = this.state;
    const { onShelfChange } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              name="search"
              onChange={(event) => this.executeSearch(event.target.value)}
              value={search}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookshelf
            books={books}
            onShelfChange={onShelfChange}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks;