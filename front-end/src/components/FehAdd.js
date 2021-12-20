//component to edit a feh entry

import React from 'react';
import axios from "axios";
import qs from 'qs';
// import { Route, Routes, Link  } from 'react-router-dom';


class FehAdd extends React.Component {
    constructor(props) {
        super(props);
        // let id = window.location.href.split('=')[1]
        this.state = {
            name: '',
            title: '',            
            ultAtk: 0,
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

    componentDidMount(){        
            // axios({
            //     method:"DELETE",
            //     url: "/delete-heroes/61bbdf564158e08d260bde64"
            // })
               
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
        if(this.state.title == "" || 
        this.state.title == " " || 
        this.state.name == "" || 
        this.state.name == " " ||
        this.state.stats.hp == 0 ||
        this.state.stats.atk == 0 ||
        this.state.stats.def == 0 ||
        this.state.stats.res == 0 ||
        this.state.stats.spd == 0) {
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
        return ( 
            <div>
                {
                    <form onSubmit={this.handleSubmit}>
                        <div>

                        <input type="text" name="name" id="" value={this.state.name} onChange={this.handleChange}></input>
                        </div>
                        <div>
                        <input type="text" name="title" id="" value={this.state.title} placeholder='title' onChange={this.handleChange}></input>

                        </div>
                        <div>
                            <label>{Math.ceil(1/this.state.ultAtk)}</label>
                            <input type="range" id="ultAtk" name="ultAtk" min="0.2" max="0.5" step="0.1" onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <input type="number" name="hp"  value={this.state.stats.hp} id="" placeholder='hp' onChange={this.handleChange}></input>
                                </li>
                                <li>
                                    <input type="number" name="atk" value={this.state.stats.atk}  id="" placeholder='atk' onChange={this.handleChange}></input>
                                </li>
                                <li>
                                    <input type="number" name="spd" value={this.state.stats.spd}  id="" placeholder='spd' onChange={this.handleChange}></input>
                                </li>
                                <li>
                                    <input type="number" name="def" value={this.state.stats.def}  id="" placeholder='def' onChange={this.handleChange}></input>
                                </li>
                                <li>
                                    <input type="number" name="res" value={this.state.stats.res}  id="" placeholder='res' onChange={this.handleChange}></input>
                                </li>

                            </ul>
                        </div>
                        <label>isLegend</label>
                        <input type="checkbox" name="isLegend" defaultChecked={this.state.isLegend} id="isLegend" placeholder='isLegend' onChange={this.handleChange}></input>
                        <label>isMythic</label>
                        <input type="checkbox" name="isMythic" defaultChecked={this.state.isMythic} id="isMythic" placeholder='isMythic' onChange={this.handleChange}></input>
                        <div>
                            <button type="submit" >Edit hero</button>
                        </div>
                    </form>
                }
            </div>
            // A HTML form 
        )
        
    }
}



export default FehAdd;





// import { json } from "body-parser";

// // component to edit a feh entry
// const FehAdd = ()  => {
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const hero = {
//             name: "ash",
//             title: "Askr's vassal",
//             ultAtk: 0.3,
//             stats: {
//                 hp: 42,
//                 atk: 57,
//                 spd: 27,
//                 def: 42,
//                 res: 34,
//             },
//             isLegend: false,
//             isMythic: true, 
//          };
         
//          fetch("/post-heroes", {
//              method: 'POST',
//              headers: { 'Content-Type': 'application/json' },
//              body: JSON.stringify(hero)
//          }).then(() => {
//              console.log("new hero added");
//          })
//     }

//     return (
//         <div onClick={handleSubmit}> hello world</div>
//     )
// }

// export default FehAdd;