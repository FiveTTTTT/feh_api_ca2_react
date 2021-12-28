//component to edit a feh entry

import React from 'react';
// import axios from "axios";
import { Link } from 'react-router-dom';
// import FehSingle from './FehSingle';
// import FehDelete from './FehDelete';


class FeHeroes extends React.Component {
    constructor(props) {
        super(props);
        this.nbOfHero = 0;
        // this.heroesIcons = require(`../assets/img/heroes-icons/6195183d1e728450afc9d2ca.png`).default;
        // console.log(this.heroesIcons);
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

    iconSrcs(id){
        // console.log(title);
        // let titleSplit = title.split(" ");
        let properId = id + ".png";
        // titleSplit.forEach(element => {
        //     properTitle = properTitle + "-" + element; 
            
        // });

        let heroIcon = require(`../assets/img/heroes-icons/${properId}`).default;
        return heroIcon;

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
                <div id='heroes-list'>
                    <h1>Select one hero</h1>
                    <div className='theList'>
                        <ul>
                            <li key={0}>
                                <button className='hero-icon new-hero-button'>
                                    <Link to={`/FehAdd`}><div>Create a new Hero</div></Link>
                                    
                                    {/* {item.name} */}
                                </button>
                            </li>
                            {
                                this.state.feHeroes.map(item =>(
                                    this.nbOfHero++,
                                    
                                    <li key={item._id+1}>
                                        
                                        {/* <Link to="/FehSingle/+{{ item._id }}">{item.title}</Link> */}
                                        <Link to={`/FehSingle/${item._id}`}>
                                            <div className='hero-icon'>
                                                <div></div>
                                                <img src={this.nbOfHero <= 8 ? this.iconSrcs(item._id) : this.iconSrcs("unknown")}></img>
                                                {/* {item.name} */}
                                            </div>
                                        </Link>  
                                        {/* <FehDelete id={`${item._id}`}>x</FehDelete> */}
                                        {/* <Link to={`/FehDelete/${item._id}`}>delete</Link> | 
                                        <Link to={`/FehEdit/${item._id}`}>edit</Link> */}
                                    </li>
                                ))
                                
                                


                                
                            }
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

export default FeHeroes;
