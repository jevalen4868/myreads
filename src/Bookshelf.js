import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const Bookshelf = (props) => {
  const { books, onShelfChange, match } = props;
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

Bookshelf.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  books: PropTypes.array,
  onShelfChange: PropTypes.func.isRequired,
}

export default Bookshelf;