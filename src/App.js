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
    .then( (books) => this.setState({ books }))
  }

  updateShelf = (books, shelf) => {
    let oldShelf = this.state[shelf]
    let newShelf = oldShelf.push(books)
    this.setState({ [shelf]: newShelf })
    console.log(this.state)
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
