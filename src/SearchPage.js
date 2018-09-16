import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBar extends Component {

    state = {
      query: '',
      availableBooks: [],
    }

    changeButton =
        <div className="book-shelf-changer">
        <select>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
        </div>


    updateQuery = (query) => {
      this.setState({ query });
      this.checkBooks(query)
    }

    checkBooks = (query) => {
      (query.length > 0) ? this.searchBooks(query) : this.clearBooks()
    }

    searchBooks = (query) => {
      BooksAPI.search(query)
      .then( (availableBooks) => this.setState( {availableBooks} ) )
      .then( () => console.log(this.state.availableBooks) )

    }

    clearBooks = () => {
      BooksAPI.getAll().then( (availableBooks) => this.setState( {availableBooks} ) )
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
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                        {this.changeButton}
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
              ) : null }
                </ol>
            </div>
          </div>
        )
    }
}

export default SearchBar