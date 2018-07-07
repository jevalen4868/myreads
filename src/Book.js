import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => {
  const { match } = props;
  const { imageLinks, shelf, title, authors } = props.book;
  const bookCoverStyle = { width: 128, height: 193, backgroundImage: `url("${imageLinks.thumbnail}")` };
  return (
    <li draggable={match.url === '/search' ? 'false' : 'true'} onDragStart={(event) => event.dataTransfer.setData('text/json', JSON.stringify(props.book))}>
      <div className="book">
        <div className="book-top">
          {imageLinks &&
            <div className="book-cover" style={bookCoverStyle}></div>
          }
          {match.url !== '/search' &&
            <a href="#"
              onClick={(event) => {
                event.preventDefault();
                props.onShelfChange('none', props.book)
              }}>
              <span className="book-shelf-remove">
                <span>X</span>
              </span>
            </a>
          }
          <div className="book-shelf-changer">
            <select value={shelf ? shelf : 'none'} onChange={(event) => props.onShelfChange(event.target.value, props.book)
            }>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors &&
          <div className="book-authors">{authors.join(', ')}</div>
        }
      </div>
    </li>
  )
}

Book.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  book: PropTypes.shape({
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    shelf: PropTypes.string,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array
  }).isRequired,
  onShelfChange: PropTypes.func.isRequired,
}

export default Book;