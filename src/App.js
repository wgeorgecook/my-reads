import React from 'react'
import { Route } from 'react-router-dom'
import Shelf from './Shelf.js'
import SearchPage from './SearchPage.js'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
      <Route path='/search' exact render={ () => (
          <SearchPage />
        )}
      />
      <Route path='/' exact render={ () => (
          <Shelf
            shelves={ [ "Currently Reading", "Want to Read", "Read" ] }
          />
        )}
      />
      </div>
    )
  }
}

export default BooksApp
