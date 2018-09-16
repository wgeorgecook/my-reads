import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Change from './Change.js'


class SearchBar extends Component {

    state = {
      query: '',
      availableBooks: [],
    }



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

    clearBooks() {
      this.setState( { availableBooks: this.props.defaultBooks })
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
                      { (book.imageLinks.smallThumbnail) ?
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div> :
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(https://www.google.com/search?q=no+image&tbm=isch&source=iu&ictx=1&fir=zK3_S7lOQ0LI6M%253A%252C029W-ajBtZqZzM%252C_&usg=AFrqEzclmm0bX0EC_BHoSGDZD9in3lmmHg&sa=X&ved=2ahUKEwjwxdTx277dAhUTO30KHXXyCwQQ9QEwAHoECAUQBA#)` }}></div>
                      }
                        <Change book={book}/>
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