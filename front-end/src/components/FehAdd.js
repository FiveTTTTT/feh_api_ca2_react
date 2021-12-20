//component to edit a feh entry

import React from 'react';
import axios from "axios";
import qs from 'qs';
import { Route, Routes, Link } from 'react-router-dom';


class FehAdd extends React.Component {
    constructor(props) {
        super(props);
        // let id = window.location.href.split('=')[1]
        this.state = {
            isLoaded: false,
            feHeroes: [],
        }
    }

    componentDidMount(){
        // axios({
        //         method: "PUT",
        //         url: '/edit-heroes/618ba6c398758b986723a2ff',
        //         data: {
        //             "ultAtk":0.5,

        //         }
        //     })
        
        axios({
                method: "post",
                url: '/post-heroes',
                headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({
                         name: "ash",
                         title: "Askr's vassal",
                         ultAtk: 0.3,
                         stats: JSON.stringify({
                             hp: 42,
                             atk: 57,
                             spd: 27,
                             def: 42,
                             res: 34,
                         }),
                         isLegend: false,
                         isMythic: true 
                })
            })



            // axios({
            //     method:"DELETE",
            //     url: "/delete-heroes/61bbdf564158e08d260bde64"
            // })
               
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
                <div>
                    hello world
                </div>
            )
        }
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