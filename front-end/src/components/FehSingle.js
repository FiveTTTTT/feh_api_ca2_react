// import axios from "axios";
import React from 'react';
import { Link, Route } from 'react-router-dom';
import FehEdit from './FehEdit';

// import 

// import { Route, Routes, Link } from 'react-router-dom';




// import { useParams } from "react-router-dom";

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
        this.back = require("../assets/img/back-button.png").default;
        this.edit = require("../assets/img/edit-button.png").default;
        this.legendF = require("../assets/img/legend-false.png").default;
        this.mythF = require("../assets/img/myth-false.png").default;
        this.legendT = require("../assets/img/legend-true.png").default;
        this.mythT = require("../assets/img/myth-true.png").default;
        this.heroesArray = [];
        
        
        console.log(this.back);
        this.id = window.location.pathname.split('/');
        console.log(this.id[2]);
        this.state = {
            isLoaded: false,
            theHero: [],            
            heroId: 0,
            heroIsKnown: false
        };
        console.log(
            // require(`../assets/img/heroes/${this.state.heroId + ".png"}`)
        );
    }

    componentDidMount() {
        fetch( `/show-heroes/${this.id[2]}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({            
                        isLoaded: true,
                        theHero: result,
                        heroId: result._id
                    });
                    console.log(this.state.heroId);

                },
                )
        fetch("/show-heroes")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    result.forEach(element => {
                        this.heroesArray.push(element._id)
                    });
                    this.isTheHeroKnown(this.heroesArray)
                    console.log(this.heroesArray);
                },
            )
                
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ isLoaded: true });
        // You can also log the error to an error reporting service
        console.log(error);
      }

    deleteHeroes() {
        
        let deleteAlert = `<div id='delete-alert'>
                            Are you sure?
                            <button>yes</button>
                         </div>`;
                         console.log(deleteAlert);
        // window.confirm(deleteAlert);

        <Link to={`/FehDelelte/${this.id[2]}`}></Link>
                         

    }

    isTheHeroKnown(id) {
        let i = 0;
        id.forEach(element => {
            if (this.state.heroId == element) {
                this.setState.heroIsKnown = true;
            }
        });
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
                <div id='hero-info'>
                    <div className='nav-buttons'>
                        <div>
                            <Link to="/"><img src={this.back}></img></Link>
                            <Link to={`/FehEdit/${this.id[2]}`}><img src={this.edit}></img></Link>
                        </div>
                        <button onClick={this.deleteHeroes}>Delete</button>
                    </div>
                    {
                        <section>
                            <article className='hero-head'>
                                <div className='name-title'>
                                    <h3>{this.state.theHero.title}</h3>
                                    <h3>{this.state.theHero.name}</h3>
                                </div>
                                <div className='myth-legend-status'>
                                    <img src={this.state.theHero.isLegend ? this.legendT : this.legendF}></img>
                                    <img src={this.state.theHero.isMythic ? this.mythT : this.mythF}></img>
                                </div>
                            </article>
                            <article className='hero-stats'>
                                <div className='list-stat'>
                                    <ul>
                                        <li>
                                            <div>hp</div> 
                                            <div>{this.state.theHero.stats.hp}</div> 
                                        </li>
                                        <li>
                                            <div>atk</div> 
                                            <div>{this.state.theHero.stats.atk}</div> 
                                        </li>
                                        <li>
                                            <div>spd</div> 
                                            <div>{this.state.theHero.stats.spd}</div> 
                                        </li>
                                        <li>
                                            <div>def</div> 
                                            <div>{this.state.theHero.stats.def}</div> 
                                        </li>
                                        <li>
                                            <div>res</div> 
                                            <div>{this.state.theHero.stats.res}</div> 
                                        </li>
                                    </ul>

                                </div>
                                <div className='the-ultatk'>
                                    <div>
                                        <p>UltAtk Cooldown :</p>
                                    </div>
                                    <div>
                                        <img src={require(`../assets/img/special-icon.png`).default}></img>
                                        {Math.ceil(1/this.state.theHero.ultAtk)}
                                    </div>
                                </div>

                            </article>
                            {/* <div>
                                <label>isLegend</label>
                                <input type="checkbox" name="isLegend" defaultChecked={this.state.theHero.isLegend} id="isLegend" placeholder='isLegend'></input>
                                                        
                            </div>
                            <div>
                                <label>isMythic</label>
                                <input type="checkbox" name="isMythic" defaultChecked={this.state.theHero.isMythic} id="isMythic" placeholder='isMythic'></input>
                        
                            </div> */}
                            


                        </section>
                    },
                    <img className='heroImg' src={this.state.heroIsKnown ? require(`../assets/img/heroes/${this.state.heroId + ".png"}`).default : require(`../assets/img/heroes/unknown.png`).default }></img>

                </div>
            )
        }
    }


}




export default FehSingle;