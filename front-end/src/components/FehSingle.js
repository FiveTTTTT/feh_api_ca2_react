import React from 'react';
import {
    Link
} from 'react-router-dom';
import {
    confirmAlert
} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class FehSingle extends React.Component {
        constructor(props) {
            super(props);
            // require the used assets
            this.back = require("../assets/img/back-button.png").default;
            this.edit = require("../assets/img/edit-button.png").default;
            this.legendF = require("../assets/img/legend-false.png").default;
            this.mythF = require("../assets/img/myth-false.png").default;
            this.legendT = require("../assets/img/legend-true.png").default;
            this.mythT = require("../assets/img/myth-true.png").default;
            
            this.heroesArray = [];

            this.id = window.location.pathname.split('/');

            this.state = {
                isLoaded: false,
                theHero: [],
                heroId: 0,
                heroIsKnown: false
            };
        }

        componentDidMount() {
            fetch(`/show-heroes/${this.id[2]}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            theHero: result,
                            heroId: result._id
                        });
                    },
                )
            fetch("/show-heroes")
                .then(res => res.json())
                .then(
                    (result) => {
                        result.forEach(element => {
                            this.heroesArray.push(element._id)
                        });
                        this.isTheHeroKnown(this.heroesArray);
                    },
                )

        }

        deleteHeroes = () => {
            confirmAlert({
                title: 'Confirm to delete',
                message: 'Are you sure to delete this hero?',
                buttons: [{
                        label: 'Yes',
                        onClick: () => window.location.href = `/FehDelete/${this.id[2]}`
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        };

        isTheHeroKnown(id) {
            // if the hero is one of the 8 first he has his own image
            let i = 0;
            id.forEach(element => {
                i++;
                if (this.state.heroId === element && i <= 8) {
                    this.setState({
                        heroIsKnown: true
                    });
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
                            <Link to="/"><img src={this.back} alt='Go back to the main page'></img></Link>
                            <Link to={`/FehEdit/${this.id[2]}`}><img src={this.edit} alt='Edit this hero'></img></Link>
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
                                    <img src={this.state.theHero.isLegend ? this.legendT : this.legendF} alt={this.state.theHero.isLegend ? "the hero is a legend" : "the hero is not a legend"}></img>
                                    <img src={this.state.theHero.isMythic ? this.mythT : this.mythF} alt={this.state.theHero.isMythic ? "the hero is a myth" : "the hero is not a myth"}></img>
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
                                        <img src={require(`../assets/img/special-icon.png`).default} alt="ultAtk icon"></img>
                                        {Math.ceil(1/this.state.theHero.ultAtk)}
                                    </div>
                                </div>

                            </article>
                        </section>
                    },
                    <img className='heroImg' src={this.state.heroIsKnown ? require(`../assets/img/heroes/${this.state.heroId + ".png"}`).default : require(`../assets/img/heroes/unknown.png`).default } alt={this.state.heroIsKnown ? `${this.state.theHero.name}'s full art` : "default image"}></img>

                </div>
            )
        }
    }


}




export default FehSingle;