//component to edit a feh entry

import React from 'react';
import {
    Link
} from 'react-router-dom';


class FeHeroes extends React.Component {
        constructor(props) {
            super(props);
            this.nbOfHero = 0;

            this.state = {
                isLoaded: false,
                feHeroes: [],
                // searchedHero: {
                //     searching: false,
                //     name: ""
                // }
            }

            this.handleChange = this.handleChange.bind(this);
        }


        componentDidMount() {
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

        // you can find heroes by typing their name in the input(case sensitive !)
        handleChange(event) {
            if (event.target.value !== "") {
                fetch(`/show-heroes-named/${event.target.value}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            feHeroes: result
                        })
                    },
                ).catch(
                    this.setState({
                        feHeroes: []
                    })
                )
                this.setState({
                    
                });
            } else {
                // if the input is empty we stop the research
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
        }

        iconSrcs(id) {
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

                <section id='heroes-list'>
                    <h1>Heroes</h1>
                    <article id='search-heroes-list'>
                        <input type="text"  className='hero-search-input' placeholder='Enter a name' onChange={this.handleChange}></input>
                        <div className='research-list'></div>
                    </article>
                    <article className='the-list'>
                        <ul>
                            <li key={0}>
                                <button className='hero-icon new-hero-button'>
                                    <Link to={`/FehAdd`}><div>Create a new Hero</div></Link>
                                </button>
                            </li>
                            {
                                this.nbOfHero = 0,
                                this.state.feHeroes.map(item =>(
                                    this.nbOfHero++,
                                    
                                    <li key={item._id+1}>
                                        <Link to={`/FehSingle/${item._id}`}>
                                            <div className='hero-icon'>
                                                <div></div>
                                                <img src={this.nbOfHero <= 8 ? this.iconSrcs(item._id) : this.iconSrcs("unknown")} alt="hero's portait"></img>
                                                
                                            </div>
                                        </Link>  
                                    </li>
                                ))
                            }
                        </ul>
                    </article>
                </section>
            )
        }
    }
}

export default FeHeroes;
