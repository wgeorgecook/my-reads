import React from 'react'
import { Route } from 'react-router-dom'
import Shelf from './Shelf.js'
import SearchPage from './SearchPage.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  getAll() {
    BooksAPI.getAll()
    .then( (books) => this.setState({ books }))
  }

  componentDidMount() {
    this.getAll()
  }

  render() {
    return (
      <div className="app">

      <Route path='/search' exact render={ () => (
          <SearchPage
            defaultBooks={ this.state.books }
          />
        )}
      />

      <Route path='/' exact render={ () => (
          <Shelf
            shelves={[
              { name: "Currently Reading", category: 'currentlyReading' },
              { name: "Want to Read", category: 'wantToRead'},
              { name: "Read", category: 'read'}
            ]}
            defaultBooks ={ this.state.books }
          />
        )}

      />
      </div>
    )
  }
}

export default BooksApp
