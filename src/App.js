import React from 'react'
import { Route } from 'react-router-dom'
import Shelf from './Shelf.js'
import SearchPage from './SearchPage.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [], // JUST ADD THINGS TO THIS ARRAY AND FILTER IT
  }

  getAll() {
    BooksAPI.getAll()
    .then( (books) => this.setState( { books } ) )
    .then(console.log(this.state.books))
    /*
    .then( (books) => books.map( (book) => // console.log(this.state[book.shelf]) ) )

      this.setState( { [book.shelf]: book } )
    ))
    */

    // .then( (books) => books.map( (book) => this.setState({ [book.shelf]: book })))
  }

  updateShelf = (book) => {

    this.setState( (prevState) => (
      { book: prevState[book].concat(book)
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
