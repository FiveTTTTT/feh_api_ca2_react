//component to edit a feh entry

import React from 'react';

import axios from "axios";
import qs from 'qs';
import FehSingle from './FehSingle';
import { Link } from 'react-router-dom';

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
        this.isModified = false;
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
                    // console.log(this.state);

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
                this.isModified = true;
                
                break;
            case "title":
                this.setState({title: event.target.value});
                this.isModified = true;
                
                break;
            case "ultAtk":
                this.setState({ultAtk: event.target.value});
                this.isModified = true;
                
                break;
            case "hp":
                this.setState({stats:{
                    hp: event.target.value,
                    atk: this.state.stats.atk,
                    spd: this.state.stats.spd,
                    def: this.state.stats.def,
                    res: this.state.stats.res,
                } });
                this.isModified = true;
                
                break;
            case "atk":
                this.setState({stats:{
                    hp: this.state.stats.hp,
                    atk: event.target.value,
                    spd: this.state.stats.spd,
                    def: this.state.stats.def,
                    res: this.state.stats.res,
                } });
                this.isModified = true;
                
                break;
            case "spd":
                this.setState({stats:{
                    hp: this.state.stats.hp,                    
                    atk: this.state.stats.atk,
                    spd: event.target.value,
                    def: this.state.stats.def,
                    res: this.state.stats.res,
                } });
                this.isModified = true;
                
                break;
            case "def":
                this.setState({stats:{
                    hp: this.state.stats.hp,
                    atk: this.state.stats.atk,
                    spd: this.state.stats.spd, 
                    def: event.target.value,
                    res: this.state.stats.res,
                } });
                this.isModified = true;
                
                break;
            case "res":
                this.setState({stats:{
                    hp: this.state.stats.hp,
                    atk: this.state.stats.atk,
                    spd: this.state.stats.spd,                    
                    def: this.state.stats.def,
                    res: event.target.value,
                } });
                this.isModified = true;
                
                break;
            case "isLegend":
                this.setState({isLegend: !this.state.isLegend});
                this.isModified = true;
                
                break;
            case "isMythic":
                this.setState({isMythic: !this.state.isMythic});
                this.isModified = true;
                
                break;
        
            default:
                break;
        }
        // console.log(this.state);
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
        
        this.isModified = true;
        event.preventDefault()
        // return( 
        //     <FehSingle></FehSingle>
        // )
    }
    deleteHeroes(){
        console.log("heoll");
        let deleteAlert= `<div id='delete-alert'>
                            Are you sure?
                            <button>yes</button>
                         </div>`;
                         console.log(deleteAlert);
        // alert(deleteAlert);
                         

    }

    editTheHero(id) {
    
        // axios({
        //     method: "PUT",
        //     url: `/edit-heroes/${id}`,
        //     headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
        //     data: qs.stringify({
        //              'name': "ash",
        //              title: "Askr's vassal",
        //              ultAtk: 0.3,
        //              stats: JSON.stringify({
        //                  hp: 42,
        //                  atk: 58,
        //                  spd: 27,
        //                  def: 42,
        //                  res: 34,
        //              }),
        //              isLegend: false,
        //              isMythic: true 
        //     })
        // })
}
    
render() {
        let editButton;
        if (this.isModified) {
            editButton = 
            <div>
                <button type="submit" onClick={this.editTheHero()}>Edit hero</button>
            </div>
            
        } else {
            editButton = 
            <div>
                <button type="submit" disabled>Edit hero</button>
            </div>
        }
        return ( 
            <div id='hero-info'>
                <div className='nav-buttons'>
                    <div>
                        <Link to="/"><img src={this.back}></img></Link>
                        <Link to={`/FehEdit/${this.id[2]}`}><img src={this.edit}></img></Link>
                    </div>
                    <button>Delete</button>
                </div>
            {/* <button onClick={this.deleteHeroes}>delete?</button> */}
            {
                <form onSubmit={this.handleSubmit}>
                    <section>
                    <article className='hero-head'>
                        <div>
                            <input type="text" name="name" id="" value={this.state.name} placeholder='name' onChange={this.handleChange}></input>
                            <input type="text" name="title" id="" value={this.state.title} placeholder='title' onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <label>isLegend</label>
                            <input type="checkbox" name="isLegend" defaultChecked={this.state.isLegend} id="isLegend" placeholder='isLegend' onChange={this.handleChange}></input>
                            <label>isMythic</label>
                            <input type="checkbox" name="isMythic" defaultChecked={this.state.isMythic} id="isMythic" placeholder='isMythic' onChange={this.handleChange}></input>
                        
                        </div>
                    </article>
                    <article className='hero-stats'>
                        <div className='list-stat'>
                            <ul>
                                <li>
                                    <div>hp :</div> 
                                    <input type="number" name="hp"  value={this.state.stats.hp} id="" placeholder='hp' onChange={this.handleChange}></input>
                                </li>
                                <li>
                                    <div>atk :</div> 
                                    <input type="number" name="atk" value={this.state.stats.atk}  id="" placeholder='atk' onChange={this.handleChange}></input>
                                </li>
                                <li>
                                    <div>spd :</div> 
                                    <input type="number" name="spd" value={this.state.stats.spd}  id="" placeholder='spd' onChange={this.handleChange}></input>
                                </li>
                                <li>
                                    <div>def :</div> 
                                    <input type="number" name="def" value={this.state.stats.def}  id="" placeholder='def' onChange={this.handleChange}></input>
                                </li>
                                <li>
                                    <div>res :</div> 
                                    <input type="number" name="res" value={this.state.stats.res}  id="" placeholder='res' onChange={this.handleChange}></input>
                                </li>
                            </ul>
                        </div>
                        <div className='the-ultatk'>
                            <label>{Math.ceil(1/this.state.ultAtk)}</label>
                            <input type="range" id="ultAtk" name="ultAtk" min="0.2" max="0.5" step="0.1" onChange={this.handleChange}></input>
                        </div>
                    </article>
                        
                        
                            {editButton}
                        
                    </section>
                </form>
            }
            </div>
            // A HTML form 
        )
    }
}

export default FehEdit;