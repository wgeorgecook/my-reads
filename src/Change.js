import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Change extends Component {

    registerChange = (e) => {
        // This is our new shelf to pass to the book object
        this.changeShelf(e.target.value)
    }

    changeShelf(newShelf) {
        // Update the book's shelf on the object directly
        let book = this.props.book
        book.shelf = newShelf
        // Pass onto the change shelf method
        this.props.onChangeShelf(book)
        // Update the book's shelf on the backend
        BooksAPI.update(book, newShelf)
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select onChange={this.registerChange} value={this.props.book.shelf || "none"}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default Change