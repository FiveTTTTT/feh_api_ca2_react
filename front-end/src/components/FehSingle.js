// import axios from "axios";
import React from 'react';
import { Link } from 'react-router-dom';

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
        console.log(this.back);
        this.id = window.location.pathname.split('/');
        console.log(this.id[2]);
        this.state = {
            isLoaded: false,
            theHero: []
        };
    }

    componentDidMount() {
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
                <div id='hero-info'>
                    <div className='nav-buttons'>
                        <div>
                            <Link to="/"><img src={this.back}></img></Link>
                            <Link to={`/FehEdit/${this.id[2]}`}><img src={this.edit}></img></Link>
                        </div>
                        <button>Delete</button>
                    </div>
                    {
                        <section>
                            <article className='hero-head'>
                                <div>
                                    <h2>{this.state.theHero.name}</h2>
                                    <h3>{this.state.theHero.title}</h3>
                                </div>
                                <div>
                                    <div>
                                        <label>isLegend</label>
                                        <input type="checkbox" name="isLegend" defaultChecked={this.state.theHero.isLegend} id="isLegend" placeholder='isLegend'></input>
                                                                
                                    </div>
                                    <div>
                                        <label>isMythic</label>
                                        <input type="checkbox" name="isMythic" defaultChecked={this.state.theHero.isMythic} id="isMythic" placeholder='isMythic'></input>
                                
                                    </div>
                                </div>
                            </article>
                            
                            {/* <img ref={}></img> */}
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
                                    <p>{Math.ceil(1/this.state.theHero.ultAtk)}</p>
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
                    }
                </div>
            )
        }
    }


}




export default FehSingle;