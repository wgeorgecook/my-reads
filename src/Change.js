import React, { Component } from 'react'

class Change extends Component {

    changeShelf = (event) => {
        console.log(event.target.value)
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select onChange={this.changeShelf}>
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