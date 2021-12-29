//component to edit a feh entry

import React from 'react';
import { Link } from 'react-router-dom';


class FeHeroes extends React.Component {
    constructor(props) {
        super(props);
        this.nbOfHero = 0;
        this.state = {
            isLoaded: false,
            feHeroes: [],
        }
    }
    

    componentDidMount(){
        fetch("/show-heroes")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        feHeroes: result,
                    });
                },
            )
    }

    iconSrcs(id){
        let properId = id + ".png";

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
                    <h1>Heroes</h1>
                    <div className='theList'>
                        <ul>
                            <li key={0}>
                                <button className='hero-icon new-hero-button'>
                                    <Link to={`/FehAdd`}><div>Create a new Hero</div></Link>
                                </button>
                            </li>
                            {
                                this.state.feHeroes.map(item =>(
                                    this.nbOfHero++,
                                    
                                    <li key={item._id+1}>
                                        <Link to={`/FehSingle/${item._id}`}>
                                            <div className='hero-icon'>
                                                <div></div>
                                                <img src={this.nbOfHero <= 8 ? this.iconSrcs(item._id) : this.iconSrcs("unknown")}></img>
                                                
                                            </div>
                                        </Link>  
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
