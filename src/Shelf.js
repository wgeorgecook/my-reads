import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'


class Shelf extends Component {


    updateShelf = (book, shelf) => {
        // Pass the book and shelf to the modify shelf method in the main view
        this.props.onModifyShelf(book, shelf)
    }



    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>Read Somethin'!</h1>
            </div>
            <div className="list-books-content">
              <div className='shelf-map'>
                { this.props.shelves.map( (shelf, index) =>
                <div className="bookshelf" key={index}>
                  <h2 className="bookshelf-title">{ shelf.name }</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        { (this.props.shelfBooks.length > 0) ?
                            this.props.shelfBooks.filter((book) => book.shelf === shelf.category).map((book, bookIndex) =>
                                <li key={bookIndex}>
                                    <Book
                                        book={book}
                                        onModifyShelf={this.updateShelf}
                                        shelfBooks={this.props.shelfBooks}
                                    />
                                </li>
                            ) : `No books in ${shelf.name}, search to add some!`
                        }
                    </ol>
                  </div>
                </div>
                )}

              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
    }
}

export default Shelf