import axios from "axios";
import React from 'react';

import { Route, Routes, Link } from 'react-router-dom';


import { useParams } from "react-router-dom";

// const FehSingle = () => {
//     const {id} = useParams();
//     var {state} = {
//         theHero : {}
//     }
//     var theHero = {};
//     axios({
//             method:"get",
//             url: `/show-heroes/${id}`
//         }).then(
//             (result) => {
//                 console.log(result);
//                 theHero = result;
                
//             }
//         )
//         // theHero = theHero;
//         console.log(theHero);
    
        

//     return (
//         <div>
//             <h2>le hero { state }</h2>
//         </div>
//     );
// }


class FehSingle extends React.Component{
    constructor(props) {
        super(props);
        // let id = window.location.href.split('=')[1]
        this.id = window.location.pathname.split('/');
        console.log(this.id[2]);
        this.state = {
            isLoaded: false,
            theHero: []
        };
    }

    componentDidMount() {
        // axios.get( `/show-heroes/${this.id[2]}`)
        fetch( `/show-heroes/${this.id[2]}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({            
                        isLoaded: true,
                        theHero: result
                    });
                    console.log(this.state.theHero);

                },
                )
    }
    
    render() {
        if (!this.state.isLoaded) {
                
                return ( 
                    <div>
                        Loading...
                        {console.log(this.state)}
                    </div>
                )
        } else {
            return(
                <div>
                    {
                        console.log(this.state),
                        <div>
                            <h2>{this.state.theHero.name}</h2>
                            <h3>{this.state.theHero.title}</h3>
                            <ul>
                                <li>hp : {this.state.theHero.stats.hp}</li>
                                <li>atk : {this.state.theHero.stats.atk}</li>
                                <li>spd : {this.state.theHero.stats.spd}</li>
                                <li>def : {this.state.theHero.stats.def}</li>
                                <li>res : {this.state.theHero.stats.res}</li>
                            </ul>
                            <div>{this.state.theHero.isLegend}</div>
                            <div>{this.state.theHero.isMythic}</div>


                        </div>
                    }
                </div>
            )
        }
    }


}




export default FehSingle;