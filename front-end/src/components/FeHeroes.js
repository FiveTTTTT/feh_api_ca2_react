//component to edit a feh entry

import React from 'react';
// import axios from "axios";
import { Link } from 'react-router-dom';
// import FehSingle from './FehSingle';
// import FehDelete from './FehDelete';


class FeHeroes extends React.Component {
    constructor(props) {
        super(props);
        // let id = window.location.href.split('=')[1]
        this.state = {
            isLoaded: false,
            feHeroes: [],
        }
    }
    

    componentDidMount(){
        
        // axios.get('/show-heroes')
        //     .then(function (response) {
        //         // console.log(response.data); 
        //         this.setState({ 
        //             feHeroes: response.data,
        //             isLoaded: true
        //          })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })

        fetch("/show-heroes")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        feHeroes: result,
                    });
                },
            )
    }


    render() {
        
        // function showOneHero(id) {
            
        
        // }
        if (!this.state.isLoaded) {
            
            return ( 
                <div>
                     Loading...
                     {console.log(this.state)}
                </div>
            )
        } else {

            return(
                <div id='heroes-list'>
                    <ul>
                        {
                            this.state.feHeroes.map(item =>(
                                <li key={item._id}>
                                    {/* <Link to="/FehSingle/+{{ item._id }}">{item.title}</Link> */}
                                    <Link to={`/FehSingle/${item._id}`}><div>{item.name}</div></Link>  
                                    {/* <FehDelete id={`${item._id}`}>x</FehDelete> */}
                                    {/* <Link to={`/FehDelete/${item._id}`}>delete</Link> | 
                                    <Link to={`/FehEdit/${item._id}`}>edit</Link> */}
                                </li>
                            ))
                            
                            


                            
                        }
                    </ul>
                    <button>
                        <Link to={`/FehAdd`}>Create a new Hero</Link>
                    </button>
                </div>
            )
        }
    }
}

export default FeHeroes;
