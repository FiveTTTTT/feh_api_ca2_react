//component to edit a feh entry

import React from 'react';

import axios from "axios";
import qs from 'qs';

import { useParams } from "react-router-dom";



// const FehEdit = () => {
//     const {id} = useParams();

        
    

//     return (
//         <div>{
//             <form>
//                 <input type="text" name="name" id=""></input>
//                 <input type="text" name="title" id=""></input>
//                 <div>
//                     <ul>
//                         <li>
//                             <input type="number" name="hp" id=""></input>
//                             <input type="number" name="atk" id=""></input>
//                             <input type="number" name="spd" id=""></input>
//                             <input type="number" name="def" id=""></input>
//                             <input type="number" name="res" id=""></input>
//                         </li>
//                     </ul>
//                 </div>
//                 <input type="checkbox" name="isLegend" id=""></input>
//                 <input type="checkbox" name="isMythic" id=""></input>
//                 <button type="submit" onClick={editTheHero()}>Edit hero</button>
//             </form>
//             }
//         </div>
//     );
// }

class FehEdit extends React.Component {
    constructor(props) {
        super(props);
        this.id = window.location.pathname.split('/')[2];
        // console.log(this.id[2]);
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
    }

    componentDidMount() {
        // axios.get( `/show-heroes/${this.id[2]}`)
        fetch( `/show-heroes/${this.id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    this.setState( {
                        name: result.name,
                        title: result.title,
                        ultAtk: result.ultAtk,
                        stats: {
                            hp:  result.stats.hp,
                            atk: result.stats.atk,
                            spd: result.stats.spd,
                            def: result.stats.def,
                            res: result.stats.res,
                        },
                        isLegend: result.isLegend,
                        isMythic: result.isMythic,
                    });
                    console.log(this.state);

                    document.getElementById("ultAtk").value = this.state.ultAtk;
                    document.getElementById("isLegend").checked = this.state.isLegend;
                    document.getElementById("isMythic").checked = this.state.isMythic;

                },
                )
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
                this.setState({stats:{hp: event.target.value} });
                
                break;
            case "atk":
                this.setState({stats:{atk: event.target.value} });
                
                break;
            case "spd":
                this.setState({stats:{spd: event.target.value} });
                
                break;
            case "def":
                this.setState({stats:{def: event.target.value} });
                
                break;
            case "res":
                this.setState({stats:{res: event.target.value} });
                
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

    handleSubmit(event){
        axios({
            method: "PUT",
            url: `/edit-heroes/${this.id}`,
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

        event.preventDefault()
    }

    editTheHero(id) {
    
        axios({
            method: "PUT",
            url: `/edit-heroes/${id}`,
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
                     'name': "ash",
                     title: "Askr's vassal",
                     ultAtk: 0.3,
                     stats: JSON.stringify({
                         hp: 42,
                         atk: 58,
                         spd: 27,
                         def: 42,
                         res: 34,
                     }),
                     isLegend: false,
                     isMythic: true 
            })
        })
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
                            <label>{this.state.ultAtk}</label>,
                            <input type="range" id="ultAtk" name="ultAtk" min="0" max="1" step="0.1" onChange={this.handleChange}></input>
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
                            <button type="submit" onClick={this.editTheHero()}>Edit hero</button>
                        </div>
                    </form>
                }
            </div>
            // A HTML form 
        )
    }
}

export default FehEdit;