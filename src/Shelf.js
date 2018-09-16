import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Change from './Change.js'



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
                        { (this.props.books.length > 0) ?
                            this.props.books.filter((book) => book.shelf === shelf.category).map((book, bookIndex) =>
                                <li key={bookIndex}>
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                        <Change
                                            book={book}
                                            onChangeShelf={this.updateShelf}
                                        />
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
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