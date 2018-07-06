import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string
    }),
    books: PropTypes.array,
    onShelfChange: PropTypes.func.isRequired,
  }
  render() {
    const { books, onShelfChange, match } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && books.length > 0 && books.map((book) => (
            <Book
              key={book.id}
              book={book}
              onShelfChange={onShelfChange}
              match={match}
            />
          ))}
        </ol>
      </div>
    )
  }
}

export default Bookshelf;