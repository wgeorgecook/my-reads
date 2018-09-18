import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'


class SearchBar extends Component {

    state = {
      query: '',
      availableBooks: [],
    }



    updateQuery = (query) => {
      // Live update search terms
      this.setState({ query });
      this.checkBooks(query)
    }

    checkBooks = (query) => {
      // If the query is empty, reset the shelf
      (query.length > 0) ? this.searchBooks(query) : this.clearBooks()
    }

    searchBooks = (query) => {
      // Load books from the query into the search shelf
      BooksAPI.search(query)
      .then( (availableBooks) => this.setState( {availableBooks} ) )
    }

    clearBooks() {
      // Clear the shelf
      this.setState( { availableBooks: [] })
    }

    updateShelf = (book) => {
        // Pass a book object to update the main view
        this.props.onModifyShelf(book)
    }

    componentDidMount() {
      this.clearBooks()
    }


    render () {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              { (this.state.availableBooks.length > 0) ?
                this.state.availableBooks.map( (book) =>
                  <li key={book.id}>
                  <Book
                    book={book}
                    onModifyShelf={this.updateShelf}
                  />
                  </li>
              ) : null }
                </ol>
            </div>
          </div>
        )
    }
}

export default SearchBar