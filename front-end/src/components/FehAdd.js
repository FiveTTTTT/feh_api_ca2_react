//component to edit a feh entry

import React from 'react';
import axios from "axios";
import qs from 'qs';
import { Link } from 'react-router-dom';

class FehAdd extends React.Component {
    constructor(props) {
        super(props);        
        this.back = require("../assets/img/back-button.png").default;
        this.edit = require("../assets/img/edit-button.png").default;
        this.legendF = require("../assets/img/legend-false.png").default;
        this.mythF = require("../assets/img/myth-false.png").default;
        this.legendT = require("../assets/img/legend-true.png").default;
        this.mythT = require("../assets/img/myth-true.png").default;
        this.state = {
            name: '',
            title: '',            
            ultAtk: 0.2, 
            stats: {
                hp: 0,
                atk: 0,
                spd: 0,
                def: 0,
                res: 0,
            },
            isLegend: false,
            isMythic: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.verifSubmit = this.verifSubmit.bind(this);
    }

    handleChange(event) {

        switch (event.target.name) {
            case "name":                
                this.setState({name: event.target.value});
                
                break;
            case "title":
                this.setState({title: event.target.value});
                
                break;
            case "ultAtk":
                this.setState({ultAtk: event.target.value});
                
                break;
            case "hp":
                this.setState({stats:{
                    hp: event.target.value,
                    atk: this.state.stats.atk,
                    spd: this.state.stats.spd,
                    def: this.state.stats.def,
                    res: this.state.stats.res,
                } });
                
                break;
            case "atk":
                this.setState({stats:{
                    hp: this.state.stats.hp,
                    atk: event.target.value,
                    spd: this.state.stats.spd,
                    def: this.state.stats.def,
                    res: this.state.stats.res,
                } });
                
                break;
            case "spd":
                this.setState({stats:{
                    hp: this.state.stats.hp,                    
                    atk: this.state.stats.atk,
                    spd: event.target.value,
                    def: this.state.stats.def,
                    res: this.state.stats.res,
                } });
                
                break;
            case "def":
                this.setState({stats:{
                    hp: this.state.stats.hp,
                    atk: this.state.stats.atk,
                    spd: this.state.stats.spd, 
                    def: event.target.value,
                    res: this.state.stats.res,
                } });
                
                break;
            case "res":
                this.setState({stats:{
                    hp: this.state.stats.hp,
                    atk: this.state.stats.atk,
                    spd: this.state.stats.spd,                    
                    def: this.state.stats.def,
                    res: event.target.value,
                } });
                
                break;
            case "isLegend":
                this.setState({isLegend: !this.state.isLegend});
                
                break;
            case "isMythic":
                this.setState({isMythic: !this.state.isMythic});
                
                break;
        
            default:
                break;
        }
        
    }
    verifSubmit() {
        if(this.state.title === "" || 
        this.state.title === " " || 
        this.state.name === "" || 
        this.state.name === " " ||
        this.state.stats.hp === 0 ||
        this.state.stats.atk === 0 ||
        this.state.stats.def === 0 ||
        this.state.stats.res === 0 ||
        this.state.stats.spd === 0) {
            return false

        } else {
            return true
        }
    }

    handleSubmit(event){
       if (this.verifSubmit()) {
           
           axios({
               method: "post",
               url: '/post-heroes',
               headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
               data: qs.stringify({
                        name: this.state.name,
                        title: this.state.title,
                        ultAtk: this.state.ultAtk,
                        stats: JSON.stringify({
                            hp: this.state.stats.hp,
                            atk: this.state.stats.atk,
                            spd: this.state.stats.spd,
                            def: this.state.stats.def,
                            res: this.state.stats.res,
                        }),
                        isLegend: this.state.isLegend,
                        isMythic: this.state.isMythic 
               })
           })
       } else {
           alert("the hero is incomplete!")
       }

        event.preventDefault()
    }


    render() {
        let editButton;
        if (this.isModified) {
            editButton = 
            <div className='edit-button edit-button-enable'>
                <button type="submit">Edit hero</button>
            </div>
            
        } else {
            editButton = 
            <div className='edit-button edit-button-disable'>
                <button type="submit" disabled>Edit hero</button>
            </div>
        }
        return ( 
            <div id='hero-info' className='edit-hero'>
                <div className='nav-buttons'>
                    <div>
                        <Link to={`/`}><img src={this.back}></img></Link>
                    </div>
                </div>
                {
                    <form onSubmit={this.handleSubmit}>
                        <section>
                        <article className='hero-head'>
                            <div className='name-title'>
                                <h3>
                                    <input type="text" name="title" maxLength={16} id="" value={this.state.title} placeholder='title' onChange={this.handleChange}></input>
                                </h3>
                                <h3>
                                    <input type="text" maxLength={12} name="name" id="" value={this.state.name} placeholder='name' onChange={this.handleChange}></input>
                                </h3>
                            </div>
                            <div className='myth-legend-status'>
                                <label>
                                    <img src={this.state.isLegend ? this.legendT : this.legendF} alt={this.state.isLegend ? "the hero is a legend" : "the hero is not a legend"}></img>
                                    <input type="checkbox" name="isLegend" defaultChecked={this.state.isLegend} id="isLegend" placeholder='isLegend' onChange={this.handleChange}></input>
                                </label>
                                <label>
                                    <img src={this.state.isMythic ? this.mythT : this.mythF} alt={this.state.isMythic ? "the hero is a myth" : "the hero is not a myth"}></img>
                                    <input type="checkbox" name="isMythic" defaultChecked={this.state.isMythic} id="isMythic" placeholder='isMythic' onChange={this.handleChange}></input>
                                </label>
                            
                            </div>
                        </article>
                        <article className='hero-stats'>
                            <div className='list-stat'>
                                <ul>
                                    <li>
                                        <div>hp :</div> 
                                        <input type="number" min={0} max={99} name="hp"  value={this.state.stats.hp} id="" placeholder='hp' onChange={this.handleChange}></input>
                                    </li>
                                    <li>
                                        <div>atk :</div> 
                                        <input type="number" min={0} max={99} name="atk" value={this.state.stats.atk}  id="" placeholder='atk' onChange={this.handleChange}></input>
                                    </li>
                                    <li>
                                        <div>spd :</div> 
                                        <input type="number" min={0} max={99} name="spd" value={this.state.stats.spd}  id="" placeholder='spd' onChange={this.handleChange}></input>
                                    </li>
                                    <li>
                                        <div>def :</div> 
                                        <input type="number" min={0} max={99} name="def" value={this.state.stats.def}  id="" placeholder='def' onChange={this.handleChange}></input>
                                    </li>
                                    <li>
                                        <div>res :</div> 
                                        <input type="number" min={0} max={99} name="res" value={this.state.stats.res}  id="" placeholder='res' onChange={this.handleChange}></input>
                                    </li>
                                </ul>
                            </div>
                            <div className='the-ultatk'>
                                <label>
                                    <div>
                                        <p>UltAtk Cooldown :</p>
                                    </div>
                                    <div>
                                        <img src={require(`../assets/img/special-icon.png`).default} alt="ultAtk icon"></img>
                                        {Math.ceil(1/this.state.ultAtk)}
                                    </div>
                                </label>
                                <input type="range" id="ultAtk" name="ultAtk" min="0.2" max="0.5" step="0.1" onChange={this.handleChange}></input>
                            </div>
                        </article>    
                        {editButton}
                            
                        </section>
                    </form>
                }
                <img className='heroImg' src={require(`../assets/img/heroes/unknown.png`).default } alt={"default image"}></img>

            </div>
        )
        
    }
}

export default FehAdd;