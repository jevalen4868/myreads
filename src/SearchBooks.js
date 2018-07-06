import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {

  // TODO I have to merge the shelf into books returned from search that have shelves.

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
      /*.error((error) => {
        console.log
      }*/
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
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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