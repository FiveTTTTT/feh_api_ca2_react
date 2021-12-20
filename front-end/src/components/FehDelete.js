//component to edit a feh entry

import React from 'react';

import axios from "axios";
import qs from 'qs';

import { useParams } from "react-router-dom";


const FehEdit = () => {
    const {id} = useParams();
        axios({
                method:"DELETE",
                url: `/delete-heroes/${id}`
            })

        
    

    return (
        <div>
            <h2>le hero {id}</h2>
        </div>
    );
}

// class FehEdit extends React.Component {
//     constructor(props) {
//         super(props);
//         let id = window.location.href.split('=')[1]
//         this.state = {
//             //the variables retrieved from the server
//         }
//     }

    
//     render() {
//         return ( 
//             <div>
//                  This is the Feh Edit component 
//             </div>
//             // A HTML form 
//         )
//     }
// }

export default FehEdit;