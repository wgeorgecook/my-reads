import React from 'react'
import { Route } from 'react-router-dom'
import Shelf from './Shelf.js'
import SearchPage from './SearchPage.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
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

  updateShelf = (books, shelf, oldShelf) => {
    (oldShelf) ?
    this.setState( (prevState) => (
      {[shelf]: prevState[shelf].concat(books),
      [oldShelf]: prevState[oldShelf].splice( (oldShelf.indexOf(books)), 1)
    }) )
    :
    this.setState( (prevState) => (
      {[shelf]: prevState[shelf].concat(books)
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
              [{ name: "Currently Reading", category: 'currentlyReading', items: this.state.currentlyReading},
              { name: "Want to Read", category: 'wantToRead', items: this.state.wantToRead},
              { name: "Read", category: 'read', items: this.state.read}]
            }
            onModifyShelf={this.updateShelf}
          />
        )}

      />
      </div>
    )
  }
}

export default BooksApp
