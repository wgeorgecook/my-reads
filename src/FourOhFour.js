import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {

    render() {
        return (
            <div class="404">Oh no! There's nothing here. You likely took a wrong turn. Please <Link to='/'>head back home!</Link></div>
        )
    }
}

export default NotFound