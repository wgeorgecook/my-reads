import React from 'react'
import { Route } from 'react-router-dom'
import Shelf from './Shelf.js'
import SearchPage from './SearchPage.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [], // JUST ADD THINGS TO THIS ARRAY AND FILTER IT
    update: true
  }

  getAll() {
    BooksAPI.getAll()
    .then( (books) => this.setState( { books } ) )
  }

  updateShelf = (book) => {
    (this.state.books.includes(book)) ? this.setState({update: true}) :
    this.setState( (prevState) => (
      { books: prevState.books.concat(book)
    }) )
  }



  componentDidMount() {
    this.getAll()
  }

  render() {
    return (
      <div className="app">
      <Route path='/search' exact render={ () => (
          <SearchPage
            onModifyShelf={this.updateShelf}
          />
        )}
      />

      <Route path='/' exact render={ () => (
          <Shelf
            shelves={
              [{ name: "Currently Reading", category: 'currentlyReading'},
              { name: "Want to Read", category: 'wantToRead'},
              { name: "Read", category: 'read'}]
            }
            books={this.state.books}
            onModifyShelf={this.updateShelf}
          />
        )}

      />
      </div>
    )
  }
}

export default BooksApp
