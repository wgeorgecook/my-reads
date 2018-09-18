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

  updateShelfOld = (book) => {
    // If the array already contains the book, just refresh the view
    // to show it in the new shelf
    (this.state.books.includes(book)) ? this.setState({update: true}) :
    this.setState( (prevState) => (
      { books: prevState.books.concat(book)
    }) )
  }

  updateShelf = (book) => {
    // If the array already contains the book, just refresh the view
    // to show it in the new shelf
    let currentShelves = this.state.books.filter( books => (books.id === book.id) )
    if (currentShelves.length > 0) {
      currentShelves[0].shelf = book.shelf
      this.setState( {update: true})
    } else {
      this.setState( (prevState) => (
        {books: prevState.books.concat(book)}
      ))
    }
  }



  componentDidMount() {
    // Populate some sample books
    this.getAll()
  }

  render() {
    return (
      <div className="app">
      <Route path='/search' exact render={ () => (
          <SearchPage
            onModifyShelf={this.updateShelf}
            shelfBooks={this.state.books}
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
            shelfBooks={this.state.books}
            onModifyShelf={this.updateShelf}
          />
        )}

      />
      </div>
    )
  }
}

export default BooksApp
