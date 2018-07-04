import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  }
  render() {
    const {shelf, books} = this.props;

    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelf}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map((book) => (
                    <Book
                      key={book.id}
                      book={book}
                    />
                  ))}                  
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelf;