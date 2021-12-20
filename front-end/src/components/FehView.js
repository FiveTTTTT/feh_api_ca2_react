//component to edit a feh entry

import React from 'react';

class FehView extends React.Component {
    constructor(props) {
        super(props);
        // let id = window.location.href.split('=')[1]
        this.state = {
            //the variables retrieved from the server
        }
    }
    render() {
        return ( 
            <div>
                 This is the Feh Edit component 
            </div>
            // A HTML form 
        )
    }
}

export default FehView;