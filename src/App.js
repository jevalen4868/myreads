//React
import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

// Local
import Bookshelf from './Bookshelf';
import SearchBooks from './SearchBooks';

// CSS
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelves: [
      {
        id: 'currentyReading',
        name: 'Currently Reading'
      },
      {
        id: 'wantToRead',
        name: 'Want to Read'
      },
      {
        id: 'read',
        name: 'Read'
      }
    ],
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(((books) => {
        this.setState((() => ({
          books
        })))
      }))
  }

  addBook = (book) => {
    console.log("book", book);
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
            {shelves.map((shelf) => (
              <Bookshelf
                key={shelf.id}
                shelf={shelf.name}
                books={books.filter((book) => (
                  book.shelf === shelf.id
                ))}
              />
            ))}
            <div className="open-search">
              {//NEW LINK
              }
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
        />
        <Route exact path='/search' render={({ history }) => (
          <SearchBooks
            onAddBook={(book) => {
              this.addBook(book);
              history.push('/');
            }}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
