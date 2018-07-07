//React
import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

// Local
import Bookshelf from './Bookshelf';
import SearchBooks from './SearchBooks';

// CSS
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelves: {
      'currentlyReading': [],
      'wantToRead': [],
      'read': []
    },
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(((books) => {
        const shelves = {
          'currentlyReading': [],
          'wantToRead': [],
          'read': []
        };
        // Map book to shelf.
        books.forEach((book) => {
          shelves[book.shelf].push([book.id]);
        })
        // Set state.
        this.setState(() => ({
          shelves: shelves,
          books: books,
        }))
      }))
  }

  shelfChange = (newShelf, book) => {
    this.setState((prevState) => {
      // Create new array of books. Handle deleted book.
      const updatedBooks = prevState.books.filter((prevBook) => {
        const newBook = prevBook;
        // Get rid of the old book entry.
        if (newBook.id === book.id) {
          return null;
        }
        return newBook;
      });
      if (newShelf !== 'none') {
        book.shelf = newShelf;
        updatedBooks.push(book);
      }
      // Return new state.
      return ({
        books: updatedBooks
      })
    })

    // update data in API.
    BooksAPI.update(book, newShelf)
      .then((newShelves) => {
        this.setState((prevState) => {
          // Return new state.
          return ({
            shelves: newShelves
          })
        })
      })
  }

  render() {
    const { shelves, books } = this.state;
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Route exact path='/' render={({ match }) => (
          <div>
            {Object.keys(shelves).map((shelfId) => (
              <div className="list-books"
                key={shelfId}
              >
                <div className="list-books-content">
                  <div className="bookshelf"
                    onDragOver={(event) => {
                      event.preventDefault();
                    }}
                    onDragEnter={(event) => {
                      event.preventDefault();
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault();
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      // Get the id of the target and add the moved element to the target's DOM
                      const data = event.dataTransfer.getData('text/json');
                      this.shelfChange(shelfId, JSON.parse(data));
                    }}
                  >
                    <h2 className="bookshelf-title">{shelfId === 'currentlyReading'
                      ? 'Currenty Reading'
                      : shelfId === 'wantToRead'
                        ? 'Want to Read'
                        : 'Read'}
                    </h2>
                    <Bookshelf
                      books={books.filter((book) => (
                        book.shelf === shelfId
                      ))}
                      onShelfChange={this.shelfChange}
                      match={match}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className='open-search'>
              <Link
                to='/search'
              />
            </div>
          </div>
        )}
        />
        <Route exact path='/search' render={({ match }) => (
          <SearchBooks
            books={books}
            onShelfChange={(newShelf, book) => {
              this.shelfChange(newShelf, book);
            }}
            match={match}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
