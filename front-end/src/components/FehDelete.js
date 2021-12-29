//component to edit a feh entry

import React from 'react';

import axios from "axios";

class FehDelete extends React.Component {
    constructor(props) {
        super(props);
        this.id = window.location.href.split('/')[4];
    }

    componentDidMount () {
        axios({
            method:"DELETE",
            url: `/delete-heroes/${this.id}`
        }).then(
            window.location.href = "/"
        );
    }

    
    render() {
        return ( 
            <div>hello</div>
        )
    }
}

export default FehDelete;