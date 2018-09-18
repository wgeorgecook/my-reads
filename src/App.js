import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Shelf from './Shelf.js'
import SearchPage from './SearchPage.js'
import NotFound from './FourOhFour.js'
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
        <Switch>
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

          <Route component={NotFound}/>

        </Switch>
      </div>
    )
  }
}

export default BooksApp
