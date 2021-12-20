//component to edit a feh entry

import React from 'react';
import axios from "axios";
import { Route, Routes, Link } from 'react-router-dom';
import FehSingle from './FehSingle';


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
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                }
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
                <div>
                    <ul>
                        {
                            console.log(this.state),
                            this.state.feHeroes.map(item =>(
                                <li key={item._id}>
                                    {/* <Link to="/FehSingle/+{{ item._id }}">{item.title}</Link> */}
                                    <Link to={`/FehSingle/${item._id}`}>{item.title}</Link>
                                </li>
                            ))
                            

                            
                        }
                    </ul>
                </div>
            )
        }
    }
}

export default FeHeroes;
