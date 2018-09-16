import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Change extends Component {

    registerChange = (e) => {
        // console.log(e.target.value)
        this.changeShelf(e.target.value)
    }

    changeShelf(value) {
        // console.log(this.props.book.shelf)
        // this.props.book.shelf = value
        this.props.onChangeShelf(this.props.book, value)
        BooksAPI.update(this.props.book, value)


    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select onChange={this.registerChange} value={this.props.book.shelf}>
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