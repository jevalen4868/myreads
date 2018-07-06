import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array,
    onShelfChange: PropTypes.func.isRequired,
  }
  render() {
    const { books, onShelfChange } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && books.length > 0 && books.map((book) => (
            <Book
              key={book.id}
              book={book}
              onShelfChange={onShelfChange}
            />
          ))}
        </ol>
      </div>
    )
  }
}

export default Bookshelf;