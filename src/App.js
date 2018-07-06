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

  addBook = (book) => {
    console.log("book", book);
  }

  shelfChange = (newShelf, book) => {
    // update data in API.
    BooksAPI.update(book, newShelf)
      .then((newShelves) => {
        this.setState((prevState) => {
          // Create new array of books. Handle deleted book.
          const updatedBooks = prevState.books.filter((prevBook) => {
            const newBook = prevBook;
            if (newBook.id === book.id) {
              newBook.shelf = newShelf;
            }
            // If set to none, we need to delete the book.
            if (newBook.shelf !== 'none') {
              return newBook;
            }
            return null;
          });
          // Handle add book
          let bookExists = false;
          for (let i = 0; i < updatedBooks.length; i++) {
            bookExists = updatedBooks[i].id === book.id;
            if(bookExists) {
              break;
            }
          }
          if (!bookExists) {
            book.shelf = newShelf;
            updatedBooks.push(book);
          }
          // Return new state.
          return ({
            books: updatedBooks,
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
        <Route exact path='/' render={() => (
          <div>
            {Object.keys(shelves).map((shelfId) => (
              <div className="list-books"
                key={shelfId}
              >
                <div className="list-books-content">
                  <div className="bookshelf">
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
        <Route exact path='/search' render={({ history }) => (
          <SearchBooks
            books={books}
            onShelfChange={(newShelf, book) => {
              this.shelfChange(newShelf, book);
            }}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
