import React, { Component } from 'react'
import Change from './Change.js'




class Book extends Component {

    updateShelf = (book) => {
        // Pass a book object to update the main view
        this.props.onModifyShelf(book)
    }


    render() {
        return (
            <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})` }}></div>

              <Change
                  book={this.props.book}
                  onChangeShelf={this.updateShelf}
                  shelfBooks={this.props.shelfBooks}
              />

            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(", ") : ''}</div>
          </div>
        )
    }
}

export default Book