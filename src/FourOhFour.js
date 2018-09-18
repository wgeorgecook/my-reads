import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {

    render() {
        return (
            <div class="four-oh-four">
                <span id='top-404'>Oh no!</span>
                <p>There's nothing here. You likely took a wrong turn. Please <Link to='/'>head back home!</Link></p>
            </div>
        )
    }
}

export default NotFound