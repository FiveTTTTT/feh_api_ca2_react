//component to edit a feh entry

import React from 'react';

import axios from "axios";
// import qs from 'qs';

// import { useParams } from "react-router-dom";
// import FeHeroes from './FeHeroes';


// const FehDelete = (props) => {
//     const {id} = useParams();
//     function deleteHero() {
//         axios({
//                 method:"DELETE",
//                 url: `/delete-heroes/${id}`
//             })
//     }


        
    

//     return (
//         <div id='delete-alert'>

//         </div>
//     );
// }



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